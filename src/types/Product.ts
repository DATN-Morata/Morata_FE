export interface IProduct {
    _id: string;
    name: string;
    price: number;
    discountPercentage: number;
    rating: number;
    thumbnail: string;
    stock: number;
    key: string;
    images: string[];
    categoryId: string;
    brandId: string;
    reviewIds: string[];
    isAvailable: boolean;
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
    description: string;
    sku: string;
}

export type IProductItem = {
    _id: string;
    name: string;
    price: number;
    discountPercentage: number;
    rating: number;
    categoryId: string;
    brandId: string;
    stock: number;
    images: string[];
    thumbnail: string;
    reviewIds: string[];
};

export type IProductItemNew = {
    _id: string;
    name: string;
    thumbnail: string;
    images: string[];
    rating: number;
    reviewCount: number;
    categoryId: string;
    brandId: string;
    variationIds: {
        _id: string;
        price: number;
        discountPercentage?: number;
        stock: number;
        sku: string;
        color: string;
        image?: string;
        productId: string;
    }[];
};

export type IAllProductResponseNew = {
    success: boolean;
    message: string;
    status: number;
    products: IProductItemNew[];
    data: {
        products: IProductItemNew[];
        page: number;
        totalDocs: number;
        totalPages: number;
    };
};

export type IAllProductsResponse = {
    products: IProductItem[];
    page: number;
    totalDocs: number;
    totalPages: number;
};

export type IProductImages = {
    file: File;
    fileList: FileList;
};
export type IProductThumbnail = {
    file: File;
    fileList: FileList;
};
export type ITagsType = {
    label: string;
    value: string;
};
export type IAttribute = {
    attribute: string;
    categoryId: string | ITagsType;
};
export type IProductForm = {
    name: string;
    price: number;
    thumbnail: IProductThumbnail | null;
    stock: number;
    images: IProductImages | null;
    categoryId: string | ITagsType;
    brandId: string | ITagsType;
    discountPercentage: number;
    description: string;
    attributes: IAttribute[];
};

export type PropTypeProduct = { product: IProduct };
