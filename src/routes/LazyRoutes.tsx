import React, { lazy } from 'react';
import Loading from '~/components/_common/Loading/Loading';

// @client page
export const AboutPage = lazy(() => import('~/pages/Clients/About'));
export const HomePage = lazy(() => import('~/pages/Clients/Home'));
export const ProductsPage = lazy(() => import('~/pages/Clients/Products'));
export const ProductDetailsPage = lazy(() => import('~/pages/Clients/ProductDetails'));
export const WishlistPage = lazy(() => import('~/pages/Clients/WishList'));
export const CheckoutPage = lazy(() => import('~/pages/Clients/Checkout'));
export const AccountLayoutPage = lazy(() => import('~/layouts/AccountLayout'));
export const MyOrdersPage = lazy(() => import('~/pages/Clients/Account/MyOrders'));
export const MyAddressPage = lazy(() => import('~/pages/Clients/Account/MyAddress'));
export const ProfilePage = lazy(() => import('~/pages/Clients/Account/Profile'));
export const LoginPage = lazy(() => import('~/pages/Clients/AuthPage/Login'));
export const RegisterPage = lazy(() => import('~/pages/Clients/AuthPage/Register'));
export const AuthLayoutPage = lazy(() => import('~/layouts/AuthLayout'));
export const ContactPage = lazy(() => import('~/pages/Clients/Contact'));

// @admin page
export const DashboardPage = lazy(() => import('~/pages/Admins/_dashboard_'));
export const NotFoundPage = lazy(() => import('~/pages/404'));
export const ErrorPage = lazy(() => import('~/pages/Error'));
export const ProductsList = lazy(() => import('~/pages/Admins/_product_/index'));
export const CreateProduct = lazy(() => import('~/pages/Admins/_product_/CreateProduct'));
export const UpdateProduct = lazy(() => import('~/pages/Admins/_product_/UpdateProduct'));
export const AdminProductDetail = lazy(() => import('~/pages/Admins/_product_/ProductDetail'));
export const ManageUsers = lazy(() => import('~/pages/Admins/_user_/index'));
export const CreateUser = lazy(() => import('~/pages/Admins/_user_/CreateUser'));
export const UpdateUser = lazy(() => import('~/pages/Admins/_user_/UpdateUser'));
export const ManageOrders = lazy(() => import('~/pages/Admins/_order_/OrdersList'));
export const OrdersDetails = lazy(() => import('~/pages/Admins/_order_/OrderDetails'));
export const CategoryList = lazy(() => import('~/pages/Admins/_category_'));
export const CreateCategory = lazy(() => import('~/pages/Admins/_category_/CreateCategory'));

// @suspense
export const Suspense = ({ children }: { children: React.ReactNode }) => {
    return <React.Suspense fallback={<Loading />}>{children}</React.Suspense>;
};
