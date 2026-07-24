import "@/components/groups/Groups.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GroupList from "@/components/group-list/GroupList";
import GroupProductList from "@/components/group-list-product/GroupProductList";
import { GetGroupProducts } from "@/components/groups/Groups.service";
import type { IOrder } from "@/types/IOrder";
import type { IProduct } from "@/types/IProduct";
import type { RootState, AppDispatch } from "@/store/store";
import { fetchOrders } from "@/store/ordersSlice";
import { useTranslation } from "react-i18next";

export default function Groups()
{
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const orders = useSelector((state: RootState) => state.orders.orders);
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() =>
    {
        if (orders.length === 0)
            dispatch(fetchOrders());
    }, [dispatch, orders.length]);

    useEffect(() =>
    {
        if (!selectedOrder)
        {
            setProducts([]);
            return;
        }

        const loadProducts = async () =>
        {
            const data = await GetGroupProducts(selectedOrder.id);

            setProducts(data);
        };

        loadProducts();
    }, [selectedOrder]);

    return (
        <div className="groups__wrapper">
            <section className="groups">
                <GroupList
                    groups={orders}
                    onSelect={setSelectedOrder}
                    selectedId={selectedOrder?.id}
                />
                {selectedOrder && (
                    <div className="groups__panel">
                        <div className="groups__panel-header">
                            <h2>{selectedOrder.title}</h2>
                            <button
                                className="groups__panel-close"
                                onClick={() => setSelectedOrder(null)}
                            >
                                ×
                            </button>
                        </div>
                        <div className="groups__panel-add">
                            <button className="groups__panel-add-btn">+</button>
                            <span>{t("groups.addProduct")}</span>
                        </div>
                        <GroupProductList products={products} />
                    </div>
                )}
            </section>
        </div>
    );
}