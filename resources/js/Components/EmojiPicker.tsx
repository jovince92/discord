import React, { FC, useEffect } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Smile } from 'lucide-react';
import Picker from '@emoji-mart/react';
import EmojiData from '@emoji-mart/data';
import { useTheme } from '@/lib/ThemeProvider';

interface EmojiPickerProps{
    onChange:(value:string)=>void;
}

const EmojiPicker:FC<EmojiPickerProps> = ({onChange}) => {
    const {theme} = useTheme();
    
    return (
        <Popover>
            <PopoverTrigger>
                <Smile className='text-neutral-500 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-300 transition' />
            </PopoverTrigger>
            <PopoverContent side='right' sideOffset={40} className='bg-transparent border-none shadow-none drop-shadow-none mb-16'>
                <Picker data={EmojiData} onEmojiSelect={(emoji:any)=>onChange(emoji.native)} theme={theme} />
            </PopoverContent>
        </Popover>
    )
}

export default EmojiPicker