
import { Outlet } from 'react-router-dom'
// import Nav from './Nav'
import SideNav from './sidebar'


function Layout() {
    return (
        <div className='flex max-h-fit  bg-gray-800 text-neutral-200'>
            <div className='w-[10%]  hidden md:block'>
                <SideNav />
            </div>
            <div className='flex flex-col min-w-[95%] '>
                {/* <Nav /> */}
                <div className="h-fit">
                    
                        <Outlet />
                    
                </div>

            </div>
        </div>
    )
}

export default Layout