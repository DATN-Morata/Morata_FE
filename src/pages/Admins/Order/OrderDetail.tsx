import { Steps, Table, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useGetTheDetailedOrder from '~/hooks/Queries/useGetTheDetailedOrder';

const OrderDetail = () => {
    const { id } = useParams();

    const { data } = useGetTheDetailedOrder(id as string);

    const orderStatus = data?.data.data.orderStatus;
    const dataOrderDetail = data?.data?.data.items;
    const totalPrice = data?.data?.data?.totalPrice;
    const shippingFee = data?.data?.data.shippingFee;
    const [currentStep, setCurrentStep] = useState(0);
    useEffect(() => {
        if (orderStatus) {
            const getStepIndex = (status: string) => {
                switch (status) {
                    case 'pending':
                        return 0;
                    case 'confirmed':
                        return 1;
                    case 'shipping':
                        return 2;
                    case 'delivered':
                        return 3;
                    case 'cancelled':
                        return 4;
                    case 'done':
                        return 5;
                    default:
                        return 0;
                }
            };
            setCurrentStep(getStepIndex(orderStatus));
        }
    }, [orderStatus]);

    const steps = [
        { title: 'Pending' },
        { title: 'Confirmed' },
        { title: 'Shipping' },
        { title: 'Delivered' },
        { title: 'Done' },
        { title: 'Cancelled' },
    ];
    const filteredSteps = steps.filter((step) => {
        if (orderStatus === 'done') return step.title !== 'Cancelled';
        if ((orderStatus as string) === 'cancelled') return step.title !== 'Done';
        return true;
    });
    const columns: TableProps['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (img) => <img src={img} alt='' width={100} />,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span>${price}</span>,
        },
    ];

    return (
        <div className='mt-6 w-full px-6'>
            <div className='page-content h-full rounded-lg bg-white'>
                <div className='border-default-200 rounded-lg'>
                    <div className='border-default-200 flex flex-wrap items-center gap-3 border-b p-6'>
                        <h4 className='text-default-900 text-xl font-medium'>Order #202347</h4>
                        <div className='flex flex-wrap items-center gap-3'>
                            <i data-lucide='dot' />
                            <h4 className='text-default-600 text-sm'>{dataOrderDetail?.length} Products</h4>
                        </div>
                        <Link to={`/admin/order/list`} className='text-primary ms-auto text-base font-medium'>
                            Back to List
                        </Link>
                    </div>
                    <div className='p-6'>
                        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3'>
                            <div className='border-default-200 rounded-lg border'>
                                <div className='border-default-200 border-b p-4'>
                                    <h4 className='text-default-800 text-sm font-medium'>Billing Address</h4>
                                </div>
                                <div className='p-4'>
                                    <h4 className='text-default-800 mb-1 text-base font-medium'>
                                        {data?.data?.data?.customerInfo.name}
                                    </h4>
                                    <p className='text-default-600 mb-4 text-sm'>
                                        {data && Object.values(data.data.data.shippingAddress).join(', ')}
                                    </p>
                                    <h4 className='text-default-800 mb-1 text-base font-medium'>Email</h4>
                                    <p className='text-default-600 mb-4 text-sm'>
                                        {data?.data?.data?.customerInfo.email}
                                    </p>
                                    <h4 className='text-default-800 mb-1 text-base font-medium'>Phone</h4>
                                    <p className='text-default-600 mb-4 text-sm'>
                                        {data?.data?.data?.customerInfo.phone}
                                    </p>
                                </div>
                            </div>
                            <div className='border-default-200 rounded-lg border'>
                                <div className='border-default-200 border-b p-4'>
                                    <h4 className='text-default-800 text-sm font-medium'>Shipping Address</h4>
                                </div>
                                <div className='p-4'>
                                    <h4 className='text-default-800 mb-1 text-base font-medium'>
                                        {data?.data?.data?.receiverInfo.name}
                                    </h4>
                                    <p className='text-default-600 mb-4 text-sm'>
                                        {data && Object.values(data.data.data.shippingAddress).join(', ')}
                                    </p>
                                    <h4 className='text-default-800 mb-1 text-base font-medium'>Email</h4>
                                    <p className='text-default-600 mb-4 text-sm'>
                                        {data?.data?.data?.receiverInfo.email}
                                    </p>
                                    <h4 className='text-default-800 mb-1 text-base font-medium'>Phone</h4>
                                    <p className='text-default-600 mb-4 text-sm'>
                                        {data?.data?.data?.receiverInfo.phone}
                                    </p>
                                </div>
                            </div>

                            <div className='border-default-200 rounded-lg border'>
                                <div className='border-default-200 border-b p-4'>
                                    <h4 className='text-default-800 text-sm font-medium'>Total Payment :</h4>
                                </div>
                                <div className='px-4'>
                                    <div className='border-default-200 flex justify-between border-b py-4'>
                                        <h4 className='text-default-700 text-sm'>Subtotal :</h4>
                                        <h4 className='text-default-800 text-sm font-medium'>${totalPrice}</h4>
                                    </div>
                                    <div className='border-default-200 flex justify-between border-b py-4'>
                                        <h4 className='text-default-700 text-sm'>Shipping :</h4>
                                        <h4 className='text-default-800 text-sm font-medium'>
                                            {shippingFee === 0 && 'Free'}
                                        </h4>
                                    </div>
                                    <div className='flex justify-between py-4'>
                                        <h4 className='text-default-700 text-lg'>Total :</h4>
                                        <h4 className='text-default-800 text-lg font-medium'>
                                            $
                                            {totalPrice !== undefined && shippingFee !== undefined
                                                ? totalPrice + shippingFee
                                                : ''}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <div className='md:col-span-2 xl:col-span-3'>
                                <Steps
                                    className='my-10'
                                    current={currentStep}
                                    items={filteredSteps.map((step, index) => ({
                                        title: step.title,
                                        description: '',
                                    }))}
                                />
                                <Table columns={columns} dataSource={dataOrderDetail} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
