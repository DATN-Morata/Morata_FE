import { Table } from 'antd';
import { columns } from './_helper';
import useGetMyOrders from '~/hooks/orders/Queries/useGetMyOrders';

const OrderTable: React.FC = () => {
    const { data, isLoading } = useGetMyOrders();
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
                    showSorterTooltip={{ target: 'full-header' }}
                />
            )}
        </>
    );
};

export default OrderTable;
