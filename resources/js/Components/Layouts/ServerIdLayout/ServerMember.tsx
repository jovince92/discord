import { PageProps, User } from '@/types'
import { usePage } from '@inertiajs/react';
import React, { FC } from 'react'
import { ROLEICONMAP } from './ServerSidebar';
import { cn } from '@/lib/utils';
import UserAvatar from '@/Components/UserAvatar';

interface ServerMemberProps{
    member:User
}



const ServerMember:FC<ServerMemberProps> = ({member}) => {
    const {current_server,current_conversation} = usePage<PageProps>().props;

    const icon = ROLEICONMAP[member.pivot.member_role];
    return (
        <button className={cn('group p-1.5 rounded-md flex items-center gap-x-1.5 w-full hover:bg-neutral-700/10 dark:hover:bg-neutral-700/50 transition mb-1',
            current_conversation?.id===member.id && "bg-neutral-700/20 dark:bg-neutral-700"
        )}>
            <UserAvatar className='h-8 w-8' user={member} />
            <p className={cn('font-semibold text-sm text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-400 dark:group-hover:text-neutral-300 transition',
                current_conversation?.id===member.id && 'text-primary dark:text-neutral-300 dark:group-hover:text-white'
            )}>{member.name}</p>
            {icon}
        </button>
    )
}

export default ServerMember