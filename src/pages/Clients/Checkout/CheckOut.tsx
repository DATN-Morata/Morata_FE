import { Button, Checkbox, ConfigProvider, Form, Input, Radio, Select, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import PolicyModal from '~/components/PolicyPopup/Policy';
import MiniProduct from '~/components/ProductCard/MiniProduct';
import { PaymentMethod } from '~/constants/enum';
import useGetMyCart from '~/hooks/cart/Queries/useGetMyCart';
import { useMutationCheckOutSession } from '~/hooks/checkout/useCreateOrderSession';
import useGetProfile from '~/hooks/profile/Queries/useGetProfile';
import { setOrder } from '~/store/slice/orderSlice';
import { ICheckoutForm } from '~/types/checkout/Checkout';
import { Currency } from '~/utils';

const CheckOut = () => {
    const [form] = useForm();
    const { mutate: stripeCheckout, isPending } = useMutationCheckOutSession();

    const { data } = useGetProfile();
    const { data: orderItem, responsePayloadCheckout } = useGetMyCart(data?.data?._id);

    const [isAgreed, setIsAgreed] = useState<boolean>(false);

    const totalPrice = orderItem
        ? orderItem?.data?.items?.reduce(
              (total: number, product) => total + product.productVariation.price * product.quantity,
              0
          )
        : 0;
    const totalQuantity = orderItem
        ? orderItem.data.items.reduce((total: number, product) => total + product.quantity, 0)
        : 0;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleOnsubmit = (value: ICheckoutForm) => {
        const bodyData = {
            userId: data?.data?._id,
            customerInfo: {
                name: data?.data?.username,
                email: data?.data?.email,
                phone: data?.data?.phone,
            },
            receiverInfo: {
                name: value.name,
                email: value.email,
                phone: value.phone,
            },
            shippingAddress: {
                city: value.city,
                country: value.country,
                line1: value.line1,
                line2: value.line2,
                postal_code: value.postal_code,
                state: value.state,
            },
            items: responsePayloadCheckout,
            totalPrice: value.paymentMethods === 1 ? totalPrice : totalPrice * 24560,
            paymentMethod: value.paymentMethods === 1 ? PaymentMethod.cash : PaymentMethod.card,
            PaymentMethods: value.paymentMethods,
        };

        dispatch(setOrder({ Detail: bodyData }));
        if (responsePayloadCheckout?.length) {
            navigate('/checkout-details');
        }
    };
    const handlePayStripe = () => {
        stripeCheckout({
            items: responsePayloadCheckout,
        });
    };
    useEffect(() => {
        if (!orderItem?.data.items.length) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderItem]);
    return (
        <>
            {/* BACK TO HOME BTN */}
            <div className='mx-auto mt-[5px] max-w-[1280px]'>
                <Link to={'/'} className='font-bold duration-300 hover:text-cyan-500'>
                    &lt; Back To Home
                </Link>
            </div>

            <div className='mx-auto mt-[25px] flex max-w-[1280px] flex-col-reverse gap-10 md:flex-row'>
                <div className='w-full rounded-lg border-[1px] border-[#7777] p-5'>
                    <h3 className='text-center text-[#777777]'>Express checkout</h3>
                    <div className='my-2'>
                        <button
                            onClick={handlePayStripe}
                            className='flex h-[45px] w-full items-center justify-center gap-2 rounded-md bg-blue-700 text-white'
                        >
                            {!isPending && (
                                <>
                                    <img
                                        src='https://asset.brandfetch.io/idxAg10C0L/idTHPdqoDR.jpeg'
                                        width={40}
                                        height={40}
                                        className='rounded-full'
                                        alt=''
                                    />
                                    <span className='font-medium'>Stripe Pay</span>
                                </>
                            )}
                            {isPending && <Spin />}
                        </button>
                    </div>
                    {totalPrice < 1000 ? (
                        <>
                            <h3 className='text-center text-[#777777]'>Or</h3>
                            <hr />
                        </>
                    ) : (
                        <>
                            <h3 className='text-red-500 text-center'>
                                Your order has exceeded the checkout limit of $1000, please proceed to online checkout!
                            </h3>
                        </>
                    )}
                    {data && !(totalPrice >= 1000) && (
                        <Form
                            name='checkout'
                            form={form}
                            onFinish={handleOnsubmit}
                            layout='vertical'
                            style={{ maxWidth: 600 }}
                        >
                            <h3 className='text-[21px] font-semibold'>Contact</h3>
                            <div className='mt-[15px]'>
                                <Form.Item
                                    label='Your Name'
                                    name='name'
                                    initialValue={data.data.username}
                                    rules={[{ required: true, message: 'Enter your name' }]}
                                >
                                    <Input placeholder='Your Name' className='mt-[5px] h-[48px]' />
                                </Form.Item>
                            </div>
                            <div className='mt-[15px]'>
                                <Form.Item
                                    label='Your email'
                                    name='email'
                                    initialValue={data.data.email}
                                    rules={[{ required: true, message: 'Enter your email' }]}
                                >
                                    <Input placeholder='Your Email' className='mt-[5px] h-[48px]' />
                                </Form.Item>
                            </div>
                            <div className='mt-[15px]'>
                                <Form.Item
                                    label='Phone Number'
                                    name='phone'
                                    initialValue={data.data.phone}
                                    rules={[{ required: true, message: 'Enter your phone number' }]}
                                >
                                    <Input placeholder='phone number' className='mt-[5px] h-[48px]' />
                                </Form.Item>
                            </div>
                            <hr />
                            <h3 className='mt-4 text-[21px] font-semibold'>Delivery</h3>
                            <div className=''>
                                <Form.Item
                                    name='country'
                                    label='Country'
                                    rules={[{ required: true, message: 'Please select gender!' }]}
                                >
                                    <Select placeholder='select your country' className='h-[48px]'>
                                        <Select.Option value='Việt Nam'>Viet Nam</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className=''>
                                <Form.Item
                                    label='City'
                                    name='city'
                                    rules={[{ required: true, message: 'Enter an email or phone number' }]}
                                >
                                    <Select placeholder='select your city' className='h-[48px]'>
                                        <Select.Option value='Hà Nội'>Ha Noi</Select.Option>
                                        <Select.Option value='Hồ Chí Minh'>Ho Chi Minh</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div className=''>
                                <Form.Item
                                    label='District'
                                    name='state'
                                    rules={[{ required: true, message: 'Enter District' }]}
                                >
                                    <Input placeholder='District' className='mt-[5px] h-[48px]' />
                                </Form.Item>
                            </div>
                            <div className=''>
                                <Form.Item
                                    label='Street Address'
                                    name='line1'
                                    rules={[{ required: true, message: 'Enter Street Address' }]}
                                >
                                    <Input placeholder='Street Address' className='mt-[5px] h-[48px]' />
                                </Form.Item>
                            </div>
                            <div className=''>
                                <Form.Item
                                    label='Apartment / suite/ etc'
                                    name='line2'
                                    rules={[{ required: true, message: 'Enter Apartment, suite, etc.r' }]}
                                >
                                    <Input placeholder='Apartment, suite, etc' className='mt-[5px] h-[48px]' />
                                </Form.Item>
                            </div>
                            <div className=''>
                                <Form.Item
                                    label='Zip Code'
                                    name='postal_code'
                                    rules={[{ required: true, message: 'Enter Zip Code' }]}
                                >
                                    <Input placeholder='0000000' className='mt-[5px] h-[48px]' />
                                </Form.Item>
                            </div>
                            <div className=''>
                                <Form.Item
                                    name={'paymentMethods'}
                                    rules={[
                                        { required: !(totalPrice >= 1000), message: 'Please select a payment method.' },
                                    ]}
                                    className='mb-0'
                                >
                                    <Radio.Group optionType='default' buttonStyle='solid'>
                                        <div className='space-y-4'>
                                            <Radio
                                                disabled={totalPrice >= 1000}
                                                value={1}
                                                className=' flex items-center'
                                            >
                                                Cash on Delivery (COD)
                                            </Radio>
                                            {/* <Radio value={2} className=' flex items-center'>
                                                VNPAY
                                            </Radio> */}
                                        </div>
                                    </Radio.Group>
                                </Form.Item>
                            </div>
                            <Form.Item
                                name='isAgreed'
                                rules={[{ required: !isAgreed, message: 'You must agree to continue the order!' }]}
                            >
                                <Checkbox
                                    checked={isAgreed}
                                    onChange={(e) => {
                                        const newIsAgreed = e.target.checked;
                                        setIsAgreed(newIsAgreed);
                                    }}
                                >
                                    I agree to Morata&apos;s{' '}
                                    <PolicyModal
                                        onClose={() => {
                                            setIsAgreed(false);
                                        }}
                                    />
                                </Checkbox>
                            </Form.Item>
                            <div className='mt-[35px]'>
                                <ConfigProvider
                                    theme={{
                                        components: {
                                            Button: {
                                                defaultBg: '#3c535e',
                                                defaultHoverBg: '#2a3b44',
                                                defaultHoverBorderColor: 'none',
                                            },
                                        },
                                    }}
                                >
                                    <Button
                                        htmlType='submit'
                                        className='h-[58px] w-full text-[16px] font-semibold text-white disabled:bg-[#3c535e] disabled:bg-opacity-70'
                                    >
                                        Order Now
                                    </Button>
                                </ConfigProvider>
                            </div>
                        </Form>
                    )}
                </div>

                <div className=' w-full'>
                    <div className='-order-1 flex flex-col gap-[15px] px-5 '>
                        {orderItem?.data.items.map((item, index) => (
                            <MiniProduct
                                quantity={item.quantity}
                                productVariation={item.productVariation}
                                key={index}
                            />
                        ))}

                        {!orderItem?.data.items.length && (
                            <div>
                                <h3 className='text-center font-medium'>Not found product in your cart</h3>
                            </div>
                        )}

                        <div className='mt-[44px]'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-[14px]'>Total quantity</h3>

                                <span>{totalQuantity} Product</span>
                            </div>

                            <div className='mt-[12px] flex justify-between '>
                                <h3 className='text-[19px] font-medium'>Total</h3>

                                <span className='text-[19px] font-medium'>
                                    <span className='text-[12px] text-[#777777]'>CAD</span>{' '}
                                    {Currency.format(totalPrice)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckOut;
