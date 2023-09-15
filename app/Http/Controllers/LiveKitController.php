<?php

namespace App\Http\Controllers;

use Agence104\LiveKit\AccessToken;
use Agence104\LiveKit\AccessTokenOptions;
use Agence104\LiveKit\VideoGrant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LiveKitController extends Controller
{
    public function generate(Request $request,$chat_id){
        
        
        $token_options = (new AccessTokenOptions())->setIdentity($request->user()->name);
        $video_grant = (new VideoGrant())
            ->setRoomJoin()
            ->setRoomName($chat_id);
        return $token = (new AccessToken(env('LIVEKIT_API_KEY'), env('LIVEKIT_SECRET_KEY')))
            ->init($token_options)
            ->setGrant($video_grant)
            ->toJwt();
    }
}
