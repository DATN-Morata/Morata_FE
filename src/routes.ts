import { lazy } from 'react';

//@Page
const Dashboard = lazy(() => import('./pages/Admins/Dashboard'));
const About = lazy(() => import('./pages/Clients/About'));
const Home = lazy(() => import('./pages/Clients/Home'));
const Products = lazy(() => import('./pages/Clients/Products'));
const ProductDetails = lazy(() => import('./pages/Clients/ProductDetails'));
const Wishlist = lazy(() => import('./pages/Clients/WishList/WishList'));
const Checkout = lazy(() => import('./pages/Clients/Checkout'));

//@Router
export const ClientRoutes = [
    { PATH: '', ELEMENT: Home },
    { PATH: 'about', ELEMENT: About },
    { PATH: 'products', ELEMENT: Products },
    { PATH: 'productdetail', ELEMENT: ProductDetails },
    { PATH: 'wishlist', ELEMENT: Wishlist },
    { PATH: 'checkout', ELEMENT: Checkout },
];

export const AdminRoutes = [{ PATH: '', ELEMENT: Dashboard }];
