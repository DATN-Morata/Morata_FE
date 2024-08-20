import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/constants/queryKey';
import reviewService from '~/services/reviews.service';
import showMessage from '~/utils/ShowMessage';

const useDeleteReview = (reviewId: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => reviewService.deleteReview(reviewId),
        onSuccess() {
            showMessage('Xóa đánh giá thành công', 'success');

            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REVIEWS] });
        },
        onError(error) {
            console.log(error.message);
        },
    });
};

export default useDeleteReview;
