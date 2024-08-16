import { PlusSquareOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, FormProps, Input, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { useGetAllAttributesScroll } from '~/hooks/attributes/Queries/useGetAllAttributesScroll';
import { useMutationCreateCategory } from '~/hooks/categories/Mutations/useCreateCategory';
import { IAttributesValue } from '~/types/Attributes';
import { ICategoryFormData, IValueCheckbox } from '~/types/Category';
import Annotaion from './_components/Annotaion';
import LableCheckbox from './_components/LableCheckbox';

const CreateCategory = () => {
    const [form] = Form.useForm<ICategoryFormData>();
    const { mutate: createCategory, isPending } = useMutationCreateCategory();

    const { Observer, data } = useGetAllAttributesScroll();
    const attributes = data?.pages.map((page) => page.data.attributes).flat();

    const [attributeOptions, setAttributeOptions] = useState<IValueCheckbox[]>([]);
    const [attributeChecked, setAttributeChecked] = useState<IValueCheckbox[]>([]);

    const handleCheckboxChange = (checkedValues: string[]) => {
        const attributeTag = attributeOptions.filter((attr) => checkedValues.includes(attr.value));
        setAttributeChecked(attributeTag);
    };
    // const handleCloseTag = (value: string) => {
    //     // setSelectedAttributes(checkedValues);
    //     console.log(value);
    //     const attributeValues = attributeChecked.filter((attr) => attr.value !== value);
    //     setAttributeChecked(attributeValues);
    // };

    const onFinish: FormProps<ICategoryFormData>['onFinish'] = (values) => {
        createCategory(values);
    };

    const onFinishFailed: FormProps<ICategoryFormData>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (attributes) {
            const options = attributes.map((attr: IAttributesValue) => ({
                name: attr.name,
                label: (
                    <LableCheckbox
                        optionsValue={attr.values}
                        title={attr.name}
                        isRequired={attr.isRequired}
                        isVariant={attr.isVariant}
                    />
                ),
                value: attr._id,
                values: attr.values.map(String),
            }));
            setAttributeOptions(options);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <>
            <div className='mx-6 rounded-lg bg-white px-4 py-6'>
                <div className='col-span-9 m-auto'>
                    <Form
                        form={form}
                        layout='vertical'
                        className='grid grid-cols-12 '
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        <div className='col-span-8'>
                            <div className='w-full rounded-lg p-2 px-4'>
                                <h3 className='my-2 text-xl font-medium text-primary'>Create a new category</h3>

                                <Form.Item<ICategoryFormData>
                                    label='Name'
                                    name='name'
                                    className='font-medium text-[#08090F]'
                                    rules={[{ required: true, message: 'Please enter category name!' }]}
                                >
                                    <Input placeholder='Nhập tên cho danh mục...' />
                                </Form.Item>
                                {!data && <Skeleton active />}
                                {data && (
                                    <>
                                        <Form.Item<ICategoryFormData>
                                            label='Attributes'
                                            name='attributeIds'
                                            className='font-medium text-[#08090F]'
                                            rules={[{ required: true, message: 'Please choose at least 1 attribute!' }]}
                                        >
                                            <Checkbox.Group
                                                value={attributeChecked.map((attr) => attr.value)}
                                                onChange={handleCheckboxChange}
                                                options={attributeOptions}
                                                className='grid grid-cols-3 gap-2'
                                            />
                                        </Form.Item>
                                        <Observer />
                                    </>
                                )}
                            </div>
                        </div>
                        <div className='col-span-4 flex flex-col justify-between border-s border-black border-opacity-20 px-4'>
                            <Annotaion attributeChecked={attributeChecked} />
                            <div className='sticky bottom-0 right-0 my-2 flex justify-end border-t-2 border-black border-opacity-5 bg-white p-4'>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    icon={<PlusSquareOutlined />}
                                    loading={isPending}
                                    disabled={isPending}
                                    size='large'
                                >
                                    Thêm mới
                                </Button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default CreateCategory;
