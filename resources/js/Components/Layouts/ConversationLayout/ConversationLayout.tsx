import ChatHeader from '@/Components/Chat/ChatHeader';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { useMemo } from 'react'

const ConversationLayout = () => {
    const {current_server,current_conversation,auth} = usePage<PageProps>().props;
    const {user} = auth;
    if(!current_conversation){
        return null;
    }
    
    const otherUser = useMemo(()=>user.id!==current_conversation.initiator.id?current_conversation.initiator:current_conversation.reciever,[current_conversation]);
    return (
        <div className='bg-white dark:bg-neutral-950 flex flex-col h-full'>
            <ChatHeader  name={otherUser.name} user={otherUser} server={current_server} type='Conversation' />
        </div>
    )
}

export default ConversationLayout