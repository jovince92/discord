import { useLaravelEcho } from '@/Providers/ConversationProvider';
import  { FC } from 'react'
import { Badge } from './ui/badge';

const WebSocketIndicator:FC = () => {
    const {echoInstance} = useLaravelEcho();
    
    // if(!echoInstance){
    //     return(
    //         <Badge variant='outline' className='bg-yellow-600 text-white border-none'>Connecting...</Badge>
    //     )
    // }

    return (
        <Badge variant='outline' className='bg-emerald-600 text-white border-none'>Connected</Badge>
    )
}

export default WebSocketIndicator