import type { IGuarantee } from "@/types/IGuarantee";
import type { IPrice } from "@/types/IPrice";

export interface IProduct 
{
    id: number;
    serialNumber: number;
    isNew: number;
    photo: string;
    title: string;
    type: string;
    specification: string;
    guarantee: IGuarantee;
    price: IPrice[];
    order: number;
    date: string;
}

export interface IProductFilters 
{
    types: string[];
    specifications: string[];
}