import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import productService from '~/services/product.service';

const useUpdateProduct = (id: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: FormData) => productService.updateProduct(data, id),
        onSuccess(res) {
            // setTimeout(() => {
            //     queryClient.prefetchQuery({
            //         queryKey: [QUERY_KEY.PRODUCTS],
            //         queryFn: () => productService.getAllProductForAdmin(),
            //     });
            // }, 300);
        },
        onError(error) {
            console.log('Update product error', error);
        },
    });
};

export default useUpdateProduct;
