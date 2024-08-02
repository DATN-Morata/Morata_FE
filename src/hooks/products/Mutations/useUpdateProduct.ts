import { useMutation } from '@tanstack/react-query';
import productService from '~/services/product.service';

const useUpdateProduct = () => {
    return useMutation({
        mutationFn: ({ data, productId }: { data: FormData; productId: string }) =>
            productService.updateProduct(data, productId),
        onSuccess: (res) => {
            console.log('Update product success', res);
        },
        onError(error) {
            console.log('Update product error', error);
        },
    });
};

export default useUpdateProduct;
