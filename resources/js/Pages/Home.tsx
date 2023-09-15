
import Layout from '@/Components/Layouts/Layout';
import ChannelLayout from '@/Components/Layouts/ChannelLayout/ChannelLayout';
import ServerIdLayout from '@/Components/Layouts/ServerIdLayout/ServerIdLayout';
import { Link, Head, usePage } from '@inertiajs/react';
import ConversationProvider from '@/Providers/ConversationProvider';
import { useEffect } from 'react';
import { Message, PageProps, PaginatedMessage } from '@/types';
import { useQueryClient } from '@tanstack/react-query';


const Home = () => {
    
    const {current_channel} = usePage<PageProps>().props;
    const queryClient = useQueryClient();

    useEffect(()=>{
        if(!current_channel){return;}
        window.Echo.join('channel_'+current_channel.id.toString())
        .listen('NewChatMessageEvent',({message}:{message:Message})=>{
            queryClient.setQueryData([`channel_${current_channel.id.toString()}`],(oldData:any)=>{
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
        .listen('MessageUpdateEvent',({message}:{message:Message})=>{
            queryClient.setQueryData([`channel_${current_channel.id.toString()}`],(oldData:any)=>{
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
    },[current_channel?.id,queryClient]);
    return (
        <>
            <Head title='Chat' />
                <ConversationProvider>
                        <Layout>
                            <ServerIdLayout>
                                <ChannelLayout />
                            </ServerIdLayout>
                        </Layout>
                </ConversationProvider>
        </>
    )
}

export default Home