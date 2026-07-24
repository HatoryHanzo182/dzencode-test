import "@/components/order/Orders.css";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OrderList from "@/components/order-list/OrderList";
import ProductList from "@/components/product-list/ProductList";
import type { RootState, AppDispatch } from "@/store/store";
import { fetchOrders } from "@/store/ordersSlice";
import type { IOrder } from "@/types/IOrder";

export default function Orders()
{
    const navigate = useNavigate();
    const { orderId } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector((state: RootState) => state.orders.orders);

    useEffect(() =>
    {
        dispatch(fetchOrders());
    }, [dispatch]);

    const selectedOrder = orders.find(order => order.id === Number(orderId));
    const handleSelectOrder = (order: IOrder) => { navigate(`/orders/${order.id}/products`); };

    return (
        <section className="orders">
            {selectedOrder ? (
                <ProductList orderId={selectedOrder.id}
                />
            ) : (
                <OrderList orders={orders} onSelect={handleSelectOrder} />
            )}
        </section>
    );
}