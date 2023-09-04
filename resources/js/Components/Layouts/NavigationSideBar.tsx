import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import {FC, useEffect} from 'react'
import NavigationAction from './NavigationAction';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import NavigationItem from './NavigationItem';
import ModeToggle from '../ModeToggle';
import UserAvatar from '../UserAvatar';



const NavigationSideBar:FC = () => {
    const {auth,servers,current_server} = usePage<PageProps>().props;
    const {user}=auth;
    

    return (
        <div className='flex flex-col space-y-3.5 items-center h-full text-primary w-full bg-neutral-200 dark:bg-neutral-900  py-2.5'>
            <NavigationAction />
            <Separator className='h-[0.12rem] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto' />
            <ScrollArea className='flex-1 w-full'>
                {
                    servers.map(server=>(
                        <div key={server.id} className='mb-3.5'>
                            <NavigationItem server={server} />
                        </div>  
                    ))
                }
            </ScrollArea>
            <ModeToggle />
            <UserAvatar user={user} />
        </div>
    )
}

export default NavigationSideBar