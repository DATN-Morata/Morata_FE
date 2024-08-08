import { useState } from 'react';
import { Link } from 'react-router-dom';
import RatingDisplay from '../_common/RatingDisplay';
import { Currency } from '~/utils';
import clsx from 'clsx';
import { IProductItemNew } from '~/types/Product';
import { MAIN_ROUTES } from '~/constants/router';

type PropTypeProduct = { product: IProductItemNew };
const FeatureCard = ({ product }: PropTypeProduct) => {
    const discountPercentage = 10;

    const [isScale, setIsScale] = useState<boolean>(false);
    const newPrice = product.variationIds?.[0].price * (1 + discountPercentage / 100);
    const handleScale = (status: string) => {
        if (status === 'open') {
            setIsScale(true);
        } else {
            setIsScale(false);
        }
    };

    return (
        <div className='rounded-xl bg-white p-8'>
            <div className='relative grid grid-cols-12 justify-between gap-5 rounded'>
                <Link
                    to={`${MAIN_ROUTES.PRODUCTS}/${product._id}`}
                    className='relative col-span-5 hidden w-full max-w-24 md:block'
                >
                    <img
                        loading='lazy'
                        src={product.images[1]}
                        alt=''
                        className={`absolute bottom-0 left-0 right-0 top-0 scale-105 transition-transform duration-500 ease-linear ${!isScale ? 'hover:duration-500 hover:ease-linear' : ''}`}
                    />
                    <img
                        loading='lazy'
                        src={product.thumbnail}
                        alt=''
                        className='absolute bottom-0 left-0 right-0 top-0 opacity-100 transition-opacity duration-500 ease-linear hover:opacity-0 hover:duration-300 hover:ease-linear'
                        onFocus={() => handleScale('open')}
                        onMouseOver={() => handleScale('open')}
                        onMouseLeave={() => handleScale('close')}
                    />
                </Link>

                <div className='col-span-7'>
                    <Link className='cursor-pointer' to={`${MAIN_ROUTES.PRODUCTS}/${product._id}`}>
                        <h4 className='line-clamp-2 text-ellipsis text-title-sm font-medium text-[#0068c9] hover:text-[#ea0d42] hover:transition-colors hover:duration-500'>
                            {product.name}
                        </h4>

                        <RatingDisplay rating={product.rating} reviews={product.reviewCount} />

                        <div className='mb-3 flex gap-x-2'>
                            <span
                                className={clsx('text-base font-semibold leading-5', {
                                    'text-red-600': discountPercentage,
                                })}
                            >
                                {Currency?.format(product.variationIds?.[0].price)}
                            </span>

                            {discountPercentage > 0 && (
                                <del className=' text-gray-500 hidden text-[12px] font-semibold leading-5 lg:block'>
                                    {Currency.format(newPrice)}
                                </del>
                            )}
                        </div>
                    </Link>
                </div>
                {discountPercentage > 0 && (
                    <div className='absolute left-0  top-0 inline-block select-none rounded-sm bg-lime-600 px-3 text-sm text-white'>
                        -5%
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeatureCard;
