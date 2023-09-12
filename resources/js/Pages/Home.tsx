
import Layout from '@/Components/Layouts/Layout';
import ChannelLayout from '@/Components/Layouts/ChannelLayout/ChannelLayout';
import ServerIdLayout from '@/Components/Layouts/ServerIdLayout/ServerIdLayout';
import { Link, Head, usePage } from '@inertiajs/react';
import ConversationProvider from '@/Providers/ConversationProvider';
import { useEffect } from 'react';
import { Message, PageProps } from '@/types';
import QueryProvider from '@/Providers/QueryProvider';


const Home = () => {
    
    const {current_channel} = usePage<PageProps>().props;
    useEffect(()=>{
        if(!current_channel){return;}
        window.Echo.join('channel_'+current_channel.id.toString())
        .listen('NewChatMessageEvent',({message}:{message:Message})=>{
            console.log(message);
        });
        return ()=>window.Echo.leaveAllChannels();
    },[current_channel?.id]);
    return (
        <>
            <Head title='Discord Clone' />
                <ConversationProvider>
                    <QueryProvider>
                        <Layout>
                            <ServerIdLayout>
                                <ChannelLayout />
                            </ServerIdLayout>
                        </Layout>
                    </QueryProvider>
                </ConversationProvider>
        </>
    )
}

export default Home