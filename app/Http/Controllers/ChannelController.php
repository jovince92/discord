<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Member;
use App\Models\Server;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ChannelController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($server_id,$channel_id)
    {
        $check = Member::where('server_id',$server_id)->where('user_id',Auth::id())->first();
        if(!$check){
            return abort(403);
        }
        $channel=Channel::where('id',$channel_id)->firstOrFail();
        $server=Server::with(['users','channels'])->where('id',$server_id)->firstOrFail();
        Inertia::share('current_server',$server);
        Inertia::share('current_channel',$channel);
        return Inertia::render('Home');
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

        $request->validate([
            'type' => 'required|string|max:255|in:AUDIO,TEXT,VIDEO',
            'name' => 'required|string|string|max:255|unique:'.Channel::class,
        ]);


        Channel::create([
            'name'=>$request->name,
            'server_id'=>$request->server_id,
            'user_id'=>Auth::id(),
            'type'=>$request->type
        ]);
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
    public function update(Request $request)
    {
        $request->validate([
            'type' => 'required|string|max:255|in:AUDIO,TEXT,VIDEO',
            'name' => 'required|string|string|max:255|unique:channels,name,'.$request->channel_id,
        ]);

        $channel=Channel::findOrFail($request->channel_id);

        $channel->update([
            'name'=>$request->name,
            'server_id'=>$request->server_id,
            'user_id'=>Auth::id(),
            'type'=>$request->type
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request,$server_id)
    {
        
        $channel  = Channel::findOrFail($request->channel_id);
        $server_id=$channel->server_id;
        $channel->delete();
        if($request->current_channel_id==$request->channel_id){
            return redirect(route('server.index',['server_id'=>$server_id]));
        }
    }
}
