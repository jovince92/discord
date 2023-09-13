import { Channel, ChannelType, Server } from '@/types';
import {create} from 'zustand';

export type ModalType = "CreateServer"|"Invite"|"EditServer"|"Members"|"CreateChannel"|"LeaveServer"|"DeleteServer"|"EditChannel"|"DeleteChannel"|"MessageFile"|"DeleteMessage";

interface ModalData {
    server?:Server;
    channel?:Channel;
    channelType?:ChannelType;
    apiRoute?:string;
}

interface ModalStore{
    type:ModalType|null;
    isOpen?:boolean;
    onOpen:(type:ModalType,data?:ModalData)=>void;
    onClose:()=>void;
    data:ModalData;
}

export const useModal = create<ModalStore>(set=>({
    data:{},
    type:null,
    onOpen:(type,data={})=>set({isOpen:true,type,data}),
    onClose:()=>set({type:undefined,isOpen:false,data:{}})
}));