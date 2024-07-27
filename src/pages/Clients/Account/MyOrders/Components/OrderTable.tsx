import { Table, TableProps } from 'antd';
import { columns, DataType } from './_helper';
import useGetMyOrders from '~/hooks/orders/Queries/useGetMyOrders';

const OrderTable: React.FC = () => {
    const { data, isLoading } = useGetMyOrders();
    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    console.log('my orders:', data?.data.data.orders);
    return (
        <>
            {!isLoading && data && (
                <Table
                    rowKey={(record) => record._id}
                    columns={columns}
                    dataSource={data.data.data.orders}
                    pagination={{
                        pageSize: 8,
                    }}
                    onChange={onChange}
                    showSorterTooltip={{ target: 'full-header' }}
                />
            )}
        </>
    );
};

export default OrderTable;
