import { Link } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
// import { CaretIcon } from '~/components/_common/Icons';

// const Columns = () => {
//     return (
//         <ul className='p-2'>
//             <li>
//                 <a href='/' className='mb-5 block text-xl font-semibold text-black'>
//                     Product category
//                 </a>
//             </li>
//             <li>
//                 <a
//                     href='/'
//                     className='block cursor-pointer p-2 text-gray-500 transition-all duration-500 ease-in-out hover:ml-3 hover:bg-white hover:text-blue-500'
//                 >
//                     Sub category
//                 </a>
//             </li>
//             <li>
//                 <a
//                     href='/'
//                     className='block cursor-pointer p-2 text-gray-500 transition-all duration-500 ease-in-out hover:ml-3 hover:bg-white hover:text-blue-500'
//                 >
//                     Sub category
//                 </a>
//             </li>
//             <li>
//                 <a
//                     href='/'
//                     className='block cursor-pointer p-2 text-gray-500 transition-all duration-500 ease-in-out hover:ml-3 hover:bg-white hover:text-blue-500'
//                 >
//                     Sub category
//                 </a>
//             </li>
//             <li>
//                 <a
//                     href='/'
//                     className='block cursor-pointer p-2 text-gray-500 transition-all duration-500 ease-in-out hover:ml-3 hover:bg-white hover:text-blue-500'
//                 >
//                     Sub category
//                 </a>
//             </li>
//         </ul>
//     );
// };

const MenuItem = ({ name, id }: { name: string; id: string }) => {
    return (
        <li className='group list-none font-semibold'>
            <div className='flex items-center'>
                <Link
                    to={`${MAIN_ROUTES.PRODUCTS}?categoryId=${id}`}
                    className=' pr-2  text-[16px] uppercase text-white hover:text-[#16bcdc]   group-hover:border-white '
                >
                    {name}
                </Link>
                {/* <div className=' text-white'>
                    <CaretIcon />
                </div> */}
            </div>
            {/* MENU Products CONTENT */}
            {/* <div className='invisible absolute left-1 z-50 mt-14 grid w-[90%] grid-cols-4 bg-white p-5 opacity-0 duration-500 group-hover:visible group-hover:mt-0 group-hover:opacity-100'>
                <Columns />
                <Columns />
                <Columns />
                <div className='relative'>
                    <img
                        loading='lazy'
                        src='https://demo-morata.myshopify.com/cdn/shopMAIN_ROUTES.PRODUCTSMAIN_ROUTES.PRODUCTS_4_7.jpg?v=1697644644&width=3840'
                        alt='ProductImage'
                        className='h-auto w-full object-cover'
                    />
                    <div className='absolute bottom-0 left-0 w-full p-4 text-center text-lg'>
                        <button className='w-full rounded-md bg-white p-2 font-semibold text-black no-underline hover:underline'>
                            Laptop & Ipad
                        </button>
                    </div>
                </div>
            </div> */}
            {/* END Products MENU CONTENT */}
        </li>
    );
};

export default MenuItem;
