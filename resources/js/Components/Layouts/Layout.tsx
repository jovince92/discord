import {FC, ReactNode} from 'react'
import NavigationSideBar from './NavigationSideBar';
import ModalProvider from '@/lib/ModalProvider';

interface LayoutProps{
    children:ReactNode;
}

const Layout:FC<LayoutProps> = ({children}) => {
    return (
        <>
            <ModalProvider />
            <div className='h-screen'>
                <div className='hidden md:flex flex-col fixed inset-y-0 h-full w-[4.5rem] z-30'>
                    <NavigationSideBar />
                </div>
                <main className='md:pl-[4.5rem] h-full'>
                    {children}
                </main>
            </div>
        </>
    )
}

export default Layout