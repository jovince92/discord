import InitialModal from '@/Components/Modals/InitialModal';
import { Head } from '@inertiajs/react';
import {FC} from 'react'

const SetUp:FC = () => {
    return (
        <>
            <Head title='Create Server'/>
            <InitialModal />
        </>
    )
}

export default SetUp