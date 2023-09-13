import { PageProps, User } from '@/types';
import { usePage } from '@inertiajs/react';
import {FC,  useEffect,  useRef} from 'react'
import ChatWelcome from './ChatWelcome';
import { useChatQuery } from '@/Hooks/useChatQuery';
import { Loader2, ServerCrash } from 'lucide-react';
import ChatItem from './ChatItem';

interface ChatMessagesProps{
    getMsgsRoute:string;
    type:"Channel"|"Conversation";
}

const ChatMessages:FC<ChatMessagesProps> = ({getMsgsRoute,type}) => {
    
    const {current_channel,auth} = usePage<PageProps>().props;
    
    if(!current_channel){
        return null;
    }
    
    const {data,fetchNextPage,hasNextPage,isFetchingNextPage,status} = useChatQuery({queryRoute:getMsgsRoute,queryKey:`channel_${current_channel.id.toString()}`,value:""});
    const paginatedMessage=data?.pages[0];
    const messages=paginatedMessage?.data;
    

    const chatRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    useEffect(()=>{
        if(data?.pages[1]){
            console.log(data?.pages[1])
        }
    },[data?.pages]);
    if(status==='loading'){
        return(
            <div className='flex flex-col flex-1 justify-center items-center'>
                <Loader2 className='h-7 w-7 text-neutral-500 animate-spin my-3.5' />
                <p className='text-xs'>Loading Messages...</p>
            </div>
        );
    }

    if(status==='error'){
        return(
            <div className='flex flex-col flex-1 justify-center items-center'>
                <ServerCrash className='h-7 w-7 text-neutral-500 my-3.5' />
                <p className='text-xs'>Server Error</p>
            </div>
        );
    }

    return (
        <div ref={chatRef} className='flex-1 flex flex-col py-3.5 overflow-y-auto'>
            {
                !hasNextPage&&(
                    <>
                        <div className='flex-1' />
                        <ChatWelcome type={type} name={current_channel.name} />
                    </>
                )
            }
            {
                hasNextPage && (
                    <div className='flex justify-center'>
                        {
                            isFetchingNextPage?<Loader2 className='h-6 w-6 text-neutral-600 animate-ping' />:(
                                <button onClick={()=>fetchNextPage()} className='text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition text-xs'>Load Previous Messages...</button>
                            )
                        }
                    </div>
                )
            }
            <div className='flex flex-col-reverse mt-auto'>
                {
                    messages?.map(message=>(
                        <ChatItem key={message.id} message={message} />
                    ))
                }
            </div>
            <div ref={bottomRef} />
        </div>
    )
}

export default ChatMessages