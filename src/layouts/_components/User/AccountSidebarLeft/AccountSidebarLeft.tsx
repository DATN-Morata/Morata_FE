import StaticImages from '~/assets';
import MenuAccount from './MenuAccount';
import useGetProfile from '~/hooks/profile/Queries/useGetProfile';

const AccountSidebarLeft = () => {
    const { data } = useGetProfile();
    const profile = data?.data;

    return (
        <>
            <div className='hidden flex-col bg-white md:flex'>
                <div className=''>
                    <h1 className='pt-5 text-center text-2xl font-semibold uppercase text-[#16bcdc]'>Account</h1>
                </div>

                <div className='my-5 flex flex-col items-center justify-center gap-5'>
                    <div className='w-[30%]'>
                        {profile && profile.avatar && (
                            <img src={profile.avatar} loading='lazy' alt='user' className='w-full rounded-full ' />
                        )}
                        {profile && !profile.avatar && (
                            <img
                                src={StaticImages.userImageDf}
                                loading='lazy'
                                alt='user'
                                className='w-full rounded-full '
                            />
                        )}
                    </div>

                    <div>
                        <p className='text-[16px] capitalize'>{profile?.username}</p>
                        <p className='text-[14px] font-thin'>{profile?.phone}</p>
                    </div>
                </div>
                <MenuAccount />
            </div>
        </>
    );
};

export default AccountSidebarLeft;
