import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useCreateVariantions = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => productService.createVariationsToProduct(data),
        onSuccess() {
            setTimeout(() => {
                queryClient.prefetchQuery({
                    queryKey: [QUERY_KEY.PRODUCTS],
                    queryFn: () => productService.getAllProductForAdmin(),
                });
            }, 300);
        },
        onError(error) {
            throw new Error(error.message);
        },
    });
};

export default useCreateVariantions;
