import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import React, { FC, ReactNode } from 'react'
import ServerSidebar from './ServerSidebar';

const ServerIdLayout:FC<{children:ReactNode}> = ({children}) => {
    const {current_server} = usePage<PageProps>().props;
    return (
        <div className='h-full'>
            <div className='hidden md:flex flex-col h-full w-60 z-20 inset-y-0 fixed'>
                <ServerSidebar />
            </div>
            <main className='h-full md:pl-60'>
                {children}
            </main>
        </div>
    )
}

export default ServerIdLayout