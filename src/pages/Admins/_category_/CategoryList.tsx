import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Space, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '~/constants/router';
import useGetCategories from '~/hooks/categories/Queries/useGetCategories';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import useTable from '~/hooks/_common/useTable';
import { ICategory } from '~/types/Category';
import TableAdmin from '../_common/TableAdmin';

const CategoryList = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable();
    const { data: categories } = useGetCategories(query);
    const categoryList = categories?.data.categories;
    const totalDocs = categories?.data.totalDocs;
    const currentPage = Number(query.page || 1);

    const columns: TableProps<ICategory>['columns'] = [
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'search',
            render: (text) => <h4>{text}</h4>,
            ...getColumnSearchProps('name'),
            width: '20%',
        },
        {
            title: 'Thuộc tính',
            dataIndex: 'attributeNames',
            key: 'attributeNames',
            width: '70%',
            render: (_, record) => (
                <>
                    {record.attributeIds?.map((att) => {
                        return (
                            <Tag color={'geekblue'} className='my-2' key={att._id}>
                                {att.name.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    <Tooltip title='Cập nhật danh mục'>
                        <Link to={`${ADMIN_ROUTES.CATEGORIES_EDIT}/${record._id}`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <WrapperPageAdmin
            title='Quản lý danh mục'
            option={
                <Link to={ADMIN_ROUTES.CATEGORIES_CREATE}>
                    <Button icon={<PlusOutlined />} type='primary'>
                        Thêm mới danh mục
                    </Button>
                </Link>
            }
        >
            <TableAdmin<ICategory>
                onFilter={onFilter}
                columns={columns}
                currentPage={currentPage}
                dataSource={categoryList}
                onSelectPaginateChange={onSelectPaginateChange}
                totalDocs={totalDocs}
            />
        </WrapperPageAdmin>
    );
};

export default CategoryList;
