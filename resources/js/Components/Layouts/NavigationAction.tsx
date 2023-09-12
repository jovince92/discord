
import { MessageCircle, Plus } from 'lucide-react';
import React, { FC } from 'react'
import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import ActionTooltip from './ActionToolTip';
import { useModal } from '@/Hooks/useModalStore';


interface NavigationActionProps extends HTMLAttributes<HTMLButtonElement>{
    disabled?:boolean;
}

const NavigationAction:FC<NavigationActionProps> = forwardRef(({disabled,onClick,...props},ref) => {
    const { onOpen } = useModal();
    return (
        <>
            <button onClick={()=>onOpen('CreateServer')} className='group'>
                <ActionTooltip label='Add a Server' align='center' side='right'>
                    <div className='p-2 flex mx-2.5 h-12 w-12 rounded-[1.5rem] group-hover:rounded-[1rem] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500'>
                        <Plus className='group-hover:text-white transition text-emerald-500' size={50} />
                    </div>
                </ActionTooltip>
            </button>


        </>
    )
})

export default NavigationAction
