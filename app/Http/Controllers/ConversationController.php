<?php

namespace App\Http\Controllers;

use App\Models\Conversation;
use App\Models\Server;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

        if($conversation->initiator_id!=Auth::id()&&$conversation->initiator_id!=Auth::id()){
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
    public function store(Request $request)
    {
        //
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
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
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
