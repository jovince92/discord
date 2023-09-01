import {  FC,  useCallback,  useMemo, useState } from 'react';
import { Dialog, DialogContent,  DialogHeader, DialogTitle } from '../ui/dialog';
import { useModal } from '@/Hooks/useModalStore';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Check, Copy, RefreshCcw } from 'lucide-react';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { useToast } from '../ui/use-toast';
import { cn } from '@/lib/utils';


const InviteModal:FC = () => {
    const {isOpen,onClose,type} = useModal();
    const {current_server} = usePage<PageProps>().props;
    const [copied,setCopied] = useState(false);
    const [generating,setGenerating] = useState(false);
    const [inviteUrl,setInviteUrl]=useState(route('server.invite',{invite_code:current_server.invite_code}));
    const { toast } = useToast();
    
    const onCopy = () =>{
        navigator.clipboard.writeText(inviteUrl);
        setCopied(true);
        toast({
            'title':'Copied',
        })
        setTimeout(()=>{
            setCopied(false);
        },1000);
    }

    const OPEN = useMemo(()=>isOpen&&type==='Invite',[isOpen,type]);
    const generateLink = useCallback(() =>{
        setGenerating(true);
        axios.post(route('server.generate'),{
            server_id:current_server.id
        })
        .then(({data})=>setInviteUrl(route('server.invite',{invite_code:data})))
        .catch(e=>toast({
            'title':'Internal Error',
            'description':'Please Try again',
            'variant':'destructive',
        }))
        .finally(()=>setGenerating(false));
    },[generating,current_server]);
    return (
        <Dialog open={OPEN} onOpenChange={onClose}>   
            <DialogContent className='p-0 overflow-auto'>
                <DialogHeader className='pt-7 px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>Invite People</DialogTitle>
                </DialogHeader>
                <div className='p-5'>
                    <Label className='uppercase text-xs font-bold text-muted-foreground'>Server Invite Link</Label>
                    <div className='flex items-center mt-1.5 gap-x-1.5'>
                        <Input readOnly disabled={generating} className='bg-secondary !border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0' value={inviteUrl} />
                        <Button disabled={generating} onClick={onCopy} size='icon'>
                            {copied?<Check className='h-4 w-4' />:<Copy className='w-4 h-4' />}                            
                        </Button>
                    </div> 
                    <Button disabled={generating} onClick={generateLink} variant='link' size='sm' className='text-xs'>
                        Generate new Link
                        <RefreshCcw className={cn('h-4 w-4 ml-1.5',
                            generating&&'animate-spin'
                        )} />
                    </Button>
                </div>
                </DialogContent>
        </Dialog>
    )
}

export default InviteModal


