import { Link } from 'react-router-dom';
import DarkModeSwitcher from './DarkModeSwitcher';
import DropdownMessage from './DropdownMessage/DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser/DropdownUser';
import StaticImages from '~/assets';
import { MenuOutlined, SearchOutlined } from '@ant-design/icons';

const Header = (props: { sidebarOpen: string | boolean | undefined; setSidebarOpen: (arg0: boolean) => void }) => {
    return (
        <header className='sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none'>
            <div className='flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11'>
                <div className='flex items-center gap-2 sm:gap-4 lg:hidden'>
                    {/* <!-- Hamburger Toggle BTN --> */}
                    <button
                        aria-controls='sidebar'
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setSidebarOpen(!props.sidebarOpen);
                        }}
                        className='z-99999 block bg-white  p-1.5 shadow-sm dark:bg-boxdark lg:hidden'
                    >
                        <MenuOutlined className='fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary' />
                    </button>
                    {/* <!-- Hamburger Toggle BTN --> */}

                    <Link className='block flex-shrink-0 lg:hidden' to='/'>
                        <img width={32} height={32} src={StaticImages.logo} alt='Logo' />
                    </Link>
                </div>

                <div className='hidden sm:block'>
                    <form action='https://formbold.com/s/unique_form_id' method='POST'>
                        <div className='relative'>
                            <button className='absolute left-0 top-1/2 -translate-y-1/2'>
                                <SearchOutlined className='fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary' />
                            </button>

                            <input
                                type='text'
                                placeholder='Type to search...'
                                className='w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125'
                            />
                        </div>
                    </form>
                </div>

                <div className='flex items-center gap-3 2xsm:gap-7'>
                    <ul className='flex items-center gap-2 2xsm:gap-4'>
                        {/* <!-- Dark Mode Toggler --> */}
                        <DarkModeSwitcher />

                        {/* <!-- Notification Menu Area --> */}
                        <DropdownNotification />

                        {/* <!-- Chat Notification Area --> */}
                        <DropdownMessage />
                    </ul>

                    {/* <!-- User Area --> */}
                    <DropdownUser />
                </div>
            </div>
        </header>
    );
};

export default Header;
