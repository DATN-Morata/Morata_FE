import { CATEGORY_ENDPOINT } from '~/constants/endpoint';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { ICategory, ICategoryFormData, ICategoryPopular } from '~/types/Category';
import instance from '~/utils/api/axiosIntance';

const categoryService = {
    async getAll() {
        const res = await instance.get<IAxiosResponse<ICategory[]>>(`${CATEGORY_ENDPOINT.ALL}`);
        return res.data;
    },

    async getPopular() {
        const res = await instance.get<IAxiosResponse<ICategoryPopular[]>>(`${CATEGORY_ENDPOINT.POPULAR}`);
        return res.data;
    },

    async createCategory(payload: ICategoryFormData) {
        const res = await instance.post<IAxiosResponse<ICategory>>(`${CATEGORY_ENDPOINT.CREATE}`, payload);
        return res.data;
    },

    async updateCategory(id: string, payload: ICategoryFormData) {
        const res = await instance.patch<IAxiosResponse<ICategory>>(`${CATEGORY_ENDPOINT.UPDATE}/${id}`, payload);
        return res.data;
    },

    async getDetail(id: string) {
        const res = await instance.get<IAxiosResponse<ICategory>>(`${CATEGORY_ENDPOINT.DETAIL}/${id}`);
        return res.data;
    },
};

export default categoryService;
