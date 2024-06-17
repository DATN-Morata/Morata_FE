import { EyeOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';

import { Button, Space, Table, TableColumnsType, TableProps, Tag, Tooltip } from 'antd';
import Search from 'antd/es/input/Search';

import useGetAllOrders from '~/hooks/Queries/useGetAllOrders';
import useGetAllOrdersStatus from '~/hooks/Queries/useGetAllOrdersStatus';
import { IAllOrder } from '~/types/Order';

const ManageOrders = () => {
    const { data } = useGetAllOrders();
    console.log('🚀 ~ ManageOrders ~ data:', data);

    const orders = data?.data?.data;

    const columns: TableProps<IAllOrder>['columns'] = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: '_id',
            render: (text) => <h4>{text}</h4>,
        },
        {
            title: 'TotalPrice',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            sorter: (a, b) => a.totalPrice - b.totalPrice,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'PaymentMethod',
            dataIndex: 'paymentMethod',
            key: 'paymentMethod',
            filters: [
                { text: 'Card', value: 'card' },
                { text: 'Cash', value: 'Cash' },
            ],
            onFilter: (value, record) => record.paymentMethod.indexOf(value.toString()) === 0,
        },
        {
            title: 'OrderStatus',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            filters: [
                { text: 'Pending', value: 'pending' },
                { text: 'Cancelled', value: 'cancelled' },
                { text: 'Confirmed', value: 'confirmed' },
                { text: 'Shipping', value: 'shipping' },
                { text: 'Delivered', value: 'delivered' },
                { text: 'Done', value: 'done' },
            ],
            onFilter: (value, record) => record.orderStatus.indexOf(value.toString()) === 0,
        },
        {
            title: 'IsPaid',
            dataIndex: 'isPaid',
            key: 'isPaid',
            render: (isPaid) => (
                <Tag color={isPaid ? 'green' : 'red'} key={isPaid}>
                    {isPaid ? 'Paid' : 'Not paid'}
                </Tag>
            ),
            filters: [
                { text: 'Paid', value: true },
                { text: 'Not paid', value: false },
            ],
            onFilter: (value, record) => record.isPaid === value,
        },
        {
            title: 'CreatedAt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
            sortDirections: ['descend', 'ascend'],
            render: (createdAt) => {
                const date = new Date(createdAt);
                const formattedDate = date.toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                });
                return <span>{formattedDate}</span>;
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size='middle'>
                    <Tooltip title='Get detail'>
                        <Button
                            type='link'
                            href={`/admin/order/${record._id}/detail`}
                            icon={
                                <EyeOutlined
                                    className='cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100'
                                    style={{ fontSize: '1.2rem' }}
                                />
                            }
                        ></Button>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className='mx-6 mt-[100px]'>
            <div className='my-6 ml-2 flex items-center justify-between py-2 '>
                <h1 className='text-3xl font-semibold dark:text-white dark:opacity-80'>Manage Orders</h1>
            </div>
            <div className='transi m-2 rounded-2xl bg-gray-50 p-4 px-5 transition-all duration-500 '>
                <h2 className='mb-5 ml-2 text-xl font-medium text-[#344767] dark:text-white dark:opacity-80'>
                    Inventory items
                </h2>
                <div className='my-2 flex justify-between'>
                    <Search placeholder='Search name...' size='large' className='w-[18.75rem]' />
                    <Button type='primary' icon={<VerticalAlignBottomOutlined />} className='px-3' size='middle'>
                        Export
                    </Button>
                </div>
                {orders && (
                    <Table
                        columns={columns}
                        dataSource={orders}
                        pagination={{
                            pageSize: 4,
                        }}
                        rowKey={(record) => record._id}
                    />
                )}
            </div>
        </div>
    );
};

export default ManageOrders;
