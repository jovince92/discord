import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { FC, useEffect, useMemo } from 'react'
import ServerHeader from './ServerHeader';

const ServerSidebar:FC = () => {
    const {current_server,auth} = usePage<PageProps>().props;
    const {user}=auth;
    const {channels,users} = current_server;
    
    const role = users.find(({id})=>id===user.id)?.pivot.member_role;

    const textChannels = useMemo(()=>channels.filter(({type})=>type==='TEXT'),[channels]);
    const audioChannels = useMemo(()=>channels.filter(({type})=>type==='AUDIO'),[channels]);
    const videoChannels = useMemo(()=>channels.filter(({type})=>type==='VIDEO'),[channels]);
    const members= useMemo(()=>users.filter(({id})=>id===user.id),[users]);

    
    return (
        <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
            <ServerHeader role={role!} server={current_server} />
        </div>
    )
}

export default ServerSidebar