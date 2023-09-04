
import Layout from '@/Components/Layouts/Layout';
import ChannelLayout from '@/Components/Layouts/ChannelLayout/ChannelLayout';
import ServerIdLayout from '@/Components/Layouts/ServerIdLayout/ServerIdLayout';
import { Link, Head } from '@inertiajs/react';

const Home = () => {
    return (
        <>
            <Head title='Discord Clone' />
                <Layout>
                    <ServerIdLayout>
                        <ChannelLayout />
                    </ServerIdLayout>
                </Layout>
        </>
    )
}

export default Home