import "@/components/order-list/OrderList.css";
import { useEffect, useState } from "react";
import { FormatBigDate, FormatSmallDate } from "@/utils/date";
import threeItems from "@/assets/three-items.png";
import del from "@/assets/delete.png";
import type { IOrder, IOrderSummary } from "@/types/IOrder";
import { GetOrderSummary } from "@/components/order-list/OrderList.service";
import { useTranslation } from "react-i18next";

interface OrderListProps 
{
    orders: IOrder[];
    onSelect: (order: IOrder) => void;
}

export default function OrderList({orders, onSelect }: OrderListProps) 
{
    const { t } = useTranslation();
    const [summaries, setSummaries] = useState<Record<number, IOrderSummary>>({});

    useEffect(() =>
    {
        const LoadOrderSummaries = async () =>
        {
            const data = await Promise.all(
                orders.map(async order =>
                {
                    const summary = await GetOrderSummary(order.id);

                    return { orderId: order.id, summary };
                })
            );

            const summariesMap = data.reduce(
                (acc, item) =>
                {
                    acc[item.orderId] = item.summary;

                    return acc;
                },
                {} as Record<number, IOrderSummary>
            );

            setSummaries(summariesMap);
        };

        if (orders.length > 0)
            LoadOrderSummaries();
    }, [orders]);

    return (
        <section className="order-list">
            <div className="order-list__header">
                <button className="order-list__add">+</button>
                <h1>{t("orderList.title")} / {orders.length}</h1>
            </div>
            <div className="order-list__items">
                {orders.map(order =>
                {
                    const summary = summaries[order.id];

                    return (
                        <div className="order-card" key={order.id} onClick={() => onSelect(order)}>
                            <div className="order-card__title">
                                <span>
                                    {order.title}
                                </span>
                            </div>
                            <div className="order-card__products">
                                <div className="order-card__products-icon">
                                    <img src={threeItems} />
                                </div>
                                <div className="order-card__count">
                                    <strong>
                                        {summary?.productsCount ?? 0}
                                    </strong>
                                    <span>
                                        {t("orderList.product")}
                                    </span>
                                </div>
                            </div>
                            <div className="order-card__date">
                                <span className="order-card__date-small">
                                    {FormatSmallDate(order.date)}
                                </span>

                                <span className="order-card__date-big">
                                    {FormatBigDate(order.date)}
                                </span>
                            </div>
                            <div className="order-card__price">
                                <div className="order-card__price-usd">
                                    <span>
                                        {summary?.prices.USD ?? 0} $
                                    </span>
                                </div>

                                <div className="order-card__price-uah">
                                    <span>
                                        {summary?.prices.UAH ?? 0} UAH
                                    </span>
                                </div>
                            </div>
                            <button className="order-card__delete">
                                <img src={del} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}