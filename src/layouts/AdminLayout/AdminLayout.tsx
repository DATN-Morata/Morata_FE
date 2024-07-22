import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../_components/Admin/Sidebar';
import Header from '../_components/Admin/Header/Header';

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <>
            <div className='flex h-screen overflow-hidden bg-white dark:bg-slate-700 '>
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    <main>
                        <div className='m-4 max-w-screen-2xl rounded-md border border-transparent bg-slate-500 bg-opacity-20 p-4 md:p-6 2xl:p-10'>
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
