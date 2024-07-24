import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import orderService from '~/services/order.service';

const UseVNpayReturn = () => {
    return useQuery({
        queryKey: [QUERY_KEY.VNPAY_RETURN],
        queryFn: () => orderService.vnpayReturnStatusOrder(),
        staleTime: 0,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};

export default UseVNpayReturn;
