import ChatHeader from '@/Components/Chat/ChatHeader';
import ChatInput from '@/Components/Chat/ChatInput';
import ChatMessages from '@/Components/Chat/ChatMessages';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { useEffect, useMemo } from 'react'
import ConversationMessages from './ConversationMessages';
import { useToggleVideo } from '@/Hooks/useToggleVideo';
import MediaRoom from '@/Components/MediaRoom';

const ConversationLayout = () => {
    const {current_server,current_conversation,auth} = usePage<PageProps>().props;
    const {user} = auth;
    const {isVideo,conversationId} =useToggleVideo();
    if(!current_conversation){
        return null;
    }

    const apiRoute=useMemo(()=>route('server.conversation.store',{server_id:current_server.id,conversation_id:current_conversation.id}),[current_server.id,current_conversation.id]);
    const getMsgsRoute=useMemo(()=>route('server.conversation.show',{server_id:current_server.id,conversation_id:current_conversation.id}),[current_server.id,current_conversation.id]);
    
    const otherUser = useMemo(()=>user.id!==current_conversation.initiator.id?current_conversation.initiator:current_conversation.reciever,[current_conversation]);
    useEffect(()=>console.log(getMsgsRoute),[getMsgsRoute]);
    return (
        <div className='bg-white dark:bg-neutral-950 flex flex-col h-full'>
            <ChatHeader  name={otherUser.name} user={otherUser} server={current_server} type='Conversation' />
            {
                (isVideo && conversationId===current_conversation.id)?<MediaRoom chat_id={current_conversation.id.toString()} video audio />:<><ConversationMessages otherUser={otherUser} getMsgsRoute={getMsgsRoute} type='Conversation' /><ChatInput name={otherUser.name} apiRoute={apiRoute} type='Conversation' /></>
            }
            
        </div>
    )
}

export default ConversationLayout