import { ChannelType, MemberRole, Server } from '@/types';
import React, { FC } from 'react'
import ActionTooltip from '../ActionToolTip';
import { Button } from '@/Components/ui/button';
import { Plus, Settings } from 'lucide-react';
import { useModal } from '@/Hooks/useModalStore';

interface ServerSectionProps{
    label:string;
    role?:MemberRole;
    sectionType:"Channel"|"Member";
    channelType?:ChannelType;
    server?:Server;
}

const ServerSection:FC<ServerSectionProps> = ({label,role,sectionType,channelType,server}) => {
    const {onOpen} = useModal();
    return (
        <div className='flex items-center justify-between py-1.5'>
            <p className='text-xs uppercase font-bold'>{label}</p>
            {
                (role!=='GUEST' && sectionType==='Channel')&&(
                    <ActionTooltip label='Create Channel' side='top'>
                        <Button onClick={()=>onOpen('CreateChannel',{channelType})} className='!h-8 !w-8' size='icon' variant='outline'> <Plus className='h-4 w-4' /> </Button>
                    </ActionTooltip>
                )
            }
            {
                (role!=='GUEST' && sectionType==='Member')&&(
                    <ActionTooltip label='Manage Members' side='top'>
                        <Button onClick={()=>onOpen('Members')} className='!h-8 !w-8' size='icon' variant='outline'> <Settings className='h-4 w-4' /> </Button>
                    </ActionTooltip>
                )
            }
        </div>
    )
}

export default ServerSection