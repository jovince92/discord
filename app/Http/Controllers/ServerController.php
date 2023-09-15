<?php

namespace App\Http\Controllers;

use App\Models\Channel;
use App\Models\Member;
use App\Models\Server;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ServerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($server_id)
    {
        $channel=Channel::where('server_id',$server_id)->where('name','general')->firstOrFail();
        return redirect(route('server.channel.index',[
            'server_id'=>$server_id,
            'channel_id'=>$channel->id
        ]));
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
            'name'=>'required',
            'image' => 'required|mimes:jpeg,png,jpg,webp'
        ]);

        $server=Server::create([
            'user_id'=>Auth::id(),
            'name'=>$request->name,
            'invite_code'=>Str::uuid()
        ]);

        $image = $request->file('image') ;
        $image_name=$server->id.'_'.$image->getClientOriginalName();
        $location='uploads/images/server_'.strval($server->id).'/';
        $path=public_path($location);
        if (!file_exists($path)) {
            File::makeDirectory($path,0777,true);
        }
        $new_image = $location.$image_name;
        $request->file('image')->move($path, $new_image);
        $server->update([
            'image'=>$new_image
        ]);

        Channel::create([
            'name'=>'general',
            'user_id'=>Auth::id(),
            'server_id'=>$server->id,
        ]);

        Member::create([
            'user_id'=>Auth::id(),
            'server_id'=>$server->id,
            'member_role'=>'ADMIN'
        ]);

        return redirect(route('server.index',['server_id'=>$server->id]));
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
            'name'=>'required',
            'image' => 'mimes:jpeg,png,jpg,webp'
        ]);

        $server=Server::findOrFail($request->server_id);


        if($request->file('image')){

            @unlink(public_path($server->getAttributes()['image']));

            $image = $request->file('image') ;
            $image_name=$server->id.'_'.$image->getClientOriginalName();
            $location='uploads/images/server_'.strval($server->id).'/';
            $path=public_path($location);
            if (!file_exists($path)) {
                File::makeDirectory($path,0777,true);
            }
            $new_image = $location.$image_name;
            $request->file('image')->move($path, $new_image);
            $server->update([
                'image'=>$new_image
            ]);

        }

        
        $server->update([
            'name'=>$request->name
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $server=Server::findOrFail($request->server_id);
        @unlink(public_path($server->getAttributes()['image']));
        $server->delete();
        return redirect(route('home'));
    }


    public function invite($invite_code)
    {
        $server=Server::where('invite_code',$invite_code)->firstOrFail();
        $existing_member=Member::where('user_id',Auth::id())->where('server_id',$server->id)->first();
        if($existing_member){
            return redirect(route('server.index',['server_id'=>$server->id]));
        }
        Member::create([
            'server_id'=>$server->id,
            'user_id'=>Auth::id(),
        ]);
        return redirect(route('server.index',['server_id'=>$server->id]));
    }

    public function generate(Request $request)
    {
        
        $server=Server::find($request->server_id);
        $server->update([
            'invite_code'=>Str::uuid()
        ]);
        return $server->invite_code;
    }

    public function leave(Request $request){
        $member=Member::where('user_id',Auth::id())->where('server_id',$request->server_id)->first();
        $member->delete();
        return redirect(route('home'));
    }
}
