import { PageProps, User } from '@/types';
import { usePage } from '@inertiajs/react';
import {FC,  useMemo} from 'react'
import ChatWelcome from './ChatWelcome';
import { useChatQuery } from '@/Hooks/useChatQuery';
import { Loader2, ServerCrash } from 'lucide-react';
import ChatItem from './ChatItem';

interface ChatMessagesProps{
    getMsgsRoute:string;
    type:"Channel"|"Conversation";
}

const ChatMessages:FC<ChatMessagesProps> = ({getMsgsRoute,type}) => {
    
    const {current_server,current_channel,auth} = usePage<PageProps>().props;
    const {user} = auth;
    const {data,fetchNextPage,hasNextPage,isFetchingNextPage,status} = useChatQuery({queryRoute:getMsgsRoute,value:""});
    if(!current_channel){
        return null;
    }

    const paginatedMessage=useMemo(()=>(data?.pages||data?.pages[0])?data.pages[0]:undefined,[data?.pages]);

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
        <div className='flex-1 flex flex-col py-3.5 overflow-y-auto'>
            <div className='flex-1' />
            <ChatWelcome type={type} name={current_channel.name} />
            <div className='flex flex-col-reverse mt-auto'>
                {
                    paginatedMessage?.data.map(message=>(
                        <ChatItem key={message.id} message={message} />
                    ))
                }
            </div>
        </div>
    )
}

export default ChatMessages