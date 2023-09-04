import {  FC,  useCallback,  useEffect,  useMemo, useState } from 'react';
import { Dialog, DialogContent,  DialogDescription,  DialogHeader, DialogTitle } from '@/Components/ui/dialog';
import { useModal } from '@/Hooks/useModalStore';
import { Label } from '../ui/label';

import { MemberRole, PageProps, Server, User } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import axios from 'axios';
import { toast, useToast } from '../ui/use-toast';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';
import UserAvatar from '../UserAvatar';
import { Check, Gavel, Loader2, MoreVertical, Shield, ShieldAlert, ShieldCheck, ShieldQuestion } from 'lucide-react';
import { DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuPortal,DropdownMenuSeparator,DropdownMenuSub,DropdownMenuSubContent,DropdownMenuSubTrigger,DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';


const roleIconMap ={
    'GUEST':null,
    'MODERATOR':<ShieldCheck className='h-4 w-4 ml-1.5 text-indigo-500' />,
    'ADMIN':<ShieldAlert className='h-4 w-4 ml-1.5 text-rose-500' />,
}

const MembersModal:FC = () => {
    const {isOpen,onClose,type} = useModal();
    const {current_server} = usePage<PageProps>().props;
    const {users}=current_server;
    
    const { toast } = useToast();
    

    const OPEN = useMemo(()=>isOpen&&type==='Members',[isOpen,type]);
    
    return (
        <Dialog open={OPEN} onOpenChange={onClose}>   
            <DialogContent className=' overflow-auto'>
                <DialogHeader className='pt-7 px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>Manage Members</DialogTitle>
                    <DialogDescription className='text-center text-muted-foreground'>
                        {
                            `${current_server.users.length.toString()} Member${current_server.users.length>1?'s':''}`
                        }
                    </DialogDescription>
                </DialogHeader>
                <ScrollArea className='mt-7 max-h-[26.25rem] pr-5'>
                    {
                        users.map(user=>(
                            <MemberModalItem current_server={current_server} key={user.id} user={user} />
                        ))
                    }
                </ScrollArea>
                </DialogContent>
        </Dialog>
    )
}

export default MembersModal

interface MemberModalItemProps{
    user:User;
    current_server:Server;
}

const MemberModalItem:FC<MemberModalItemProps> = ({user,current_server}) =>{
    
    const [processing,setProcessing] = useState(false);

    const onRoleChange=(role:MemberRole) =>{
        setProcessing(true);
        router.visit(route('member.role_change'),{
            method:'post',
            data:{
                server_id:current_server.id,
                user_id:user.id,
                role
            },
            preserveState:true,
            onFinish:()=>{
                setProcessing(false);
                toast({
                    'title':'Success',
                    'description':'Role Changed!'
                })
            }
        });
    }

    const onKick = () =>{
        setProcessing(true);
        router.visit(route('member.kick'),{
            method:'post',
            data:{
                server_id:current_server.id,
                user_id:user.id
            },
            preserveState:true,
            onFinish:()=>{
                setProcessing(false);
                toast({
                    'title':'Success',
                    'description':`${user.name} has been Kicked!`
                })
            }
        });
    }


    return(
        <>
            <div  className='flex items-center gap-x-1.5 mb-5'>
                <UserAvatar user={user} />
                <div className='flex flex-col gap-y-1'>
                    <p className='text-xs font-semibold flex items-center gap-x-1'>
                        {user.name}
                        {roleIconMap[user.pivot.member_role]}
                    </p>
                    <p className='text-xs text-muted-foreground'>
                        {user.email}
                    </p>
                </div>
                {
                    ((current_server.user_id!==user.id)&&!processing) &&(
                        <div className='ml-auto'>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <MoreVertical className='h-4 w-4 text-muted-foreground' />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side='left'>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger className='flex items-center'>
                                            <ShieldQuestion className='w-4 h-4 mr-1.5'/>
                                            <span>Role</span>
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuItem onClick={()=>onRoleChange('GUEST')}>
                                                    <Shield className='h-4 w-4 mr-1.5' />
                                                    GUEST
                                                    {
                                                        user.pivot.member_role==='GUEST'&&<Check className='h-4 w-4 ml-auto' />
                                                    }
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={()=>onRoleChange('MODERATOR')}>
                                                    <ShieldCheck className='h-4 w-4 mr-1.5' />
                                                    MODERATOR
                                                    {
                                                        user.pivot.member_role==='MODERATOR'&&<Check className='h-4 w-4 ml-auto' />
                                                    }
                                                </DropdownMenuItem>
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={onKick}>
                                        <Gavel className='h-4 w-4 mr-1.5' />
                                        Kick
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        
                    )
                }
                {
                    processing && <Loader2 className='animate-spin text-secondary-foreground ml-auto w-4 h-4' />
                }
            </div>
            
        </>
    )
}


