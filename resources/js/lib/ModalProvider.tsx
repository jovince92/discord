

import CreateChannelModal from '@/Components/Modals/CreateChannelModal'
import CreateServerModal from '@/Components/Modals/CreateServerModal'
import DeleteConfirmationModal from '@/Components/Modals/DeleteConfirmationModal'
import EditServerModal from '@/Components/Modals/EditServerModal'
import InviteModal from '@/Components/Modals/InviteModal'
import LeaveConfirmationModal from '@/Components/Modals/LeaveConfirmationModal'
import MembersModal from '@/Components/Modals/MembersModal'
import React from 'react'

const ModalProvider = () => {
    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <EditServerModal/>
            <MembersModal />
            <CreateChannelModal />
            <LeaveConfirmationModal />
            <DeleteConfirmationModal />
        </>
    )
}

export default ModalProvider