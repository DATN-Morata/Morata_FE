import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';
import showMessage from '~/utils/ShowMessage';

const useCancelOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationKey: [QUERY_KEY.ORDERS],
        mutationFn: ({ orderId, reason }: { orderId: string; reason?: string }) =>
            orderService.cancelOrder({ orderId, reason }),

        onSuccess() {
            showMessage('Cancel order successfully!', 'info');
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ORDERS] });
        },
    });
};

export default useCancelOrder;
