import SmallCard from '~/components/Product/SmallCard';
import WrapperList from '~/components/WrapperList';

const Wishlist = () => {
    return (
        <WrapperList title='My wishlist'>
            <p className='pb-4 text-center text-[#777777]'>
                Commodo sociosqu venenatis cras dolor sagittis integer luctus maecenas.
            </p>
            <div className=' grid grid-cols-2 gap-3 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5'>
                <SmallCard />
                <SmallCard />
                <SmallCard />
                <SmallCard />
                <SmallCard />
            </div>
        </WrapperList>
    );
};

export default Wishlist;