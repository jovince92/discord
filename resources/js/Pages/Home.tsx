
import Layout from '@/Components/Layouts/Layout';
import ChannelLayout from '@/Components/Layouts/ChannelLayout/ChannelLayout';
import ServerIdLayout from '@/Components/Layouts/ServerIdLayout/ServerIdLayout';
import { Link, Head } from '@inertiajs/react';
import ConversationProvider from '@/Context/ConversationProvider';

const Home = () => {
    return (
        <>
            <Head title='Discord Clone' />
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