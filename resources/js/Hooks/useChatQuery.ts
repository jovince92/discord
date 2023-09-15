import { useLaravelEcho } from '@/Providers/ConversationProvider';
import { Message, PaginatedMessage } from '@/types';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

interface ChatQueryProps{
    queryRoute:string;
    value:string;
    queryKey:string;
}



export const useChatQuery = ({queryRoute,value,queryKey}:ChatQueryProps) =>{
    const fetchMessages = async ({pageParam = undefined}) =>{
        const {data} = await axios.get(pageParam||queryRoute) as {data:PaginatedMessage};
        return data;
    }

    const {echoInstance} = useLaravelEcho();

    const {data,fetchNextPage,hasNextPage,isFetchingNextPage,status} = useInfiniteQuery({
        queryKey:[queryKey],
        queryFn:fetchMessages,
        getNextPageParam:(lastpage)=>lastpage?.next_page_url,
        refetchInterval:echoInstance?false:1000,
        structuralSharing:false
    }); 

    return {data,fetchNextPage,hasNextPage,isFetchingNextPage,status}
}