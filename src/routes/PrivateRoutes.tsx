import AdminLayout from '~/layouts/AdminLayout';
import ProtectedRouteAuth from '~/layouts/Protected/AuthProtected';
import {
    ManageUsers,
    CreateProduct,
    ProductsList,
    Suspense,
    CreateUser,
    UpdateUser,
    DashboardPage,
    UpdateProduct,
    AdminProductDetail,
} from './LazyRoutes';

const PrivateRoutes = [
    {
        path: '/admin',
        element: (
            <ProtectedRouteAuth>
                <AdminLayout />
            </ProtectedRouteAuth>
        ),
        children: [
            {
                path: 'dashboard',
                element: (
                    <Suspense>
                        <DashboardPage />
                    </Suspense>
                ),
            },
            {
                index: true,
                element: (
                    <Suspense>
                        <DashboardPage />
                    </Suspense>
                ),
            },
            {
                path: 'products',
                children: [
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <ProductsList />
                            </Suspense>
                        ),
                    },
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ProductsList />
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
                        path: 'edit',
                        element: (
                            <Suspense>
                                <CreateProduct />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                index: true,
                element: (
                    <Suspense>
                        <DashboardPage />,
                    </Suspense>
                ),
            },
            {
                path: 'dashboard',
                element: (
                    <Suspense>
                        <DashboardPage />,
                    </Suspense>
                ),
            },
            {
                path: 'product',
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ProductsList />,
                            </Suspense>
                        ),
                    },
                    {
                        path: 'list',
                        element: (
                            <Suspense>
                                <ProductsList />,
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
                        path: 'edit',
                        element: (
                            <Suspense>
                                <UpdateProduct />
                            </Suspense>
                        ),
                    },
                    {
                        path: '1/detail',
                        element: (
                            <Suspense>
                                <AdminProductDetail />
                            </Suspense>
                        ),
                    },
                ],
            },
            {
                path: 'user',
                children: [
                    {
                        index: true,
                        element: (
                            <Suspense>
                                <ManageUsers />,
                            </Suspense>
                        ),
                    },
                    {
                        path: 'create',
                        element: (
                            <Suspense>
                                <CreateUser />
                            </Suspense>
                        ),
                    },
                    {
                        path: 'edit',
                        element: (
                            <Suspense>
                                <UpdateUser />
                            </Suspense>
                        ),
                    },
                ],
            },
        ],
    },
];

export default PrivateRoutes;
