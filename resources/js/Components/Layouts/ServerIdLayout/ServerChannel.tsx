import { cn } from '@/lib/utils';
import { Channel, MemberRole, PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react';
import { Edit, Hash, Lock, Mic, Trash, Video } from 'lucide-react';
import React, { FC, MouseEventHandler } from 'react'
import ActionTooltip from '../ActionToolTip';
import { useModal } from '@/Hooks/useModalStore';

interface ServerChannelProps{
    channel:Channel;
    role?:MemberRole;
}

const ICONMAP = {
    'TEXT':Hash,
    'AUDIO':Mic,
    'VIDEO':Video
}

const ServerChannel:FC<ServerChannelProps> = ({channel,role}) => {
    const Icon=ICONMAP[channel.type];
    const {current_server,current_channel} = usePage<PageProps>().props;
    const {onOpen} = useModal();

    return (
        <button onClick={()=>router.get(route('server.channel.index',{server_id:current_server.id,channel_id:channel.id}))} className={cn('group p-1.5 rounded-md flex items-center gap-x-1.5 w-full hover:bg-neutral-700/10 dark:hover:bg-neutral-700/50 transition mb-1',
                current_channel?.id===channel.id&&"bg-neutral-700/20 dark:bg-neutral-700"
            )}>
            <Icon className='flex-shrink-0 w-5 h-5 text-neutral-500 dark:text-neutral-400' />
            <p className={cn('line-clamp-1 font-semibold text-sm text-neutral-500 group-hover:text-neutral-600 dark:text-neutral-400 dark:group-hover:text-neutral-300 transition',
                current_channel?.id===channel.id&&"text-primary dark:text-neutral-200 dark:group-hover:text-white"
            )}>
                {channel.name}
            </p>
            {
                (channel.name !=='general' && role!=='GUEST')&&(
                    <div className='ml-auto flex items-center gap-x-1.5'>
                        <ActionTooltip label='Edit'>
                            <Edit onClick={(e)=>{e.stopPropagation();onOpen('EditChannel',{channel})}} className='hidden group-hover:block w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition' />
                        </ActionTooltip>
                        <ActionTooltip label='Delete'>
                            <Trash onClick={(e)=>{e.stopPropagation();onOpen('DeleteChannel',{channel})}} className='hidden group-hover:block w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition' />
                        </ActionTooltip>
                    </div>
                )
            }
            {channel.name==='general' && <Lock className='ml-auto w-4 h-4 text-neutral-500 dark:text-neutral-400' />}
        </button>
    )
}

export default ServerChannel