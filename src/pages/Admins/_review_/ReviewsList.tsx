import { DeleteOutlined, WarningOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { Button, Modal, Rate, Space, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import useTable from '~/hooks/_common/useTable';
import useDeleteReview from '~/hooks/review/Mutations/useDeleteReview';
import useGetAllReviews from '~/hooks/review/Queries/useGetAllReviews';
import { IReviewProductResponse } from '~/types/Review';
import TableDisplay from '../../../components/_common/TableDisplay';
import WrapperPageAdmin from '../_common/WrapperPageAdmin';
import dayjs from 'dayjs';
import moment from 'moment';

const ReviewsList = () => {
    const { query, onFilter, onSelectPaginateChange, getColumnSearchProps } = useTable<IReviewProductResponse>();
    const { data: reviewRes } = useGetAllReviews(query);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const totalDocs = reviewRes?.data.totalDocs;
    const reviewList = reviewRes?.data.reviewList;
    const currentPage = Number(query.page || 1);

    const [reviewId, setReviewId] = useState<string>('');
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
    const { mutate: deleteReview, isSuccess } = useDeleteReview(reviewId);

    const showModal = (id: string) => {
        setIsModalOpen(true);
        setReviewId(id);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setReviewId('');
    };
    const handleDeleteProduct = () => {
        setConfirmLoading(true);
        deleteReview();
    };

    const columns: TableProps<IReviewProductResponse>['columns'] = [
        {
            title: 'Mã đánh giá',
            dataIndex: '_id',
            key: 'search',
            ...getColumnSearchProps('_id'),
            width: '15%',
        },
        {
            title: 'Người đánh giá',
            render: (_, record) => (
                <>
                    <span>{record.userId.name}</span>
                </>
            ),
            key: 'username',
            width: '20%',
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            render: (_, record) => (
                <>
                    <Rate value={record.rating} disabled className='text-nowrap'></Rate>
                </>
            ),
            width: '15%',
        },
        {
            title: 'Nội dung đánh giá',
            dataIndex: 'content',
            key: 'content',
            render: (_, record) => (
                <>
                    <span>{record.content}</span>
                </>
            ),
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (_, record) => (
                <>
                    <span>{dayjs(record.createdAt).format('DD/MM/YYYY')}</span>
                </>
            ),
            sortOrder: query.sort
                ? query.sort.includes('createdAt')
                    ? query.sort.includes('-')
                        ? 'descend'
                        : 'ascend'
                    : undefined
                : undefined,
            sorter: (a: any, b: any) => moment(b.createdAt).valueOf() - moment(a.createdAt).valueOf(),
        },
        {
            title: 'Thao tác',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space className='flex items-center justify-center' size={'middle'}>
                    <Tooltip title='Xóa đánh giá'>
                        <DeleteOutlined
                            onClick={() => showModal(record._id)}
                            className='cursor-pointer rounded-full bg-rose-200 p-2 text-rose-500 transition-colors duration-500 hover:bg-rose-300'
                            style={{ fontSize: '1rem' }}
                        />
                    </Tooltip>
                </Space>
            ),
            width: '10%',
        },
    ];

    useEffect(() => {
        if (isSuccess) {
            setIsModalOpen(false);
            setConfirmLoading(false);
        }
    }, [isSuccess]);
    return (
        <>
            <WrapperPageAdmin title='Quản lý đánh giá' option={<span></span>}>
                <TableDisplay<IReviewProductResponse>
                    onFilter={onFilter}
                    columns={columns}
                    currentPage={currentPage}
                    dataSource={reviewList}
                    onSelectPaginateChange={onSelectPaginateChange}
                    totalDocs={totalDocs}
                />
            </WrapperPageAdmin>
            {/* Modal */}
            <Modal
                title={
                    <div>
                        <WarningOutlined className='text-yellow-500' style={{ fontSize: '1.5rem' }} />
                        <h4 className='ml-2 inline-block'>Confirm</h4>
                    </div>
                }
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key='back' type='default' onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button
                        key='button'
                        danger
                        loading={confirmLoading}
                        type='primary'
                        onClick={() => {
                            handleDeleteProduct();
                        }}
                    >
                        Delete
                    </Button>,
                ]}
            >
                <p>Are you sure want to delete this product?</p>
            </Modal>
        </>
    );
};

export default ReviewsList;
