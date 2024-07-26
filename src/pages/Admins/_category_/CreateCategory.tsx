import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, FormProps, Input, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMessage from '~/hooks/_common/useMessage';
import { useGetAllAtributesNew } from '~/hooks/attributes/Queries/useGetAllAttributes';
import { useMutationCreateCategory } from '~/hooks/categories/Mutations/useCreateCategory';
import { ICategoryFormData } from '~/types/Category';

const CreateCategory = () => {
    const navigate = useNavigate();
    const { mutate: createCategory, isPending } = useMutationCreateCategory();

    const { data } = useGetAllAtributesNew();
    const attributes = data?.data;
    console.log(attributes);

    const [attributeOptions, setAttributeOptions] = useState<{ label: string; value: string; values: string[] }[]>([]);

    useEffect(() => {
        if (attributes) {
            const options = attributes.map((attr: { _id: string; name: string; values: string[] }) => ({
                label: attr.name,
                value: attr._id,
                values: attr.values,
            }));
            setAttributeOptions(options);
        }
    }, [attributes]);

    const { handleMessage, contextHolder } = useMessage();

    const attributeValues = (attr: { label: string; value: string; values: string[] }) => {
        if (attr.values.length === 0) {
            return <div>No values</div>;
        }
        return attr.values.map((value, i) => {
            return <div key={i}>{value}</div>;
        });
    };

    const onFinish: FormProps<ICategoryFormData>['onFinish'] = (values) => {
        console.log('Success:', values);

        createCategory(values);
        navigate('/admin/categories', { replace: true });

        if (isPending) {
            handleMessage({ type: 'loading', content: '...Creating!' });
        }
    };

    const onFinishFailed: FormProps<ICategoryFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {contextHolder}
            <div className='mx-6 rounded-lg bg-white px-4 py-6'>
                <div className='m-auto'>
                    <Form layout='vertical' onFinish={onFinish} onFinishFailed={onFinishFailed}>
                        <div className='mx-auto w-[70%] rounded-lg border border-opacity-90 p-2 px-4'>
                            <h3 className='my-2 text-xl font-medium text-primary'>Create a new category</h3>

                            <Form.Item<ICategoryFormData>
                                label='Name'
                                name='name'
                                className='font-medium text-[#08090F]'
                                rules={[{ required: true, message: 'Please enter category name!' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item<ICategoryFormData>
                                label='Attributes'
                                name='attributeIds'
                                className='font-medium text-[#08090F]'
                                rules={[{ required: true, message: 'Please choose at least 1 attribute!' }]}
                            >
                                {/* <Checkbox.Group options={attributeOptions} className='grid grid-cols-3 gap-2' /> */}
                                <div className='grid grid-cols-3 gap-2'>
                                    {attributeOptions.map((option) => (
                                        <Checkbox key={option.value} value={option.value}>
                                            <Popover content={attributeValues(option)} title={option.label}>
                                                {option.label}
                                            </Popover>
                                        </Checkbox>
                                    ))}
                                </div>
                            </Form.Item>

                            <Form.Item className='flex justify-end'>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    icon={<PlusSquareOutlined />}
                                    className='mr-3 px-5'
                                    size='large'
                                >
                                    Add Category
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default CreateCategory;
