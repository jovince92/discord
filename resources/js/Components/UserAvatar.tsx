import React, { FC } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { usePage } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import { cn } from '@/lib/utils';

interface UserAvatarProps{
    user:User;
    className?:string;
}

const UserAvatar:FC<UserAvatarProps> = ({user,className}) => {
    return (
        <Avatar className={cn('!max-h-7 !max-w-[1.75rem] md:!max-h-10 md:!max-w-[2.5rem]',className)}>
            <AvatarImage src={user.image} alt="User" />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
        </Avatar>
    )
}

export default UserAvatar