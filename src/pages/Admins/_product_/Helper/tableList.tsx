import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Button, Space, TableProps, Tag, Tooltip } from 'antd';
import { ColumnType } from 'antd/es/table';
import { Link } from 'react-router-dom';
import { Params } from '~/types/Api';
import { IProductItemNew } from '~/types/Product';
import { Currency } from '~/utils';

export interface DataType {
    name: string;
    thumbnail: string;
    price: string;
    stock: string;
    sold: string;
    category: string;
    brand: string;
    action: string;
}
interface IFilter {
    text: string;
    value: string;
}

export const ProductsListColumns = ({
    brandFilter,
    categoryFilter,
    query,
    getColumnSearchProps,
}: {
    brandFilter?: IFilter[];
    categoryFilter?: IFilter[];
    query: Params;
    getColumnSearchProps: (dataIndex: string) => ColumnType<any>;
}): TableProps<IProductItemNew>['columns'] => {
    return [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'search',
            width: '34%',
            ...getColumnSearchProps('name'),
            render: (text, record) => (
                <>
                    <div className='flex items-center gap-2'>
                        <div>
                            <img src={record.thumbnail} className='h-10 w-10 object-cover' alt={record.name} />
                        </div>
                        <div>
                            <h4 className='max-w-[300px] truncate'>{text}</h4>
                            <p className='text-[10px]'>ID: {record._id}</p>
                        </div>
                    </div>
                    <div className='ms-7 mt-1 border-s-4 border-graydark border-opacity-10 p-5'>
                        {record.variationIds.map((item, index) => (
                            <div className='my-4 flex items-center gap-2' key={index}>
                                <div>
                                    <img src={item.image} className='h-8 w-8 object-cover' alt={record.name + index} />
                                </div>
                                <div>
                                    <p className='text-[10px]'>
                                        {item.variantAttributes.map((att) => att.value).join(', ')}
                                    </p>
                                </div>
                                <div className='ms-2'>
                                    {item.isActive && (
                                        <Tag className='text-[10px]' color='blue'>
                                            Đã công khai
                                        </Tag>
                                    )}
                                    {!item.isActive && (
                                        <Tag className='text-[10px]' color='gray'>
                                            Đã ẩn
                                        </Tag>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ),
        },
        {
            title: 'Đã bán',
            key: 'sold',
            render: (_, record) => (
                <>
                    <div className='flex flex-col justify-between'>
                        <p className='h-14'>{record.variationIds.reduce((acc, curr) => acc + (curr.sold || 0), 0)}</p>
                    </div>
                    <div className=''>
                        {record.variationIds.map((item, index) => (
                            <p className='my-4 h-8' key={index}>
                                {item.sold}
                            </p>
                        ))}
                    </div>
                </>
            ),
            responsive: ['md'],
        },
        {
            title: 'Giá tiền (VNĐ)',
            key: 'price',
            render: (_, record) => {
                return (
                    <>
                        <div className='flex flex-col justify-between'>
                            <p className='h-14 whitespace-nowrap'>
                                {record.variationIds &&
                                    record.variationIds.length > 1 &&
                                    `${Currency.format(record.variationIds[0].price)} - ${Currency.format(record.variationIds[record.variationIds.length - 1].price)}`}
                                {record.variationIds &&
                                    record.variationIds.length === 1 &&
                                    `${Currency.format(record.variationIds[0].price)}`}
                            </p>
                        </div>
                        <div className=''>
                            {record.variationIds.map((item, index) => (
                                <p className='my-4 h-8' key={index}>
                                    {Currency.format(item.price)}
                                </p>
                            ))}
                        </div>
                    </>
                );
            },
        },
        {
            title: 'Kho hàng',
            key: 'stock',
            render: (_, record) => (
                <>
                    <div className='flex flex-col justify-between'>
                        <p className='h-14 whitespace-nowrap'>
                            {record.variationIds.reduce((acc, curr) => acc + (curr.stock || 0), 0) !== 0 ? (
                                record.variationIds.reduce((acc, curr) => acc + (curr.stock || 0), 0)
                            ) : (
                                <span className='text-red'>Hết hàng</span>
                            )}
                        </p>
                    </div>
                    <div className=''>
                        {record.variationIds.map((item, index) => (
                            <p className='my-4 h-8' key={index}>
                                {item.stock ? item.stock : <span className='text-red'>Hết hàng</span>}
                            </p>
                        ))}
                    </div>
                </>
            ),
        },
        {
            title: 'Danh mục',
            key: 'categoryId',
            filters: categoryFilter,
            filteredValue: query.categoryId ? (query.categoryId as string).split(',') : undefined,
            render: (_, record) => {
                return <h4>{record.categoryId.name}</h4>;
            },
        },
        {
            title: 'Thương hiệu',
            key: 'brandId',
            filteredValue: query.brandId ? (query.brandId as string).split(',') : undefined,
            filters: brandFilter,
            render: (_, record) => {
                return <h4>{record.brandId.name}</h4>;
            },
        },

        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space key={record._id}>
                    <Tooltip title='Update'>
                        <Link
                            to={`/admin/products/${record._id}/edit`}
                            className='text-blue-500 transition-colors duration-500 hover:text-blue-400'
                        >
                            <EditOutlined className='rounded-full bg-blue-100 p-2' style={{ fontSize: '1rem' }} />
                        </Link>
                    </Tooltip>
                </Space>
            ),
        },
    ];
};
