import { DescriptionsProps, Space } from 'antd';
import { Currency } from '~/utils';

interface Props {
    services: {
        paymentMethod: string;
        shippingFee: number;
        tax: number;
        totalPrice: number;
        isPaid: boolean;
    };
    totalQuantity: number;
}
export default function ServicesDetail({ services, totalQuantity }: Props) {
    const items: DescriptionsProps['items'] = [
        {
            key: 'Payment Method',
            label: <span className='font-semibold capitalize'>Phương Thức Thanh Toán</span>,
            children: <p className='capitalize'>{services.paymentMethod}</p>,
        },
        {
            key: 'Shipping Fee',
            label: <span className='font-semibold capitalize'>Phí Giao Hàng</span>,
            children: <p>{Currency.format(Number(services.shippingFee))}</p>,
        },
        {
            key: 'Tax',
            label: <span className='font-semibold capitalize'>Thuế</span>,
            children: <p>{`${Number(services.tax) * 100}% VAT `}</p>,
        },
        {
            key: 'Total Price',
            label: <span className='font-semibold capitalize'>Tổng Tiền</span>,
            children: <p>{Currency.format(services.totalPrice)}</p>,
        },
        {
            key: 'Payment Status',
            label: <span className='font-semibold capitalize'>Thanh Toán</span>,
            children: (
                <p>
                    {services.isPaid ? (
                        <span className='text-green-500'>Đã Thanh Toán</span>
                    ) : (
                        <span className='text-red'>Chưa Thanh Toán</span>
                    )}
                </p>
            ),
        },
        {
            key: 'Payment Status',
            label: <span className='font-semibold capitalize'>Tổng sản phẩm</span>,
            children: <p>{totalQuantity}</p>,
        },
    ];

    return (
        <Space className='mt-5 w-full  rounded-lg bg-[#fff] p-4 ' direction='vertical'>
            <h3 className='text-lg font-medium text-black'>Thông tin đơn hàng</h3>
            <div className='grid grid-cols-3 gap-y-2'>
                {items.map((item, index) => (
                    <div key={index} className='flex gap-2'>
                        {item.label}
                        {item.children}
                    </div>
                ))}
            </div>
        </Space>
    );
}