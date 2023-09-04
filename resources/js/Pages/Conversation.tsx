import ChannelLayout from '@/Components/Layouts/ChannelLayout/ChannelLayout'
import ConversationLayout from '@/Components/Layouts/ConversationLayout/ConversationLayout'
import Layout from '@/Components/Layouts/Layout'
import ServerIdLayout from '@/Components/Layouts/ServerIdLayout/ServerIdLayout'
import { Head } from '@inertiajs/react'
import React from 'react'

const Conversation = () => {
    return (
        <>
            <Head title='Conversation' />
                <Layout>
                    <ServerIdLayout>
                        <ConversationLayout />
                    </ServerIdLayout>
                </Layout>
        </>
    )
}

export default Conversation