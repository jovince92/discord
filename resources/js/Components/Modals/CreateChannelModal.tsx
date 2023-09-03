import { ChangeEventHandler, FC, FormEventHandler, useState, useEffect, useMemo } from 'react';
import { Dialog, DialogContent,  DialogFooter, DialogHeader,DialogTitle } from '../ui/dialog';
import { Select,SelectContent,SelectItem,SelectLabel,SelectTrigger,SelectValue } from '../ui/select';
import { useForm, usePage } from '@inertiajs/react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useModal } from '@/Hooks/useModalStore';
import { ChannelType, PageProps } from '@/types';
import { toast } from '../ui/use-toast';

type FormData = {
    name:string,
    server_id:number,
    type:ChannelType
}

const CHANNELTYPES:ChannelType[] =['TEXT','AUDIO','VIDEO'];

const CreateChannelModal:FC = () => {
    
    const {current_server} = usePage<PageProps>().props;
    const {isOpen,onClose,type} = useModal();
    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        server_id:current_server.id,
        name: '',
        type:'TEXT'
    });

    const onSubmit:FormEventHandler = (e) =>{
        e.preventDefault();
        
        post(route('server.channel.store',{server_id:data.server_id}),{
            onSuccess:()=>{
                onClose();
                toast({'title':'Success','description':'Channel Created'});
            }
        });
    }
    
    const OPEN = useMemo(()=>isOpen&&type==='CreateChannel',[isOpen,type])
    const handleClose = () =>{
        reset();
        onClose();
    }

    useEffect(()=>{
        if(errors.name)toast({'variant':'destructive', 'title':'Error','description':errors.name});
        if(errors.type)toast({'variant':'destructive', 'title':'Error','description':errors.type});
    },[errors])

    return (
        <Dialog open={OPEN} onOpenChange={handleClose}>   
            <DialogContent className='p-0 overflow-auto'>
                <DialogHeader className='pt-7 px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>Create Channel</DialogTitle>
                </DialogHeader>
                <form id='channel' onSubmit={onSubmit} className='flex flex-col space-y-7'>
                    <div className='flex flex-col space-y-7 px-5'>
                        
                        <div className='flex flex-col space-y-1'>
                            <Label className='uppercase text-xs font-bold'>Channel Name</Label>
                            <Input value={data.name} onChange={({target})=>setData('name',target.value)} required disabled={processing} className='border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0' placeholder='Channel Name....' />    
                        </div>

                        <div className='flex flex-col space-y-1'>
                            <Label className='uppercase text-xs font-bold'>Channel Type</Label>
                            <Select disabled={processing} value={data.type} onValueChange={(val)=>setData('type',val as ChannelType)}>
                                <SelectTrigger className='bg-secondary border-0 focus:ring-0 ring-offset-0 focus:ring-offset-0 capitalize outline-none'><SelectValue placeholder='Select Channel Type' /></SelectTrigger>
                                
                                <SelectContent>
                                    {
                                        CHANNELTYPES.map(channelType=><SelectItem key={channelType} value={channelType} className='capitalize'>{channelType}</SelectItem>)
                                    }
                                </SelectContent>
                            </Select>
                        </div>
                        
                    </div>
                </form>
                <DialogFooter className='px-5 py-3.5'>
                    <Button  disabled={processing} form='channel' className='ml-auto'>Create Channel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default CreateChannelModal
