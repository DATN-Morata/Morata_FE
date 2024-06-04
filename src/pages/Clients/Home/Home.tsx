import CarouselDisplay, { CarouselItem } from '~/components/_common/CarouselDisplay';
import CategoryPoPularSkeleton from '~/components/_common/skeleton/CategorySkeleton/CategoryPopular';
import MediumSkeleton from '~/components/_common/skeleton/MediumSkeleton';
import SmallSkeleton from '~/components/_common/skeleton/SmallSkeleton';
import WrapperList from '~/components/_common/WrapperList';
import Banner from '~/components/Banner';
import CategoryCard from '~/components/CategoryCard';
import PopupProductList from '~/components/PopupProductList';
import MediumCard from '~/components/ProductCard/MediumCard';
import SmallCard from '~/components/ProductCard/SmallCard';
import ShopBenefits from '~/components/ShopBenefits';
import TopFeaturedProducts from '~/components/TopFeaturedProducts';
import useDocumentTitle from '~/hooks/_common/useDocumentTitle';
import useQueriesHomepage from '~/hooks/Queries/useQueriesHomepage';

const Home = () => {
    useDocumentTitle('Home');

    const [
        { data: ProductsList, isLoading: LoadingAll },
        { data: TopDeals, isLoading: LoadingDeals },
        { data: TopReviews, isLoading: TopReviewsLoading },
        { data: ProductLatest, isLoading: ProductLatestLoading },
        { data: categories, isLoading: categoriesLoading },
    ] = useQueriesHomepage();
    const AllProductsList = ProductsList?.data?.docs;
    const TopDealsProductsList = TopDeals?.data;
    const TopReviewProductsList = TopReviews?.data;
    const LatestList = ProductLatest?.data;
    const categoryList = categories?.data;
    return (
        <div>
            {/* @Banner*/}
            <Banner />

            {/* @ShopBenefits*/}
            <ShopBenefits />

            {/* @Hot Trending Products */}
            <WrapperList title='Hot Trending Products' seeMore={{ path: '/products', name: 'View All Products' }}>
                {LoadingAll && (
                    <>
                        <div className='flex w-full justify-between overflow-hidden'>
                            <SmallSkeleton />
                            <SmallSkeleton />
                            <SmallSkeleton />
                            <SmallSkeleton />
                            <SmallSkeleton />
                        </div>
                    </>
                )}
                {!LoadingAll && (
                    <CarouselDisplay>
                        {AllProductsList?.map((item, i: number) => {
                            return (
                                <CarouselItem key={i}>
                                    <SmallCard product={item} />
                                </CarouselItem>
                            );
                        })}
                    </CarouselDisplay>
                )}
            </WrapperList>

            {/* {/* @Top Deals Of The Day */}
            <WrapperList title='Top Deals Of The Day'>
                {!LoadingDeals && (
                    <CarouselDisplay responsiveCustom={{ laptop: 2, tablet: 1, mobile: 1 }}>
                        {TopDealsProductsList?.map((item, i: number) => {
                            return (
                                <CarouselItem key={i}>
                                    <MediumCard product={item} />
                                </CarouselItem>
                            );
                        })}
                    </CarouselDisplay>
                )}
                {LoadingDeals && (
                    <div className='flex justify-between'>
                        <MediumSkeleton />
                        <MediumSkeleton />
                    </div>
                )}
            </WrapperList>

            {/* @Popular Categories */}
            <WrapperList title='Popular Categories'>
                {categoriesLoading && (
                    <div className='flex justify-center gap-5'>
                        <CategoryPoPularSkeleton />
                        <CategoryPoPularSkeleton />
                        <CategoryPoPularSkeleton />
                        <CategoryPoPularSkeleton />
                        <CategoryPoPularSkeleton />
                        <CategoryPoPularSkeleton />
                    </div>
                )}
                {!categoriesLoading && (
                    <div className='flex h-[151px] flex-wrap justify-center gap-5 overflow-y-scroll md:justify-start'>
                        {categoryList?.map((item, index: number) => {
                            return <CategoryCard category={item} key={index} />;
                        })}
                    </div>
                )}
            </WrapperList>

            {/* @Top Featured Products */}
            <WrapperList title='Top Featured Products' seeMore={{ path: '/products', name: 'View All Products ' }}>
                {!ProductLatestLoading && LatestList && <TopFeaturedProducts product={LatestList} />}
                {ProductLatestLoading && (
                    <div className='flex justify-between gap-2'>
                        <MediumSkeleton />
                        <MediumSkeleton />
                    </div>
                )}
            </WrapperList>
            {/* @Top reviews product */}
            <WrapperList title='Top Reviews'>
                {TopReviewsLoading && (
                    <>
                        <div className='flex w-full justify-between overflow-hidden'>
                            <SmallSkeleton />
                            <SmallSkeleton />
                            <SmallSkeleton />
                            <SmallSkeleton />
                            <SmallSkeleton />
                        </div>
                    </>
                )}
                {!TopReviewsLoading && (
                    <CarouselDisplay>
                        {TopReviewProductsList?.map((item, i: number) => {
                            return (
                                <CarouselItem key={i}>
                                    <SmallCard product={item} />
                                </CarouselItem>
                            );
                        })}
                    </CarouselDisplay>
                )}
            </WrapperList>
            {/* add popup productlist */}
            {AllProductsList && <PopupProductList product={AllProductsList} propsLoading={LoadingAll} />}
        </div>
    );
};

export default Home;
