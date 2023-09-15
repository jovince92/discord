<?php

namespace App\Http\Controllers;

use App\Events\DMUpdateEvent;
use App\Events\NewDirectMessageEvent;
use App\Models\Conversation;
use App\Models\DirectMessage;
use App\Models\Server;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;

class ConversationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($server_id,$conversation_id)
    {
        $server=Server::with(['users','channels'])->where('id',$server_id)->firstOrFail();
        Inertia::share('current_server',$server);
        
        
        
        $conversation=Conversation::findOrFail($conversation_id);

        if($conversation->initiator_id!=Auth::id()&&$conversation->reciever_id!=Auth::id()){
            return abort(403);
        }

        Inertia::share('current_conversation',$conversation->load(['initiator','reciever']));
        return Inertia::render('Conversation');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request,$server_id,$conversation_id)
    {
        
        $request->validate([
            'image' => 'mimes:jpeg,png,jpg,webp,pdf'
        ]);
        //dd([$request,'channel_id'=>$channel_id,'server_id'=>$server_id]);
        $new_msg=DirectMessage::create([
            'user_id'=>Auth::id(),
            'conversation_id'=>$conversation_id,
            'content'=>$request->message??"",
        ]);

        $image = $request->file('image') ;
        if($image){
            $image_name=$new_msg->id.'_'.$image->getClientOriginalName();
            $location='uploads/conversation_images/conversation_'.strval($server_id).'/';
            $path=public_path($location);
            if (!file_exists($path)) {
                File::makeDirectory($path,0777,true);
            }
            $new_image = $location.$image_name;
            $request->file('image')->move($path, $new_image);
            $new_msg->update([
                'file'=>$new_image
            ]);
        }

        broadcast(new NewDirectMessageEvent($new_msg->load(['user'])));
    }

    /**
     * Display the specified resource.
     */
    public function show($server_id,$conversation_id)
    {
        return DirectMessage::withTrashed()->with(['user'])->where('conversation_id',$conversation_id)->orderBy('created_at','desc')->paginate(10);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,$server_id,$conversation_id)
    {
        $msg=DirectMessage::find($request->message_id);
        
        $msg->update([
            'content'=>$request->message??"",
        ]);
        broadcast(new DMUpdateEvent($msg->load(['user'])));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $server_id,$channel_id,$direct_message_id,)
    {
    
        
        $msg=DirectMessage::find($direct_message_id);
        
        @unlink(public_path($msg->getAttributes()['file']));
        $msg->delete();
        broadcast(new DMUpdateEvent(DirectMessage::with(['user'])->withTrashed()->where('id',$direct_message_id)->first()));
    }

    public function initiate(Request $request,$server_id){
        $user_id=$request->user_id;
        $auth_id=Auth::id();
        $conversation = Conversation::where(function($q) use($user_id,$auth_id){
            $q->where('initiator_id',$auth_id)->where('reciever_id',$user_id);
        })->orWhere(function ($q) use($user_id,$auth_id){
            $q->where('reciever_id',$auth_id)->where('initiator_id',$user_id);
        })->first();

        if($conversation){
            return redirect(route('server.conversation.index',['server_id'=>$server_id,'conversation_id'=>$conversation->id]));
        }

        $new_conversation = Conversation::create([
            'initiator_id'=>$auth_id,
            'reciever_id'=>$user_id
        ]);

        return redirect(route('server.conversation.index',['server_id'=>$server_id,'conversation_id'=>$new_conversation->id]));

    }

    
}
