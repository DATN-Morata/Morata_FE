import instance from '~/utils/api/axiosIntance';
import { IAxiosResponse } from '~/types/AxiosResponse';
import { ORDER_ENDPOINT } from '~/constants/endpoint';
import { IOrderResponse, IOrderDetails } from '~/types/Order';
import { OrderStatus } from '~/constants/enum';

const orderService = {
    myOrder() {
        return instance.get<IAxiosResponse<IOrderResponse>>(`${ORDER_ENDPOINT.MY_ORDERS}`);
    },

    getAllOrders(params?: any) {
        return instance.get<IAxiosResponse<IOrderResponse>>(`${ORDER_ENDPOINT.GET_ALL_ORDERS}`, {
            params,
        });
    },

    cancelOrder(body: { orderId?: string; reason?: string }) {
        return instance.patch<void, { orderId: string; reason?: string }>(`${ORDER_ENDPOINT.CANCEL_ORDER}`, body);
    },
    confirmOrder({ orderId, reason }: { orderId?: string; reason?: string }) {
        return instance.patch<void, { orderId?: string; reason?: string }>(`${ORDER_ENDPOINT.GET_ALL_ORDERS}/confirm`, {
            orderId,
            reason,
        });
    },
    shippingOrder({ orderId, reason }: { orderId?: string; reason?: string }) {
        return instance.patch<void, { orderId: string; reason: string }>(`${ORDER_ENDPOINT.GET_ALL_ORDERS}/ship`, {
            orderId,
            reason,
        });
    },
    deliveredOrder({ orderId, reason }: { orderId?: string; reason?: string }) {
        return instance.patch<void, { orderId: string; reason: string }>(`${ORDER_ENDPOINT.GET_ALL_ORDERS}/delivered`, {
            orderId,
            reason,
        });
    },

    finishOrder(id: string) {
        return instance.patch<void, { orderId: string }>(`${ORDER_ENDPOINT.FINISH_ORDER}`, {
            orderId: id,
        });
    },

    finishOrderClient(id: string) {
        return instance.patch<void, string>(`${ORDER_ENDPOINT.FINISH_ORDER}`, {
            orderId: id,
        });
    },

    orderDetails(id: string) {
        return instance.get<IAxiosResponse<IOrderDetails>>(`${ORDER_ENDPOINT.GET_ALL_ORDERS}/${id}`);
    },

    orderStatus() {
        return instance.get<IAxiosResponse<OrderStatus[]>>(`${ORDER_ENDPOINT.MY_ORDERS}`);
    },

    vnpayReturnStatusOrder(params: URLSearchParams) {
        return instance.get<{ code: string; message: string; data?: any }>(`${ORDER_ENDPOINT.VNPAY_RETURN}?${params}`);
    },
};

export default orderService;
