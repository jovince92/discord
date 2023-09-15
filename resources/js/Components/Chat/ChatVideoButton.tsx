import { ButtonHTMLAttributes, FC, forwardRef, useEffect } from 'react';
import ActionTooltip from '../Layouts/ActionToolTip';
import { LucideIcon, Video, VideoOff } from 'lucide-react';
import { router, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useToggleVideo } from '@/Hooks/useToggleVideo';



const ChatVideoButton:FC<ButtonHTMLAttributes<HTMLButtonElement>> = () => {
    
    const {current_server,current_conversation} = usePage<PageProps>().props;
    const {isVideo,toggle} = useToggleVideo();
    const Icon:LucideIcon = isVideo?VideoOff:Video;
    const toolTipLabel=isVideo?'End video call':'Start video call';

    if(!current_conversation){
        return null;
    }

    
    const onClick = () =>{
        const id=isVideo?0:current_conversation.id;
        toggle(!isVideo,id);
    }

    return (
        <ActionTooltip side='bottom' label={toolTipLabel}>
            <button onClick={onClick} className='hover:opacity-75 transit mr-3.5'>
                <Icon className='h-6 w-6 text-neutral-500 dark:text-neutral-400' />
            </button>
        </ActionTooltip>
    )
}

export default ChatVideoButton