import instance from '~/utils/api/axiosIntance';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { ORDER_ENDPOINT } from '~/constants/endpoint';
import { IOrder, IOrderDetails } from '~/types/Order';
import { OrderStatus } from '~/types/enum';

const orderService = {
    myOrder() {
        return instance.get<IAxiosResponse<IOrder[]>>(`${ORDER_ENDPOINT.MY_ORDERS}`);
    },
    getAllOrders() {
        return instance.get<IAxiosResponse<IOrder[]>>(`${ORDER_ENDPOINT.MY_ORDERS}`);
    },
    cancelOrder(id: string) {
        return instance.post<void, { orderId: string }>(`${ORDER_ENDPOINT.MY_ORDERS}`, {
            orderId: id,
        });
    },
    orderDetails(id: string) {
        return instance.get<IAxiosResponse<Omit<IOrderDetails, '_id'>>>(`${ORDER_ENDPOINT.ROOT}/${id}`);
    },
    orderStatus() {
        return instance.get<IAxiosResponse<OrderStatus[]>>(`${ORDER_ENDPOINT.MY_ORDERS}`);
    },
};

export default orderService;
