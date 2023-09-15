import ChannelLayout from '@/Components/Layouts/ChannelLayout/ChannelLayout'
import ConversationLayout from '@/Components/Layouts/ConversationLayout/ConversationLayout'
import Layout from '@/Components/Layouts/Layout'
import ServerIdLayout from '@/Components/Layouts/ServerIdLayout/ServerIdLayout'
import ConversationProvider from '@/Providers/ConversationProvider'
import { Message, PageProps, PaginatedMessage } from '@/types'
import { Head, usePage } from '@inertiajs/react'
import { useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'

const Conversation = () => {
    const {current_conversation} = usePage<PageProps>().props;
    const queryClient = useQueryClient();
    useEffect(()=>{
        if(!current_conversation){return;}
        
        window.Echo.join('conversation_'+current_conversation.id.toString())
        .listen('NewDirectMessageEvent',({direct_message:message}:{direct_message:Message})=>{
            queryClient.setQueryData([`channel_${current_conversation.id.toString()}`],(oldData:any)=>{
                const {pages}=oldData as {pages:PaginatedMessage[]};
                
                const  newData=pages;
                newData[0]={
                    ...newData[0],
                    data:[message,...newData[0].data]
                }
                const updated={...oldData,pages:newData};
                return updated;
            });
        })
        .listen('DMUpdateEvent',({direct_message:message}:{direct_message:Message})=>{
            queryClient.setQueryData([`channel_${current_conversation.id.toString()}`],(oldData:any)=>{
                const {pages}=oldData as {pages:PaginatedMessage[]};
                
                const  newData=pages;
                newData[0]={
                    ...newData[0],
                    data:newData[0].data.map((oldMsg)=>oldMsg.id!==message.id?oldMsg:message)
                }
                const updated={...oldData,pages:newData};
                return updated;
            });
        });
            
        return ()=>window.Echo.leaveAllChannels();
    },[current_conversation?.id,queryClient]);
    return (
        <>
            <Head title='Conversation' />
            <ConversationProvider>
                <Layout>
                    <ServerIdLayout>
                        <ConversationLayout />
                    </ServerIdLayout>
                </Layout>
            </ConversationProvider>
        </>
    )
}

export default Conversation