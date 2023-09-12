import { Message, User } from '@/types';
import { Channel } from 'laravel-echo';
import React, { FC, ReactNode, createContext, useContext, useEffect,  useState } from 'react'


const ConversationContext = createContext({
    onlineUsers:[] as User[],
    echoInstance:undefined as undefined|Channel
});



export const useLaravelEcho = () =>{
    return useContext(ConversationContext);
}
const ConversationProvider:FC<{children:ReactNode}> = ({children}) => {
    const [onlineUsers,setOnlineUsers] = useState<User[]>([]);
    const [echoInstance,setEchoInstance] = useState<Channel>();
    useEffect(()=>{
        const echo = window.Echo.join('global_channel')
        .here((users:User[])=>{
            //setOnlineUsers(users);
        })
        .error(()=>setEchoInstance(undefined));
        // .listen('NewConversationUpdate',({message}:{message:Message})=>{
        //     console.log(message);
        // });
        // .listen('LogOutEvent',({user}:{user:User})=>{
        //     setOnlineUsers(val=>val.filter(({id})=>id!==user.id));
        // }) //@ts-ignore
        // .listen('LogInEvent',({user}:{user:User})=>{
        //     setOnlineUsers(val=> val.findIndex(({id})=>id===user.id)>0?val:[...val,user] );
        // }) //@ts-ignore
        // .leaving((user:User)=>{
        //     setOnlineUsers(val=>val.filter(({id})=>id!==user.id));
        // })
        // .joining((user:User)=>{
        //     setOnlineUsers(val=> val.findIndex(({id})=>id===user.id)>0?val:[...val,user] );
        //});
        setEchoInstance(val=>val=echo);
    },[]);
    
    
    return (
        <ConversationContext.Provider value={{ onlineUsers,echoInstance }}>{children}</ConversationContext.Provider>
    )
}

export default ConversationProvider