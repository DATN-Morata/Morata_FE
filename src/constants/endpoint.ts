export const PRODUCT_ENDPOINT = {
    PRODUCT: '/products',
    ALL: '/products/all',
    ALL_ADMIN: '/products/portal/all',
    LATEST: '/products/latest',
    BYCATE: '/products/bycate',
    DEALS: '/products/deals',
    REVIEWS: '/products/reviews',
    RELATED: '/products/related',
    CREATE: '/products',
    DELETE: '/products',
    UPDATE: '/products',
    UPDATE_VARIATIONS: '/products/variation/',
    CREATE_VARIATIONS: '/products/variation/',
};
export const CATEGORY_ENDPOINT = {
    ALL: '/categories/all',
    POPULAR: '/categories/popular',
    CREATE: '/categories',
    DETAIL: '/categories',
    UPDATE: '/categories',
};
export const CART_ENDPOINT = {
    GET: '/carts',
    ADDCART: '/carts/add',
    UPDATEQUANTITY: '/carts/update_quantity',
    REMOVEITEM: '/carts/remove',
};
export const BRAND_ENDPOINT = {
    ALL: '/brands/all',
    DETAIL: '/brands',
};

export const AUTH_ENDPOINT = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    SENDMAIL: '/auth/sendVerify',
    SENDRESETPASS: '/auth/sendresetPassword',
    VERIFY: '/auth/verifyEmail',
    RESETPASSWORD: '/auth/resetpassword',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
};

export const CHECKOUT_ENDPOINT = {
    ORDERS: '/orders',
    VNPAY: '/create-checkout-with-vnpay',
    SESSION: '/create-checkout-session',
};

export const ORDER_ENDPOINT = {
    GET_ALL_ORDERS: '/orders',
    MY_ORDERS: '/orders/user',
    CANCEL_ORDER: '/orders/cancel',
    CONFIRM_ORDER: '/orders/confirm',
    SHIPPING_ORDER: '/orders/shipping',
    DELIVERED_ORDER: '/orders/delivered',
    FINISH_ORDER: '/orders/done',
    CREATE_ORDER: '/orders',
};

export const ATTRIBUTES_ENDPOINT = {
    ALL: '/attributes',
    All: '/attributes/all',
    CREATE: 'attributes',
};

export const STATS_ENDPOINT = {
    TOTAL: '/stats/total',
    DAILY_STATS: '/stats/daily',
    MONTHLY_STATS: '/stats/monthly',
    YEARLY_STATS: '/stats/yearly',
    DATE_RANGE: 'stats/dateRange',

    PRODUCTS: '/stats/productStats',
};

export const USER_ENDPOINT = {
    PROFILE: '/users/private',
    UPDATE: '/users/priavte',
};
export const REVIEW_ENDPOINT = {
    GETOFPRODUCT: '/reviews',
};

export const SHIPPING_ENDPOINT = {
    GET_SERVICES: '/shipping/get-service',
    GET_PROVINCE: '/shipping/get-province',
    GET_DISTRICT: '/shipping/get-district',
    GET_WARD: '/shipping/get-ward',
    CALCULATE_FEE: '/shipping/calculate-shipping-fee',
};
