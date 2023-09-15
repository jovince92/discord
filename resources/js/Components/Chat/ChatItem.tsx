import { Message, PageProps } from '@/types';
import {FC,FormEventHandler,useEffect,useMemo, useState,useRef, useCallback} from 'react';
import UserAvatar from '../UserAvatar';
import ActionTooltip from '../Layouts/ActionToolTip';
import { useForm, usePage } from '@inertiajs/react';
import { ROLEICONMAP } from '../Layouts/ServerIdLayout/ServerSidebar';
import {format} from 'date-fns'
import { cn } from '@/lib/utils';
import { Edit, Trash } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import axios from 'axios';
import { toast } from '../ui/use-toast';
import { useModal } from '@/Hooks/useModalStore';
interface ChatItemProps{
    message:Message;
    type:"Channel"|"Conversation";
}

const DATE_FORMAT = "d MMMM yyyy HH:mm"

const ChatItem:FC<ChatItemProps> = ({message,type}) => {
    const {current_server,current_channel,auth,current_conversation} = usePage<PageProps>().props;
    const [newContent,setNewContent] = useState(message.content);
    const [loading,setLoading]  = useState(false);
    const [isEditing,setIsEditing]  = useState(false);
    
    const {user} = message;
    const {user:currentUser} = auth;
    const role=useMemo(()=>current_server.users.find(({id})=>id===user.id)?.pivot.member_role,[current_server,user]);
    const fileType=message.file?.split(".").pop();
    
    const canDeleteMsg = useMemo(()=>!message.deleted_at &&((type==='Channel'&&(role==='ADMIN'||role==='MODERATOR'))||currentUser.id===message.user_id),[message,role]);
    const canEditMsg = useMemo(()=>!message.deleted_at &&(currentUser.id===message.user_id) && !message.file,[message,role]);
    const fileImage = fileType==='pdf'?route('home')+'/uploads/pdf/pdf.png':message.file;
    
    const {onOpen,data:ModalData} = useModal();

    const input = useRef<HTMLInputElement>(null);

    const {post} =useForm({user_id:message.user_id});
    const onInitiate = () =>{
        if(message.user_id===currentUser.id){
            return null;
        }
        post(route('server.conversation.initiate',{server_id:current_server.id}));
    }
    const onSubmit:FormEventHandler<HTMLFormElement> = useCallback((e) => {
        e.preventDefault();
        if(!current_channel&&type=='Channel'){
            return;
        }
        if(!current_conversation&&type==='Conversation'){
            return;
        }
        setLoading(true);
        const updateRoute = type==='Channel'?route('server.channel.message.update',{
            server_id:current_server.id,
            channel_id:current_channel!.id,
        }):route('server.conversation.update',{
            server_id:current_server.id,
            conversation_id:current_conversation!.id,
        });

        axios.post(updateRoute,{
            message:newContent,
            message_id:message.id
        })
        .then(()=>setIsEditing(false))
        .catch(()=>toast({title:'Internal Error',description:'Please Try Again'}))
        .finally(()=>setLoading(false));
    },[current_channel,current_server,newContent,message.id,type,current_conversation]);

    const onDelete = useCallback(() =>{
        if(!current_channel&&type=='Channel'){
            return;
        }
        if(!current_conversation&&type==='Conversation'){
            return;
        }
        const deleteRoute = type==='Channel'? route('server.channel.message.destroy',{
            server_id:current_server.id,
            channel_id:current_channel!.id,
            message_id:message.id
        }):route('server.conversation.destroy',{
            server_id:current_server.id,
            conversation_id:current_conversation!.id,
            direct_message_id:message.id
        });

        onOpen('DeleteMessage',{
            apiRoute:deleteRoute
        });
        

    },[current_channel,current_server,message.id,type,current_conversation]);

    useEffect(()=>{
        
        if(input.current){
            input.current.focus();
        }
        const handleKeyDown = (e:KeyboardEvent) =>{
            if(e.key==='Escape'||e.code==='Escape'){
                setIsEditing(false);
            }
        }
        window.addEventListener('keydown',handleKeyDown);
        return () => window.removeEventListener('keydown',handleKeyDown);
    },[]);

    useEffect(()=>{
        if(input.current&&isEditing){
            input.current.focus();
        }
    },[input,isEditing]);

    return (
        <div className='relative group flex items-center hover:bg-neutral-300 dark:hover:bg-neutral-900 p-3.5 transition w-full'>
            <div className='group flex gap-x-1.5 items-start w-full'>
                <div onClick={onInitiate} className='cursor-pointer hover:drop-shadow-md transition'>
                    <UserAvatar user={user} />
                </div>
                <div className='flex flex-col w-full'>
                    <div className='flex items-center gap-x-1.5'>
                        <div className='flex items-center'>
                            <p onClick={onInitiate} className={cn('font-semibold text-sm transition ',message.user_id!==currentUser.id&&'cursor-pointer hover:underline')}>
                                {user.name}
                            </p>
                            <ActionTooltip label={role||""}>
                                <p>{ROLEICONMAP[role||"GUEST"]}</p>
                            </ActionTooltip>
                        </div>
                        <span className='text-xs text-neutral-500 dark:text-neutral-400'>{format(new Date(message.created_at),DATE_FORMAT)}</span>
                    </div>
                    {
                        
                        (message.file&&!message.deleted_at)&&(
                            <a href={message.file} target='_blank' rel='noopener noreferrer' className={cn('relative aspect-square rounded-md mt-1.5 overflow-hidden border flex items-center bg-secondary ',
                                fileType==='pdf'?'h-10 w-10':'h-48 w-48')}  >
                                <img src={fileImage} alt='file' className='object-cover' />
                            </a>
                            
                        )
                    }
                    <p className={cn('text-xs',fileType==='pdf'&&!message.deleted_at?'block':'hidden')}>PDF File</p>
                    {
                        ( !isEditing) && (
                            <p className={cn('text-sm text-neutral-600 dark:text-neutral-300',
                                message.deleted_at && 'italic text-neutral-500 dark:text-neutral-400 text-xs mt-1')}>
                                {!message.deleted_at?message.content:'Message Deleted'}
                                {
                                    ((message.created_at!==message.updated_at)&&!message.deleted_at) &&(
                                        <span className='text-[0.625rem] mx-1.5 text-neutral-500 dark:text-neutral-400'>
                                            (edited)
                                        </span>
                                    )
                                }
                            </p>
                        )
                    }
                    {
                        (!message.file && isEditing) && (
                            <>
                                <form className='flex items-center w-full gap-x-1.5 pt-1.5' onSubmit={onSubmit}>
                                    <div className='flex-1'>
                                        <Input disabled={loading} ref={input} value={newContent} onChange={({target})=>setNewContent(target.value)} className='p-1.5 bg-neutral-200/90 dark:bg-neutral-700/75 border-none !border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0 text-neutral-600 dark:text-neutral-200' />
                                    </div>
                                    <Button size='sm' disabled={loading} >Save</Button>
                                </form>
                                <span className='text-[0.625rem] mt-1 text-neutral-400'>
                                    Press ESC to cancel. Press Enter to save.
                                </span>
                            </>
                        )
                    }
                </div>
            </div>
            {
                canDeleteMsg && (
                    <div className='hidden group-hover:flex items-center gap-x-1.5 absolute p-1 -top-2 right-5 bg-white dark:bg-neutral-800 border rounded-sm'>
                        {
                            canEditMsg && (
                                <ActionTooltip label='Edit'>
                                    <Edit onClick={()=>setIsEditing(true)} className='cursor-pointer ml-auto w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition' />
                                </ActionTooltip>
                            )
                        }
                        <ActionTooltip label='Delete'>
                            <Trash onClick={onDelete} className='cursor-pointer ml-auto w-4 h-4 text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 transition' />
                        </ActionTooltip>
                    </div>
                )
            }
        </div>
    )
}

export default ChatItem