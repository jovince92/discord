import Echo from "laravel-echo";

export type MemberRole='ADMIN'|'MODERATOR'|"GUEST";
export type ChannelType='TEXT'|'VIDEO'|'AUDIO';

export interface User {
    id: number;
    name: string;
    email: string;
    image?: string
    email_verified_at: string;
    pivot:{
        member_role:MemberRole
    }
}

export interface Server{
    id:number;
    name:string;
    image:string;
    invite_code:string;
    users:User[];
    user:User;
    user_id:number;
    channels:Channel[];
    created_at:string;
}

export interface Channel{
    id:number;
    server_id:number;
    user_id:number;
    user:User;
    server:Server;
    name:string;
    type:ChannelType;
    created_at:string;
}

export interface Conversation{
    id:number;
    initiator_id:number;
    initiator:User;
    reciever_id:number;
    reciever:User;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    servers:Server[];
    current_server:Server;
    current_channel?:Channel;
    current_conversation?:Conversation;
    base_url:string;
};



declare global {
    interface Window {
        Pusher: any;
        Echo:Echo
    }
  }