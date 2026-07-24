import '@/components/group-list/GroupList.css';
import { useEffect, useState } from 'react';
import { FormatSmallDate, FormatBigDate } from '@/utils/date';
import threeItems from '@/assets/three-items.png';
import arrow from '@/assets/right-arrows.png';
import type { IOrder, IOrderSummary } from '@/types/IOrder';
import { GetOrderSummary } from '@/components/order-list/OrderList.service';
import { useTranslation } from 'react-i18next';

interface IGroupListProps
{
    groups: IOrder[];
    onSelect: (group: IOrder) => void;
    selectedId?: number;
}

export default function GroupList({ groups, onSelect, selectedId }: IGroupListProps)
{
    const { t } = useTranslation();
    const [summaries, setSummaries] = useState<Record<number, IOrderSummary>>({});

    useEffect(() =>
    {
        const loadSummaries = async () =>
        {
            const data = await Promise.all(
                groups.map(async group =>
                {
                    const summary = await GetOrderSummary(group.id);

                    return { orderId: group.id, summary };
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

        if (groups.length > 0)
            loadSummaries();
    }, [groups]);

    return (
        <div className="group-list">
            <div className="group-list__header">
                <button className="orders__add">+</button>
                <h1>{t("orders.title")}  / {groups.length}</h1>
            </div>
            <div className="group-list__items">
                {groups.map(group =>
                {
                    const summary = summaries[group.id];

                    return (
                        <div
                            className={`group-card${
                                selectedId === group.id
                                    ? ' group-card--active'
                                    : ''
                            }`}
                            key={group.id}
                            onClick={() => onSelect(group)}
                        >
                            <div className="group-card__icon">
                                <img
                                    src={threeItems}
                                />
                            </div>
                            <div className="group-card__count">
                                <strong>
                                    {summary?.productsCount ?? 0}
                                </strong>
                                <span>
                                    {t("orders.product")}
                                </span>
                            </div>
                            <div
                                className={`group-card__date${
                                    selectedId === group.id
                                        ? ' group-card__date--shift'
                                        : ''
                                }`}
                            >
                                <span className="group-card__date-small">
                                    {FormatSmallDate(group.date)}
                                </span>
                                <span className="group-card__date-big">
                                    {FormatBigDate(group.date)}
                                </span>
                            </div>
                            <div
                                className={`group-card__arrow${
                                    selectedId === group.id
                                        ? ' group-card__arrow--visible'
                                        : ''
                                }`}
                            >
                                <img
                                    src={arrow}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}