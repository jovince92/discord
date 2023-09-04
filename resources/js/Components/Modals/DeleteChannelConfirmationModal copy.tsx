import {  FC,  useCallback,  useEffect,  useMemo, useState } from 'react';
import { Dialog, DialogContent,  DialogDescription,  DialogFooter,  DialogHeader, DialogTitle } from '../ui/dialog';
import { useModal } from '@/Hooks/useModalStore';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Check, Copy, RefreshCcw } from 'lucide-react';
import { PageProps } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import { cn } from '@/lib/utils';


const DeleteChannelConfirmationModal:FC = () => {
    const {current_server,current_channel} = usePage<PageProps>().props;
    const {isOpen,onClose,type,data:ModalData} = useModal();
    const {channel} = ModalData;
    const { toast } = useToast();
    const { post, processing,setData } = useForm({
        channel_id:channel?.id,
        current_channel_id:current_channel?.id
    });

    
    const onDelete = () =>{
        post(route('server.channel.destroy',{
            server_id:current_server.id,
        }),{
            onSuccess:()=>{
                onClose();
                toast({'title':'Done','description':'You have deleted the Channel '+channel?.name});
            }
        });
    }

    const OPEN = useMemo(()=>isOpen&&type==='DeleteChannel',[isOpen,type]);
    useEffect(()=>{
        if(channel?.id){
            setData('channel_id',channel.id)
        }
    },[channel?.id,current_channel?.id]);
    useEffect(()=>{
        if(current_channel?.id){
            setData('current_channel_id',current_channel.id)
        }
    },[current_channel?.id]);
    return (
        <Dialog open={OPEN} onOpenChange={onClose}>   
            <DialogContent className='p-0 overflow-auto'>
                <DialogHeader className='pt-7 px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>Delete Channel&nbsp;<span className='font-semibold text-indigo-500'>#{channel?.name}</span>&nbsp;?</DialogTitle>
                    <DialogDescription className='text-center' >This action is irreversible...</DialogDescription>
                </DialogHeader>
                <DialogFooter className='px-5 py-3.5  bg-primary-foreground'>
                    <div className='flex justify-between items-center w-full'>
                        <Button variant='outline' onClick={onClose} disabled={processing}>Cancel</Button>
                        <Button variant='destructive' onClick={onDelete} disabled={processing||!channel?.id}>Confirm</Button>
                    </div>
                </DialogFooter>
                </DialogContent>
        </Dialog>
    )
}

export default DeleteChannelConfirmationModal


