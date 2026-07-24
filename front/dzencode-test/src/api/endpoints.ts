export const API_ENDPOINTS = 
{
    AUTH:
    {
        TOKEN: "/auth/token",
    },
    ORDERS:
    {
        ALL: "/orders",
        BY_ID: (id: number) => `/orders/${id}`,
        SUMMARY: (id: number) => `/orders/${id}/summary`,
        PRODUCTS: (id: number) => `/orders/${id}/products`,
    },
    PRODUCTS:
    {
        ALL: (orderId: number) => `/products?order=${orderId}`,
        FILTERS: (orderId: number) => `/products/filters?order=${orderId}`,
    },
} as const;