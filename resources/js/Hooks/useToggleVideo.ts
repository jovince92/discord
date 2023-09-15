
import {create} from 'zustand';

interface ToggleVideo{
    isVideo?:boolean;
    toggle:(videoCall:boolean,id:number)=>void;
    conversationId:number;
}

export const useToggleVideo = create<ToggleVideo>(set=>({
    conversationId:0,
    isVideo:false,
    toggle:(vc,id)=>set({
        isVideo:vc,
        conversationId:vc?id:0
    })
}));