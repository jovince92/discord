import  { FC, useEffect, useState } from 'react';
import '@livekit/components-styles';
import {
  LiveKitRoom,
  VideoConference,
  GridLayout,
  ParticipantTile,
} from '@livekit/components-react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import axios from 'axios';
import { toast } from './ui/use-toast';
import { Loader2 } from 'lucide-react';

interface MediaRoomProps{
    chat_id:string;
    video?:boolean;
    audio?:boolean;
}

const MediaRoom:FC<MediaRoomProps> = ({chat_id,video=false,audio=false}) => {
    
    const {current_server,current_channel,auth,current_conversation} = usePage<PageProps>().props;
    const [token,setToken] = useState<string>();
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true);
        if(!chat_id){
            return;
        }
        axios.get(route('livekit.generate',{
            chat_id
        }))
        .then(({data})=>setToken(data))
        .catch(()=>toast({title:'Internal Error',description:'Please try again',variant:'destructive'}))
        .finally(()=>setLoading(false));
    },[chat_id])

    if(!token){
        return (
            <div className='flex flex-col flex-1 justify-center items-center'>
                <Loader2 className='h-7 w-7 text-neutral-500 animate-spin my-3.5' />
                <p className='text-sm text-neutral-500 dark:text-neutral-400'>Loading....</p>
            </div>
        );
    }

    return (
        <LiveKitRoom data-lk-theme='default' serverUrl={import.meta.env.VITE_LIVEKIT_URL} connect={true} token={token} video={video} audio={audio} >
            <VideoConference />
        </LiveKitRoom>
    )
}

export default MediaRoom