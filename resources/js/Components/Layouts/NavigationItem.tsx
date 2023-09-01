import { PageProps, Server } from '@/types'
import React, { FC } from 'react'
import ActionTooltip from './ActionToolTip';
import { cn } from '@/lib/utils';
import { router, usePage } from '@inertiajs/react';

interface NavigationItemProps{
    server:Server;
}

const NavigationItem:FC<NavigationItemProps> = ({server}) => {
    const {current_server} = usePage<PageProps>().props;
    const {id,
        name,
        image,
        invite_code,
        users,
        user,
        created_at} =server;
    
    const navigate = () =>{
        router.get(route('server.index',{
            server_id:id
        }));
    }

    return (
        <ActionTooltip label={name} align='center' side='right'>
            <button onClick={navigate} className='group relative flex items-center'>
                <div className={cn('absolute left-0 bg-primary rounded-r-full transition-all w-[0.25rem]',
                    current_server.id!==id && 'group-hover:h-[1.3rem]',
                    current_server.id===id ? 'h-[2.25rem]':'h-[0.5rem]'
                )} />
                <div className={cn('relative group flex mx-2.5 h-12 w-12 rounded-[1.5rem] group-hover:rounded-[1rem] overflow-hidden',
                    current_server.id===id && 'bg-primary/10 text-primary rounded-[1rem]',
                )}>
                    <img className='object-cover' src={image} />
                </div>
            </button>
        </ActionTooltip>
    )
}

export default NavigationItem