
import { Outlet } from 'react-router-dom'
// import Nav from './Nav'
import SideNav from './sidebar'


function Layout() {
    return (
        <div className='flex max-h-fit  bg-gray-800 text-neutral-200 w-full'>
            <div className='w-[150px] hidden md:block'>
                <SideNav />
            </div>
            
                {/* <Nav /> */}
                <div className="h-fit w-full">
                    
                        <Outlet />
                    
                </div>

            
        </div>
    )
}

export default Layout