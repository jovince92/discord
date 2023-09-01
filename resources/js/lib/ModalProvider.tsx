

import CreateServerModal from '@/Components/Modals/CreateServerModal'
import EditServerModal from '@/Components/Modals/EditServerModal'
import InviteModal from '@/Components/Modals/InviteModal'
import MembersModal from '@/Components/Modals/MembersModal'
import React from 'react'

const ModalProvider = () => {
    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal/>
            <MembersModal />
        </>
    )
}

export default ModalProvider