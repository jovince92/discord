import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu';
import { useModal } from '@/Hooks/useModalStore';
import { MemberRole, Server } from '@/types'
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from 'lucide-react';
import React, { FC } from 'react'

interface ServerHeaderProps{
    role:MemberRole;
    server:Server;
}

const ServerHeader:FC<ServerHeaderProps> = ({role,server}) => {
    const isAdmin= role==='ADMIN';
    const isMod = isAdmin||role==='MODERATOR';
    const {onOpen} = useModal();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='focus:!outline-none' asChild>
                <button className='w-full text-base font-semibold px-2.5 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition'>
                    {server.name}
                    <ChevronDown className='h-5 w-5 ml-auto' />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[0.125rem]'>
                {
                    isMod&&<DropdownMenuItem onClick={()=>onOpen('Invite',{server})} className='text-indigo-600 dark:text-indigo-400 px-2.5 py-1.5 text-sm cursor-pointer'>Invite People <UserPlus className='h-4 w-4 ml-auto' /> </DropdownMenuItem>
                }
                {
                    isAdmin&&<DropdownMenuItem onClick={()=>onOpen('EditServer',{server})}  className='px-2.5 py-1.5 text-sm cursor-pointer'>Server Settings <Settings className='h-4 w-4 ml-auto' /> </DropdownMenuItem>
                }
                {
                    isAdmin&&<DropdownMenuItem onClick={()=>onOpen('Members',{server})} className='px-2.5 py-1.5 text-sm cursor-pointer'>Manage Members<Users className='h-4 w-4 ml-auto' /> </DropdownMenuItem>
                }
                {
                    isMod&&<DropdownMenuItem onClick={()=>onOpen('CreateChannel',{server})} className='px-2.5 py-1.5 text-sm cursor-pointer'>Create Channel<PlusCircle className='h-4 w-4 ml-auto' /> </DropdownMenuItem>
                }
                {
                    isMod&&<DropdownMenuSeparator />
                }
                {
                    isAdmin&&<DropdownMenuItem onClick={()=>onOpen('DeleteServer',{server})} className='text-destructive px-2.5 py-1.5 text-sm cursor-pointer'>Delete Server<Trash className='h-4 w-4 ml-auto' /> </DropdownMenuItem>
                }
                {
                    !isAdmin&&<DropdownMenuItem onClick={()=>onOpen('LeaveServer',{server})} className='text-destructive px-2.5 py-1.5 text-sm cursor-pointer'>Leave Server<LogOut className='h-4 w-4 ml-auto' /> </DropdownMenuItem>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ServerHeader