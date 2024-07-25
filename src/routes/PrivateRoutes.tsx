import AdminLayout from '~/layouts/AdminLayout';
import {
    AdminProductDetail,
    CreateProduct,
    CreateUser,
    DashboardPage,
    ManageUsers,
    ManageProducts,
    Suspense,
    UpdateProduct,
    OrdersDetails,
    ProductsListAll,
    CategoryList,
    CreateCategory,
    UpdateUser,
    ManageOrders,
    UpdateCategory,
} from './LazyRoutes';
import { ADMIN_ROUTES } from '~/constants/router';
import RedirectToProductList from '~/components/_common/RedirectToProductList/RedirectToProductList';
import { Outlet } from 'react-router-dom';

const PrivateRoutes = [
    {
        path: ADMIN_ROUTES.DASHBOARD,
        element: (
            // <ProtectedRouteAuth>
            <AdminLayout />
            // </ProtectedRouteAuth>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense>
                        <DashboardPage />
                    </Suspense>
                ),
            },
            {
                path: ADMIN_ROUTES.PRODUCTS_LIST,
                element: <ManageProducts />,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ProductsListAll />
                            </Suspense>
                        ),
                    },

                    {
                        path: 'all',
                        element: (
                            <Suspense>
                                <ProductsListAll />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'live',
                        element: (
                            <Suspense>
                                <ProductsListAll />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'deleted',
                        element: (
                            <Suspense>
                                <div>HEHE xóa rồi nhé</div>
                            </Suspense>
                        ),
                    },
                    {
                        path: 'hidden',
                        element: (
                            <Suspense>
                                <div>HEHE ẩn rồi nhé</div>
                            </Suspense>
                        ),
                    },
                    // {
                    //     path: ADMIN_ROUTES.PRODUCTS_CREATE,
                    //     element: (
                    //         <Suspense>
                    //             <CreateProduct />
                    //         </Suspense>
                    //     ),
                    // },
                    // {
                    //     path: ':id/edit',
                    //     element: (
                    //         <Suspense>
                    //             <UpdateProduct />
                    //         </Suspense>
                    //     ),
                    // },
                    // {
                    //     path: ':id/detail',
                    //     element: (
                    //         <Suspense>
                    //             <AdminProductDetail />
                    //         </Suspense>
                    //     ),
                    // },
                ],
            },
            {
                path: ADMIN_ROUTES.PRODUCTS,
                element: (
                    <Suspense>
                        <Outlet />
                    </Suspense>
                ),
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <RedirectToProductList />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateProduct />
                            </Suspense>
                        ),
                    },
                    {
                        path: ':id/edit',
                        element: (
                            <Suspense>
                                <UpdateProduct />
                            </Suspense>
                        ),
                    },
                    {
                        path: ':id/detail',
                        element: (
                            <Suspense>
                                <AdminProductDetail />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: ADMIN_ROUTES.USERS,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ManageUsers />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.USERS_CREATE,
                        element: (
                            <Suspense>
                                <CreateUser />
                            </Suspense>
                        ),
                    },
                    {
                        path: `${ADMIN_ROUTES.USERS_EDIT}/:id`,
                        element: (
                            <Suspense>
                                <UpdateUser />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: ADMIN_ROUTES.ORDERS,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ManageOrders />
                            </Suspense>
                        ),
                    },
                    {
                        path: `${ADMIN_ROUTES.ORDERS}/:id/detail`,
                        element: (
                            <Suspense>
                                <OrdersDetails />
                            </Suspense>
                        ),
                    },
                    {
                        path: `test`,
                        element: (
                            <Suspense>
                                <ManageOrders />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: ADMIN_ROUTES.CATEGORIES,
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <CategoryList />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.CATEGORIES_CREATE,
                        element: (
                            <Suspense>
                                <CreateCategory />
                            </Suspense>
                        ),
                    },
                    {
                        path: ADMIN_ROUTES.CATEGORIES_EDIT,
                        element: (
                            <Suspense>
                                <UpdateCategory />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
];

export default PrivateRoutes;
