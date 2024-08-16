import { ReactNode } from 'react';
import { IAttributesValue } from './Attributes';
import { AttributeType } from '~/constants/enum';

export interface ICategoryPopular {
    totalProducts?: number;
    categoryId: string;
    categoryName: string;
    image: string;
}
export type ICategory = {
    _id: string;
    name: string;
    attributeIds: IAttributesValue[];
};

export type ICategoryFormData = {
    name: string;
    attributeIds: string[];
};

export type IAttributeFormData = {
    _id?: string;
    name: string;
    type: AttributeType;
    values: string[];
    isVariant: boolean;
    isRequired: boolean;
    // inputValues?: string[];
};

export interface IValueCheckbox {
    name: string;
    label: ReactNode;
    value: string;
}
