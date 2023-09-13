import {  FC,  useCallback,  useEffect,  useMemo, useState } from 'react';
import { Dialog, DialogContent,  DialogDescription,  DialogFooter,  DialogHeader, DialogTitle } from '../ui/dialog';
import { useModal } from '@/Hooks/useModalStore';
import { Button } from '../ui/button';
import { PageProps } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { useToast } from '../ui/use-toast';
import axios from 'axios';


const DeleteMessageConfirmationModal:FC = () => {
    const {isOpen,onClose,type,data:ModalData} = useModal();
    const { toast } = useToast();
    const [loading,setLoading] = useState(false);
    

    
    const onDelete = () =>{
        if(!ModalData.apiRoute){
            return null;
        }
        axios.post(ModalData.apiRoute)
        .then(()=>{
            toast({'title':'Done','description':'Message Deleted'});
            onClose();
        })
        .catch(()=>toast({title:'Error',description:'Please try again',variant:'destructive'}))
        
    }

    const OPEN = useMemo(()=>isOpen&&type==='DeleteMessage',[isOpen,type]);
    
    return (
        <Dialog open={OPEN} onOpenChange={onClose}>   
            <DialogContent className='p-0 overflow-auto'>
                <DialogHeader className='pt-7 px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>Delete Message</DialogTitle>
                    <DialogDescription className='text-center' >Are you sure?</DialogDescription>
                </DialogHeader>
                <DialogFooter className='px-5 py-3.5  bg-primary-foreground'>
                    <div className='flex justify-between items-center w-full'>
                        <Button variant='outline' onClick={onClose} disabled={loading}>Cancel</Button>
                        <Button variant='destructive' onClick={onDelete} disabled={loading}>Confirm</Button>
                    </div>
                </DialogFooter>
                </DialogContent>
        </Dialog>
    )
}

export default DeleteMessageConfirmationModal


