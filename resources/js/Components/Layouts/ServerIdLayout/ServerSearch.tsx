import { Button } from '@/Components/ui/button';
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/Components/ui/command';
import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import React, { FC, ReactNode, useEffect, useState } from 'react'



interface ServerSearchProps{
    
    data:{
        label:string;
        type:"CHANNEL"|"MEMBER",
        data?:{
            icon:ReactNode;
            name:string;
            id:number;
        }[];
    }[]
}


const ServerSearch:FC<ServerSearchProps> = ({data}) => {
    const {current_server} = usePage<PageProps>().props;
    
    const handleSelect = ({id,type}:{id:number,type:"CHANNEL"|"MEMBER"}) =>{
        
        setOpen(false);
        if(type==='MEMBER'){
            
        }

        if(type==='CHANNEL'){
            router.get(route('server.channel.index',{
                server_id:current_server.id,
                channel_id:id
            }));
        }
    }

    useEffect(()=>{
        const down = (e:KeyboardEvent)=>{
            if(e.key==='k' && (e.metaKey||e.ctrlKey)){
                e.preventDefault();
                setOpen(val=>!val);
            }
        }
        document.addEventListener("keydown",down);
        return ()=>document.removeEventListener("keydown",down);
    },[]);


    const [open,setOpen] = useState(false);
    return (
        <>
            <Button onClick={()=>setOpen(val=>!val)} size='sm' className='py-1.5 rounded-md flex items-center justify-start gap-x-1.5 w-full' variant='outline'>
                <Search className='w-4 h-4' />
                <p className='font-semibold text-sm text'>Search</p>
                <kbd className='pointer-events-none inline-flex h-4 select-none items-center  gap-1 rounded border bg-muted px-1.5 font-mono text-[0.65rem] font-medium text-muted-foreground ml-auto'>
                    <span className='text-xs'>CTRL+K</span>
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput className='border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0' placeholder='Search Channels/Members' />
                <CommandList>
                    <CommandEmpty>No Results Found</CommandEmpty>
                    {
                        (data||[]).map(({label,type,data : DATA})=>(
                            <CommandGroup  key={label} heading={label}>
                                {DATA?.map(({id,icon,name})=>(
                                    <CommandItem onSelect={()=>handleSelect({id,type})} key={id}>
                                        {icon}
                                        <span>{name}</span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        ))
                    }
                </CommandList>
            </CommandDialog>
        </>
    )
}

export default ServerSearch