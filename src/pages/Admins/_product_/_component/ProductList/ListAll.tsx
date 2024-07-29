import { PlusOutlined } from '@ant-design/icons';
import type { FormProps, TableProps } from 'antd';
import { Button, Form, Input, Select, Table } from 'antd';
import { Link } from 'react-router-dom';
import useGetProducts from '~/hooks/products/Queries/useGetProductsForAdmin';
import { IProductItem, IProductParams } from '~/types/Product';
import { ProductsListColumns } from './_helper';
import useFilter from '~/hooks/_common/useFilter';
import useGetCategoriesAndBrands from '~/hooks/useGetCategoriesAndBrands';
import { Params } from '~/types/Api';
import _ from 'lodash';

const ListAll = () => {
    // const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    // const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    // const { mutate, isSuccess, isError } = useDeleteProduct();
    // const productId = useRef<string>('');
    const [form] = Form.useForm<IProductParams>();
    const { query, updateQueryParam } = useFilter();
    const [brands, categories] = useGetCategoriesAndBrands();
    const { data } = useGetProducts(query);

    const brandsSelectData = brands?.data?.data?.map((brand) => ({
        label: brand.name,
        value: brand._id,
    }));
    const categoriesSelectData = categories?.data?.data?.map((category) => ({
        label: category.name,
        value: category._id,
    }));

    const productData = data?.data.products;
    const totalDocs = data?.data.totalDocs;

    const columns = ProductsListColumns();

    const onChange: TableProps<IProductItem>['onChange'] = (paginations) => {
        updateQueryParam({ ...query, page: paginations.current || 1 });
    };

    // @ submit form
    const onSubmit: FormProps['onFinish'] = (values: IProductParams) => {
        const newQuery = _.omitBy(values, _.isUndefined);
        updateQueryParam({ ...newQuery, page: '1' } as Params);
    };

    // const handleOk = () => {
    //     setIsModalOpen(false);
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    //     productId.current = '';
    //     setConfirmLoading(false);
    // };
    // const handleDeleteProduct = () => {
    //     setConfirmLoading(true);
    //     mutate(productId.current);
    // };

    // useEffect(() => {
    //     if (isSuccess) {
    //         setConfirmLoading(false);
    //         /* eslint-disable */
    //         setIsModalOpen(false);
    //         /* eslint-enable */
    //         showMessage('Product has been deleted successfully', 'success');
    //     }
    //     if (isError) {
    //         showMessage('Product has been deleted failure', 'error');
    //     }
    // }, [isSuccess, isError]);

    // useEffect(() => {
    //     refetch();
    // }, [query, refetch]);
    return (
        <>
            <div className='mt-5 flex items-center justify-end'>
                <Link to='/admin/products/create'>
                    <Button size='large' icon={<PlusOutlined />} type='primary' className='mx-2'>
                        Add product
                    </Button>
                </Link>
            </div>
            <div className='bg-gray-50 m-2 rounded-2xl p-4 px-5 transition-all duration-500 '>
                {brands && categories && data && (
                    <Form className='my-3' form={form} onFinish={onSubmit}>
                        <div className='grid grid-cols-2 gap-4 xl:grid-cols-[3fr,3fr,3fr,2fr]'>
                            <Form.Item name='search'>
                                <Input placeholder='Search Product name' defaultValue={query.search || ''} />
                            </Form.Item>
                            <Form.Item name='categoryId'>
                                <Select
                                    placeholder='Search by Category'
                                    options={categoriesSelectData}
                                    defaultValue={query.categoryId}
                                ></Select>
                            </Form.Item>
                            <Form.Item name='brandId'>
                                <Select
                                    placeholder='Search by Brand'
                                    options={brandsSelectData}
                                    defaultValue={query.brandId}
                                ></Select>
                            </Form.Item>
                            <div className='grid grid-cols-2 gap-4'>
                                <Button htmlType='submit' type='primary'>
                                    Apply
                                </Button>
                                <Button
                                    htmlType='reset'
                                    type='default'
                                    onClick={() => updateQueryParam({ search: '' })}
                                >
                                    Reset
                                </Button>
                            </div>
                        </div>
                    </Form>
                )}
                <Table
                    size='large'
                    rowKey={(record) => record._id}
                    columns={columns}
                    onChange={onChange}
                    dataSource={productData}
                    pagination={{
                        pageSize: 10,
                        total: totalDocs,
                        current: +query.page,
                    }}
                />
            </div>
            {/* <ModalDelete
                isModalOpen={isModalOpen}
                handleOk={handleOk}
                handleCancel={handleCancel}
                confirmLoading={confirmLoading}
                handleDeleteProduct={handleDeleteProduct}
            /> */}
        </>
    );
};

export default ListAll;
