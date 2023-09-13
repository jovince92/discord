

import CreateChannelModal from '@/Components/Modals/CreateChannelModal';
import CreateServerModal from '@/Components/Modals/CreateServerModal';
import DeleteChannelConfirmationModal from '@/Components/Modals/DeleteChannelConfirmationModal';
import DeleteConfirmationModal from '@/Components/Modals/DeleteConfirmationModal';
import DeleteMessageConfirmationModal from '@/Components/Modals/DeleteMessageConfirmationModal';
import EditChannelModal from '@/Components/Modals/EditChannelModal';
import EditServerModal from '@/Components/Modals/EditServerModal';
import InviteModal from '@/Components/Modals/InviteModal';
import LeaveConfirmationModal from '@/Components/Modals/LeaveConfirmationModal';
import MembersModal from '@/Components/Modals/MembersModal';
import MessageFileModal from '@/Components/Modals/MessageFileModal';

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
            <DeleteChannelConfirmationModal />
            <EditChannelModal />
            <MessageFileModal />
            <DeleteMessageConfirmationModal />
        </>
    )
}

export default ModalProvider