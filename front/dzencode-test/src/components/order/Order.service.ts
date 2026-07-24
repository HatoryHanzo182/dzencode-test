import { API_ENDPOINTS } from "@/api/endpoints";
import { httpClient } from "@/api/HttpClient";
import type { IOrder } from "@/types/IOrder";

export async function GetOrders()
{
    return httpClient.get<IOrder[]>(API_ENDPOINTS.ORDERS.ALL);
}