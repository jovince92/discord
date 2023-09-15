import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { FC,  useMemo } from 'react'
import ChatHeader from '../../Chat/ChatHeader';
import ChatInput from '@/Components/Chat/ChatInput';
import ChatMessages from '@/Components/Chat/ChatMessages';
import MediaRoom from '@/Components/MediaRoom';

interface ChannelLayoutProps{
    
}

const ChannelLayout:FC<ChannelLayoutProps> = () => {
    const {current_server,current_channel,auth} = usePage<PageProps>().props;
    
    if(!current_channel){
        return null;
    }
    const apiRoute=useMemo(()=>route('server.channel.message.store',{server_id:current_server.id,channel_id:current_channel.id}),[current_server.id,current_channel.id]);
    const getMsgsRoute=useMemo(()=>route('server.channel.message.index',{server_id:current_server.id,channel_id:current_channel.id}),[current_server.id,current_channel.id]);

    

    return (
        <div className='bg-white dark:bg-neutral-950 flex flex-col h-full'>
            <ChatHeader name={current_channel.name} server={current_server} type='Channel' />
            {
                current_channel.type==='TEXT' &&(
                    <>
                        <ChatMessages getMsgsRoute={getMsgsRoute} type='Channel' />
                        <ChatInput name={current_channel.name} type='Channel' apiRoute={apiRoute}  />
                    </>
                )
            }
            {
                current_channel.type==='AUDIO' && <MediaRoom chat_id={current_channel.id.toString()} audio />
            }
            {
                current_channel.type==='VIDEO' && <MediaRoom chat_id={current_channel.id.toString()} video />
            }
        </div>
    )
}

export default ChannelLayout