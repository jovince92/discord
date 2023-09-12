import { useLaravelEcho } from '@/Providers/ConversationProvider';
import { Message, PaginatedMessage } from '@/types';
import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

interface ChatQueryProps{
    queryRoute:string;
    value:string;
}


export const useChatQuery = ({queryRoute,value}:ChatQueryProps) =>{
    const fetchMessages = async ({pageParam = undefined}) =>{
        const {data} = await axios.get(queryRoute) as {data:PaginatedMessage};
        return data;
    }

    const {echoInstance} = useLaravelEcho();

    const {data,fetchNextPage,hasNextPage,isFetchingNextPage,status} = useInfiniteQuery({
        queryKey:[''],
        queryFn:fetchMessages,
        getNextPageParam:(lastpage)=>lastpage?.next_page_url,
        refetchInterval:echoInstance?false:1000
    }); 

    return {data,fetchNextPage,hasNextPage,isFetchingNextPage,status}
}