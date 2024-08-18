import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Pagination, Space, Table, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';
import useGetAllBrands from '~/hooks/brands/useGetAllBrands';
import { IBrand } from '~/types/Brand';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import useTable from '~/hooks/_common/useTable';

const BrandList = () => {
    const { onFilter, getColumnSearchProps, query } = useTable();
    const { data: brandsRes } = useGetAllBrands({ search: query.search });
    const brands = brandsRes?.data;

    const onChange: TableProps<IBrand>['onChange'] = (_, filter, sort) => {
        onFilter(filter, sort);
    };
    const columns: TableProps<IBrand>['columns'] = [
        {
            title: 'Tên',
            dataIndex: 'name',
            key: 'search',
            ...getColumnSearchProps('name'),
            render: (text) => <h4>{text}</h4>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    <Tooltip title='Cập nhật thương hiệu'>
                        <Link to={`${ADMIN_ROUTES.BRAND_EDIT}/${record._id}`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <WrapperPageAdmin
            title='Quản lý thương hiệu'
            option={
                <Link to={ADMIN_ROUTES.BRAND_CREATE}>
                    <Button size='large' icon={<PlusOutlined />} type='primary'>
                        Thêm mới thương hiệu
                    </Button>
                </Link>
            }
        >
            <Table onChange={onChange} columns={columns} dataSource={brands} pagination={false} />
            <Space className='m-5 flex w-full justify-end'>
                <Pagination pageSize={brands?.length} total={brands?.length} />
            </Space>
        </WrapperPageAdmin>
    );
};

export default BrandList;
