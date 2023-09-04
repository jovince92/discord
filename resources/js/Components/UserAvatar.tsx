import React, { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { User } from '@/types';

interface UserAvatarProps{
    user?:User;
    className?:string;
}

const UserAvatar:FC<UserAvatarProps> = ({user,className}) => {
        
    if(!user){
        return null;
    }

    return (
        <Avatar className={cn('!max-h-7 !max-w-[1.75rem] md:!max-h-10 md:!max-w-[2.5rem]',className)}>
            <AvatarImage src={user.image} alt="User" />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar