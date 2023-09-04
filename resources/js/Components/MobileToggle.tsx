import { Menu } from 'lucide-react'
import {FC} from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import NavigationSideBar from './Layouts/NavigationSideBar'
import ServerSidebar from './Layouts/ServerIdLayout/ServerSidebar'

const MobileToggle:FC = () => {
    return (
        <Sheet>
            <SheetTrigger asChild className='z-0'>
                <Button variant='ghost' size='icon' className='flex md:hidden'>
                    <Menu />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className='p-0 flex gap-0'>
                <div className='w-[4.5rem]'>
                    <NavigationSideBar />
                </div>
                <ServerSidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileToggle