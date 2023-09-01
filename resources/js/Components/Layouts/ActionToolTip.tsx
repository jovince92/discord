import React, { FC, ReactNode } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface ActionTooltipProps{
    label:string;
    children:ReactNode;
    side?:'top'|'right'|'bottom'|'left';
    align?:'start'|'center'|'end'
}

const ActionTooltip:FC<ActionTooltipProps> = ({label,children,side,align}) =>{
    return(
        <TooltipProvider>
            <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent side={side} align={align}>
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default ActionTooltip