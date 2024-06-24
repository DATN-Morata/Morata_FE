import { Link } from 'react-router-dom';
import { MAIN_ROUTES } from '~/constants/router';
import useFilters from '~/hooks/_common/useFilters';

const MenuItem = ({ name, id }: { name: string; id: string }) => {
    const { updateFilterAttribute } = useFilters();
    return (
        <li className='group list-none font-semibold'>
            <div className='flex items-center'>
                <Link
                    onClick={() => updateFilterAttribute('categoryId', id)}
                    to={`${MAIN_ROUTES.PRODUCTS}?categoryId=${id}`}
                    className=' pr-2  text-[16px] uppercase text-white hover:text-[#16bcdc]   group-hover:border-white '
                >
                    {name}
                </Link>
            </div>
        </li>
    );
};

export default MenuItem;
