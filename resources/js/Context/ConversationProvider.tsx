import { Message, User } from '@/types';
import React, { FC, ReactNode, createContext, useEffect, useState } from 'react'


const ConversationContext = createContext({});


const ConversationProvider:FC<{children:ReactNode}> = ({children}) => {
    const [onlineUsers,setOnlineUsers] = useState<User[]>([]);
    useEffect(()=>{
        window.Echo.join('global_channel')
        .here((users:User[])=>{
            //setOnlineUsers(users);
        })
        .listen('NewConversationUpdate',({message}:{message:Message})=>{
            console.log(message);
        });
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
    },[]);

    return (
        <ConversationContext.Provider value={{ onlineUsers }}>{children}</ConversationContext.Provider>
    )
}

export default ConversationProvider