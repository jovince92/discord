import {  FC,  useCallback,  useMemo, useState } from 'react';
import { Dialog, DialogContent,  DialogDescription,  DialogFooter,  DialogHeader, DialogTitle } from '../ui/dialog';
import { useModal } from '@/Hooks/useModalStore';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Check, Copy, RefreshCcw } from 'lucide-react';
import { PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import { cn } from '@/lib/utils';


const LeaveConfirmationModal:FC = () => {
    const {isOpen,onClose,type} = useModal();
    const {current_server} = usePage<PageProps>().props;
    const { toast } = useToast();
    const { post, processing } = useForm({
        server_id:current_server.id
    });

    
    const onLeave = () =>{
        post(route('server.leave',{
            server_id:current_server.id
        }),{
            onSuccess:()=>{
                onClose();
                toast({'title':'Done','description':'You have left the Server '+current_server.name});
            }
        });
    }

    const OPEN = useMemo(()=>isOpen&&type==='LeaveServer',[isOpen,type]);
    
    return (
        <Dialog open={OPEN} onOpenChange={onClose}>   
            <DialogContent className='p-0 overflow-auto'>
                <DialogHeader className='pt-7 px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>Are You Sure?</DialogTitle>
                    <DialogDescription className='text-center'>Leave Server&nbsp;<span className='font-semibold text-indigo-500'>{current_server.name}</span>&nbsp;?</DialogDescription>
                </DialogHeader>
                <DialogFooter className='px-5 py-3.5  bg-primary-foreground'>
                    <div className='flex justify-between items-center w-full'>
                        <Button variant='outline' onClick={onClose} disabled={processing}>Cancel</Button>
                        <Button variant='destructive' onClick={onLeave} disabled={processing}>Confirm</Button>
                    </div>
                </DialogFooter>
                </DialogContent>
        </Dialog>
    )
}

export default LeaveConfirmationModal


