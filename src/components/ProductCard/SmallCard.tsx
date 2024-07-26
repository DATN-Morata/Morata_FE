import clsx from 'clsx';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Currency } from '~/utils';
import ProductActions from '../_common/ProductActions';
import RatingDisplay from '../_common/RatingDisplay';
import PopupAttributes from '~/components/_common/PopupAttributes';
import { IProductItemNew } from '~/types/Product';
import { generateLink } from './_helper';
import { Image, Spin } from 'antd';
import { useMutationCart } from '~/hooks/cart/Mutations/useAddCart';
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';

type PropTypeProduct = {
    product: IProductItemNew;
};

const SmallCard = ({ product }: PropTypeProduct) => {
    const discountPercentage = 10;
    const { mutate, isPending } = useMutationCart();
    const user = useSelector((state: RootState) => state.authReducer.user);
    const handleAddCart = () => {
        mutate({
            productVariation: product.variationIds[0]._id,
            quantity: 1,
            userId: user ? user._id : '',
        });
    };
    const newPrice = product.variationIds?.[0].price * (1 + discountPercentage / 100);
    const [isActiveProductActions, setIsActiveProductActions] = useState<boolean>(false);

    const handleSetDateActive = () => {
        setIsActiveProductActions(!isActiveProductActions);
    };

    return (
        <div className='rounded-xl bg-white p-5'>
            <div className='group relative justify-between gap-5 rounded'>
                {/* Image */}
                <div
                    className='group relative w-full'
                    data-active={isActiveProductActions ? 'card' : ''}
                    onMouseEnter={handleSetDateActive}
                    onMouseLeave={handleSetDateActive}
                >
                    <Link
                        to={generateLink({ productId: product._id, categoryId: product.categoryId })}
                        className='flex h-[224px] w-full items-center justify-center overflow-hidden'
                    >
                        {/* HOVER IMAGE */}
                        {isActiveProductActions && (
                            <img
                                loading='lazy'
                                src={product.images[0]}
                                alt=''
                                className='absolute h-full w-full transition-transform duration-700 ease-linear md:w-56'
                            />
                        )}

                        {/* THUMBNAIL */}
                        <img
                            loading='lazy'
                            src={product.thumbnail}
                            alt=''
                            className='relative z-10 w-full opacity-100 transition-opacity duration-700 ease-linear hover:opacity-0 hover:duration-300 hover:ease-linear md:w-56'
                        />
                    </Link>
                    <ProductActions />
                </div>

                {/* Name */}
                <div className='mt-[15px] cursor-pointer'>
                    <Link to={generateLink({ productId: product._id, categoryId: product.categoryId })}>
                        <h4 className=' cursor-pointer truncate text-title-sm2 font-medium text-[#0068c9] hover:text-[#ea0d42] hover:transition-colors hover:duration-500'>
                            {product.name}
                        </h4>

                        {/* Review */}
                        <RatingDisplay rating={product.rating} reviews={product.reviewCount} />

                        {/* Price */}
                        <div className='mb-3 mt-[10px] flex items-center gap-4'>
                            <span
                                className={clsx('text-base font-semibold leading-5 text-[#222]', {
                                    'text-red-600': discountPercentage > 0,
                                })}
                            >
                                {Currency.format(product.variationIds?.[0].price)}
                            </span>
                            {discountPercentage > 0 && (
                                <del className=' text-gray-400 text-base font-semibold leading-5'>
                                    {Currency.format(newPrice)}
                                </del>
                            )}
                        </div>
                    </Link>

                    {/* Variants */}
                    <div className='my-2 flex gap-2'>
                        {product.variationIds.map((variant, i) => (
                            <Image
                                key={i}
                                width={45}
                                height={45}
                                preview={false}
                                src={variant.image}
                                className='rounded-lg border border-solid object-cover p-1'
                            />
                        ))}
                    </div>

                    {/* Add to cart btn */}
                    {/* <PopupAttributes product={product}> */}
                    <button
                        onClick={handleAddCart}
                        className='block w-full rounded-3xl border-black bg-black py-2 text-center text-sm text-white transition-colors duration-300 ease-linear hover:bg-[#16bcdc]'
                    >
                        {isPending && <Spin />}
                        {!isPending && 'Add to cart'}
                    </button>
                    {/* </PopupAttributes> */}
                </div>

                {/* Discount */}
                {discountPercentage > 0 ? (
                    <div className='absolute left-0 top-0  z-10 inline-block select-none rounded-sm bg-lime-600 px-2 text-sm leading-6 text-white'>
                        -{discountPercentage}%
                    </div>
                ) : (
                    <div className='absolute left-0 top-0 z-[50] inline-block select-none rounded-sm bg-[#16bcdc] px-2 text-sm text-white'>
                        New
                    </div>
                )}
            </div>
        </div>
    );
};

export default SmallCard;
