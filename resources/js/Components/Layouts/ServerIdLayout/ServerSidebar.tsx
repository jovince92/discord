import { ChannelType, PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { FC,  useMemo } from 'react'
import ServerHeader from './ServerHeader';
import { ScrollArea } from '@/Components/ui/scroll-area';
import ServerSearch from './ServerSearch';
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from 'lucide-react';
import { Separator } from '@/Components/ui/separator';
import ServerSection from './ServerSection';
import ServerChannel from './ServerChannel';
import ServerMember from './ServerMember';


const ICONMAP ={
    'TEXT':<Hash className='mr-1.5 h-4 w-4' />,
    'VIDEO':<Video className='mr-1.5 h-4 w-4' />,
    'AUDIO':<Mic className='mr-1.5 h-4 w-4' />,
}

export const ROLEICONMAP ={
    'GUEST':null,
    'MODERATOR':<ShieldCheck className='mr-1.5 h-4 w-4 text-indigo-500' />,
    'ADMIN':<ShieldAlert className='mr-1.5 h-4 w-4 text-rose-500' />,
}

const ServerSidebar:FC = () => {
    const {current_server,auth} = usePage<PageProps>().props;
    const {user}=auth;
    const {channels,users} = current_server;
    
    const role = users.find(({id})=>id===user.id)?.pivot.member_role;

    const textChannels = useMemo(()=>channels.filter(({type})=>type==='TEXT'),[channels]);
    const audioChannels = useMemo(()=>channels.filter(({type})=>type==='AUDIO'),[channels]);
    const videoChannels = useMemo(()=>channels.filter(({type})=>type==='VIDEO'),[channels]);
    const members= useMemo(()=>users.filter(({id})=>id!==user.id),[users]);

    


    return (
        <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
            <ServerHeader role={role!} server={current_server} />
            <ScrollArea className='flex-1 px-2.5'>
                <div className='mt-1.5'>
                    <ServerSearch data={[{
                        label:"Text Channels",
                        type:'CHANNEL',
                        data: textChannels.map(channel=>({id:channel.id,name:channel.name,icon:ICONMAP[channel.type]}))
                    },{
                        label:"Voice Channels",
                        type:'CHANNEL',
                        data: audioChannels.map(channel=>({id:channel.id,name:channel.name,icon:ICONMAP[channel.type]}))
                    },{
                        label:"Video Channels",
                        type:'CHANNEL',
                        data: videoChannels.map(channel=>({id:channel.id,name:channel.name,icon:ICONMAP[channel.type]}))
                    },{
                        label:"Members",
                        type:'MEMBER',
                        data: members.map(member=>({id:member.id,name:member.name,icon:ROLEICONMAP[member.pivot.member_role]}))
                    }]} />
                </div>
                <Separator className='rounded-md my-1.5' />
                {textChannels.length>0&&<ServerSection sectionType='Channel' channelType='TEXT' role={role} label='Text Channels' />}
                <div className='flex flex-col space-y-0.5'>
                    {textChannels.map(channel=><ServerChannel key={channel.id} channel={channel} role={role} />)}
                </div>

                {audioChannels.length>0&&<ServerSection sectionType='Channel' channelType='AUDIO' role={role} label='Voice Channels' />}
                <div className='flex flex-col space-y-0.5'>
                    {audioChannels.map(channel=><ServerChannel key={channel.id} channel={channel} role={role} />)}
                </div>

                {videoChannels.length>0&&<ServerSection sectionType='Channel' channelType='VIDEO' role={role} label='Video Channels' />}
                <div className='flex flex-col space-y-0.5'>
                    {videoChannels.map(channel=><ServerChannel key={channel.id} channel={channel} role={role} />)}
                </div>

                {members.length>0&&<ServerSection sectionType='Member' role={role} label='Members' />}
                <div className='flex flex-col space-y-0.5'>
                    {members.map(member=><ServerMember member={member} key={member.id} />)}
                </div>
            </ScrollArea>
        </div>
    )
}

export default ServerSidebar