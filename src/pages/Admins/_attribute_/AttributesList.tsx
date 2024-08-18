import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Pagination, Space, Table, Tag, Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { AttributeType } from '~/constants/enum';
import { ADMIN_ROUTES } from '~/constants/router';
import useGetAllAtributes from '~/hooks/attributes/Queries/useGetAllAttributes';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import { IAttributesValue } from '~/types/Attributes';
import useTable from '~/hooks/_common/useTable';

const CategoryList = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable();
    const { data: attributeRes } = useGetAllAtributes(query);
    const attributesList = attributeRes?.data.attributes;
    const totalDocs = attributeRes?.data.totalDocs;

    // @event
    const onChange: TableProps<IAttributesValue>['onChange'] = (_, filter, sort) => {
        onFilter(filter, sort);
    };

    const columns: TableProps<IAttributesValue>['columns'] = [
        {
            title: 'Tên thuộc tính',
            dataIndex: 'name',
            key: 'search',
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Ràng buộc',
            render: (_, record) => (
                <>
                    {record.isVariant && <Tag color={'geekblue'}>Biến thể & Bắt buộc</Tag>}{' '}
                    {record.isRequired && !record.isVariant && <Tag color={'red'}>Bắt buộc</Tag>}
                    {!record.isRequired && !record.isVariant && <Tag color={'#7a7d86'}>Không bắt buộc</Tag>}
                </>
            ),
        },
        {
            title: 'Giá trị',
            dataIndex: 'type',
            key: 'value',
            render: (_, record) => (
                <>
                    {record.type === AttributeType.Options &&
                        record?.values?.map((att, i) => {
                            return (
                                <Tag color={'geekblue'} key={i}>
                                    {att}
                                </Tag>
                            );
                        })}
                    {record.type === AttributeType.Manual && <Tag color={'green'}>Nhập thủ công</Tag>}
                </>
            ),
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size={'middle'}>
                    <Tooltip title='Cập nhật thuộc tính'>
                        <Link to={`${ADMIN_ROUTES.ATTRIBUTES_EDIT}/${record._id}`} className='text-blue-500'>
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <WrapperPageAdmin
            title='Quản lý thuộc tính'
            option={
                <Link to={ADMIN_ROUTES.ATTRIBUTES_CREATE}>
                    <Button size='large' icon={<PlusOutlined />} type='primary'>
                        Thêm mới thuộc tính
                    </Button>
                </Link>
            }
        >
            <Table onChange={onChange} columns={columns} dataSource={attributesList} pagination={false} />
            <Space className='m-5 flex w-full justify-end'>
                <Pagination
                    onChange={onSelectPaginateChange}
                    pageSize={10}
                    total={totalDocs}
                    current={Number(query.page || 1)}
                />
            </Space>
        </WrapperPageAdmin>
    );
};

export default CategoryList;
