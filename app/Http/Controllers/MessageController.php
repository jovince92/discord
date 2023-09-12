<?php

namespace App\Http\Controllers;

use App\Events\NewChatMessageEvent;
use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($server_id,$channel_id)
    {
        return Message::with(['user'])->where('channel_id',$channel_id)->orderBy('created_at','desc')->paginate(10);
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
    public function store(Request $request,$server_id,$channel_id)
    {
        $request->validate([
            'image' => 'mimes:jpeg,png,jpg,webp,pdf'
        ]);
        //dd([$request,'channel_id'=>$channel_id,'server_id'=>$server_id]);
        $new_msg=Message::create([
            'user_id'=>Auth::id(),
            'channel_id'=>$channel_id,
            'content'=>$request->message??"",
        ]);

        $image = $request->file('image') ;
        if($image){
            $image_name=$new_msg->id.'_'.$image->getClientOriginalName();
            $location='uploads/chat_images/server_'.strval($server_id).'/';
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

        

        broadcast(new NewChatMessageEvent($new_msg->load(['user'])));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function update(Request $request, $channel_id,$server_id)
    {
        
        $msg=Message::find($request->message_id);
        
        $msg->update([
            'content'=>$request->message??"",
        ]);
        broadcast(new NewChatMessageEvent($msg->load(['user'])));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $channel_id,$server_id)
    {
        $msg=Message::find($request->message_id);
        
        $msg->delete();
        //broadcast(new NewChatMessageEvent($msg->load(['user']))); TODO
    }

    public function test(Request $request){
        return ['messages'=>Message::with(['user'])->orderBy('id','desc')->paginate(2)];
    }
}
