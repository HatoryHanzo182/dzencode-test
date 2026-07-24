import { API_ENDPOINTS } from "@/api/endpoints";
import { httpClient } from "@/api/HttpClient";
import type { IOrder } from "@/types/IOrder";
import type { IProduct } from "@/types/IProduct";

export async function GetGroups()
{
    return httpClient.get<IOrder[]>(API_ENDPOINTS.ORDERS.ALL);
}

export async function GetGroupProducts(orderId: number)
{
    return httpClient.get<IProduct[]>(API_ENDPOINTS.ORDERS.PRODUCTS(orderId));
}