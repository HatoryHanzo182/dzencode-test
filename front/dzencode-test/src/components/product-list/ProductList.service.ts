import { API_ENDPOINTS } from "@/api/endpoints";
import { httpClient } from "@/api/HttpClient";
import type { IProduct, IProductFilters } from "@/types/IProduct";

export async function GetProducts(orderId: number)
{
    return httpClient.get<IProduct[]>(API_ENDPOINTS.PRODUCTS.ALL(orderId));
}

export async function GetProductFilters(orderId: number)
{
    return httpClient.get<IProductFilters>(API_ENDPOINTS.PRODUCTS.FILTERS(orderId));
}

export function FilterProducts(products: IProduct[], type: string, specification: string)
{
    return products.filter(product =>
    {
        const matchesType = !type || product.type === type;
        const matchesSpecification = !specification || product.specification === specification;

        return matchesType && matchesSpecification;
    });
}