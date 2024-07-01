import { DownOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import StaticImages from '~/assets';
import ClickOutside from '~/components/_common/ClickOutside';
import ExitIcon from '~/components/_common/Icons/ExitIcon';
import MenuItem from './MenuItem';
import useLogout from '~/hooks/Mutations/Auth/useLogout';

const DropdownUser = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const hangleLogout = useLogout();

    return (
        <ClickOutside onClick={() => setDropdownOpen(false)} className='relative'>
            <Link onClick={() => setDropdownOpen(!dropdownOpen)} className='flex items-center gap-4' to='#'>
                <span className='hidden text-right lg:block'>
                    <span className='block text-sm font-medium text-black dark:text-white'>Thomas Anree</span>
                    <span className='block text-xs'>UX Designer</span>
                </span>

                <span className='h-12 w-12 rounded-full'>
                    <img src={StaticImages.userImageDf} alt='User' className='h-10 rounded-full border object-cover' />
                </span>
                <DownOutlined className='hidden fill-current sm:block' />
            </Link>

            {/* <!-- Dropdown Start --> */}
            {dropdownOpen && (
                <div
                    className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark`}
                >
                    <ul className='flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark'>
                        <MenuItem />
                    </ul>
                    <button
                        onClick={hangleLogout}
                        className='flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base'
                    >
                        <ExitIcon />
                        Log Out
                    </button>
                </div>
            )}
            {/* <!-- Dropdown End --> */}
        </ClickOutside>
    );
};

export default DropdownUser;