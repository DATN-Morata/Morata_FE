import { MinusCircleOutlined } from '@ant-design/icons';
import { Checkbox, Form, Input, InputNumber, Select, Space, Upload, UploadFile, UploadProps } from 'antd';
import { IAttributesValue } from '~/types/Attributes';
import {
    variationsPriceValidator,
    variationsStockValidator,
    variationsThumbnailValidator,
} from '~/validation/Products/validators';
import CustomItemRenderVariant from './CustomItemRenderVariant';
import UploadButtonVariant from './UploadButtonVariant';

type IVariationsItem = {
    fieldName: number;
    index: number;
    restField: {
        fieldKey?: number;
    };
    attributesForVariant: IAttributesValue[] | undefined;
    variantFile: UploadFile[][];
    id?: string;
    handleChangeThumbnail: (index: number) => UploadProps['onChange'];
    handleRemoveThumbnail: (index: number) => void;
    removeVariation: (name: number) => void;
};

const VariationItem = ({
    fieldName,
    index,
    restField,
    variantFile,
    attributesForVariant,
    id,
    handleChangeThumbnail,
    handleRemoveThumbnail,
    removeVariation,
}: IVariationsItem) => {
    return (
        <>
            {attributesForVariant && (
                <Space align='center' className='flex items-end'>
                    <Form.Item className='capitalize' {...restField} name={[fieldName, '_id']} dependencies={['_id']}>
                        <InputNumber className='hidden' />
                    </Form.Item>
                    <Form.Item
                        className='capitalize'
                        {...restField}
                        name={[fieldName, 'thumbnail']}
                        rules={[
                            {
                                validator: variationsThumbnailValidator,
                            },
                        ]}
                        dependencies={['thumbnail']}
                    >
                        <Upload
                            itemRender={CustomItemRenderVariant}
                            beforeUpload={() => false}
                            listType='picture'
                            fileList={variantFile[index]}
                            onChange={handleChangeThumbnail(index)}
                            maxCount={1}
                        >
                            {variantFile[index]?.length >= 1 ? null : <UploadButtonVariant />}
                        </Upload>
                    </Form.Item>
                    {attributesForVariant.map((attribute) => (
                        <Form.Item
                            className='capitalize'
                            key={attribute._id}
                            name={[fieldName, 'variantAttributes', attribute.attributeKey]}
                            label={attribute.name}
                            required={attribute.isRequired || attribute.isVariant}
                            rules={[
                                {
                                    required: attribute.isRequired || attribute.isVariant,
                                    message: 'Yêu cầu bắt buộc!',
                                },
                            ]}
                        >
                            {attribute.type === 'options' && (
                                <Select placeholder='Please select'>
                                    {attribute.values.map((value, i) => (
                                        <Select.Option value={value} key={i}>
                                            {value}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}
                            {attribute.type === 'manual' && <Input placeholder='Please input' />}
                        </Form.Item>
                    ))}

                    <Form.Item
                        className='capitalize'
                        {...restField}
                        name={[fieldName, 'price']}
                        label='giá tiền (VNĐ)'
                        dependencies={['price']}
                        rules={[variationsPriceValidator()]}
                    >
                        <InputNumber<number>
                            min={1}
                            placeholder='Nhập giá tiền...'
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value?.replace(/VNĐ\s?|(,*)/g, '') as unknown as number}
                            className='w-full'
                        />
                    </Form.Item>
                    <Form.Item
                        className='capitalize'
                        {...restField}
                        name={[fieldName, 'stock']}
                        label='Kho hàng'
                        rules={[variationsStockValidator()]}
                    >
                        <InputNumber min={1} placeholder='Nhập số lượng kho hàng...' className='w-full' />
                    </Form.Item>
                    <Form.Item
                        className='capitalize'
                        {...restField}
                        valuePropName='checked'
                        name={[fieldName, 'isActive']}
                        dependencies={['isActive']}
                        initialValue={true}
                    >
                        <Checkbox>Công khai</Checkbox>
                    </Form.Item>
                    <div className='h-14 w-14'>
                        {!id && (
                            <MinusCircleOutlined
                                onClick={() => {
                                    handleRemoveThumbnail(index);
                                    removeVariation(fieldName);
                                }}
                                className='translate-y-[20%] text-lg'
                            />
                        )}
                    </div>
                </Space>
            )}
        </>
    );
};

export default VariationItem;
