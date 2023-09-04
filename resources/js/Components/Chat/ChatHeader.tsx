import { PageProps, Server, User } from '@/types';
import { usePage } from '@inertiajs/react';
import { Hash,  } from 'lucide-react';
import React, { FC } from 'react'
import MobileToggle from '../MobileToggle';
import UserAvatar from '../UserAvatar';

interface ChatHeaderProps{
    server:Server;
    name:string;
    type:"Channel"|"Conversation";
    user?:User;
}

const ChatHeader:FC<ChatHeaderProps> = ({server,name,type,user}) => {
    return (
        <div className='text-md font-semibold px-2.5 flex items-center h-12 border-b-2 border-secondary z-0'>
            <MobileToggle />
            {
                type==='Channel' && <Hash className='w-5 h-5 text-neutral-500 dark:text-neutral-400 mr-1.5' />
            }
            {
                type==='Conversation' && <UserAvatar className='h-8 w-8 mr-2' user={user} />
            }
            <p className='font-semibold text-base text-black dark:text-white'>{name}</p>
        </div>
    )
}

export default ChatHeader