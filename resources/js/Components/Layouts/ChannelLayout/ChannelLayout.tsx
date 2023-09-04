import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { FC, ReactNode } from 'react'
import ChatHeader from '../../Chat/ChatHeader';

interface ChannelLayoutProps{
    
}

const ChannelLayout:FC<ChannelLayoutProps> = () => {
    const {current_server,current_channel,auth} = usePage<PageProps>().props;
    const {user} = auth;
    if(!current_channel){
        return null;
    }
    return (
        <div className='bg-white dark:bg-neutral-950 flex flex-col h-full'>
            <ChatHeader name={current_channel.name} server={current_server} type='Channel' />
        </div>
    )
}

export default ChannelLayout