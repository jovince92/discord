

import CreateChannelModal from '@/Components/Modals/CreateChannelModal';
import CreateServerModal from '@/Components/Modals/CreateServerModal';
import DeleteChannelConfirmationModal from '@/Components/Modals/DeleteChannelConfirmationModal copy';
import DeleteConfirmationModal from '@/Components/Modals/DeleteConfirmationModal';
import EditChannelModal from '@/Components/Modals/EditChannelModal';
import EditServerModal from '@/Components/Modals/EditServerModal';
import InviteModal from '@/Components/Modals/InviteModal';
import LeaveConfirmationModal from '@/Components/Modals/LeaveConfirmationModal';
import MembersModal from '@/Components/Modals/MembersModal';

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
        </>
    )
}

export default ModalProvider