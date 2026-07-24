import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IOrder } from "@/types/IOrder";
import { GetOrders } from "@/components/order/Order.service";

interface OrdersState
{
    orders: IOrder[];
    loading: boolean;
    error: string | null;
}

const initialState: OrdersState =
{
    orders: [],
    loading: false,
    error: null
};

export const fetchOrders = createAsyncThunk(
    "orders/fetchOrders",
    async () =>
    {
        return await GetOrders();
    }
);

const ordersSlice = createSlice(
{
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: builder =>
    {
        builder
            .addCase(fetchOrders.pending, state =>
            {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) =>
            {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) =>
            {
                state.loading = false;
                state.error = action.error.message ?? "Ошибка загрузки заказов";
            });
    }
});

export default ordersSlice.reducer;