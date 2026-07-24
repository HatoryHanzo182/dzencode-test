import { API_ENDPOINTS } from "@/api/endpoints";
import { httpClient } from "@/api/HttpClient";
import type { IOrderSummary } from "@/types/IOrder";

export async function GetOrderSummary(orderId: number)
{
    return httpClient.get<IOrderSummary>(API_ENDPOINTS.ORDERS.SUMMARY(orderId));
}