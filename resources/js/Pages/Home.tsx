
import Layout from '@/Components/Layouts/Layout';
import ServerIdLayout from '@/Components/Layouts/ServerIdLayout/ServerIdLayout';
import ModeToggle from '@/Components/ModeToggle';
import { Button } from '@/Components/ui/button';
import { Link, Head } from '@inertiajs/react';

const Home = () => {
    return (
        <>
            <Head title='Discord Clone' />
                <Layout>
                    <ServerIdLayout>
                        <div>Homess</div>
                        <ModeToggle/>
                        <Button >TST</Button>
                    </ServerIdLayout>
                </Layout>
        </>
    )
}

export default Home