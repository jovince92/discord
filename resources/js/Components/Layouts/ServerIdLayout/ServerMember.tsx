import { PageProps, User } from '@/types'
import { usePage } from '@inertiajs/react';
import React, { FC } from 'react'

interface ServerMemberProps{
    member:User
}

const ServerMember:FC<ServerMemberProps> = ({member}) => {
    const {current_server} = usePage<PageProps>().props;
    return (
        <div>ServerMember</div>
    )
}

export default ServerMember