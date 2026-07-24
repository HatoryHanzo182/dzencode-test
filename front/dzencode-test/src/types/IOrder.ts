import type { IProduct } from "@/types/IProduct";

export interface IOrder 
{
    id: number;
    title: string;
    date: string;
    description: string;
    products: IProduct[];
}

export interface IOrderSummary
{
    productsCount: number;
    prices: {
        USD: number;
        UAH: number;
    };
}