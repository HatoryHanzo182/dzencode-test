import "./ProductList.css";
import { useEffect, useState } from "react";
import del from '@/assets/delete.png';
import { FormatBigDate, FormatDate, FormatSmallDate } from "@/utils/date";
import { FilterProducts, GetProductFilters, GetProducts } from "@/components/product-list/ProductList.service";
import type { IProduct } from "@/types/IProduct";
import { useTranslation } from "react-i18next";

interface IProductListProps 
{
    orderId: number;
}

export default function ProductList({ orderId }: IProductListProps) 
{
    const { t } = useTranslation();
    const [products, setProducts] = useState<IProduct[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [specifications, setSpecifications] = useState<string[]>([]);
    const [selectedType, setSelectedType] = useState("");
    const [selectedSpecification, setSelectedSpecification] = useState("");

    useEffect(() =>
    {   
        const LoadProducts = async () =>
        {
            const products = await GetProducts(orderId);
            const productsFilters = await GetProductFilters(orderId);

            setTypes(productsFilters.types);
            setSpecifications(productsFilters.specifications);
            setProducts(products);
            setTypes(productsFilters.types);
            setSpecifications(productsFilters.specifications);
            setSelectedType("");
            setSelectedSpecification("");
        };

        LoadProducts();
    }, [orderId]);

    const filteredProducts = FilterProducts(products, selectedType, selectedSpecification);

    return (
        <section className="product-list">
            <div className="product-list__header">
                {t("productList.title")} / {filteredProducts.length}
                <div className="product-list__filters">
                    <label>
                        {t("productList.type")}:
                        <select value={selectedType} onChange={(event) => setSelectedType(event.target.value)}>
                            <option value="">{t("productList.all")}</option>
                            {types.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        {t("productList.specification")}:
                        <select 
                            value={selectedSpecification} 
                            onChange={(event) => setSelectedSpecification(event.target.value)}
                        >
                            <option value="">{t("productList.all")}</option>
                            {specifications.map(specification => (
                                <option key={specification} value={specification}>
                                    {specification}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            </div>
            <div className="product-list__scroll">
                <div className="product-list__table">
                    {filteredProducts.map((product) => (
                        <div className="product-row" key={product.id}>
                            <div className="product-row__status">●</div>
                            <div className="product-row__photo">
                                <img src={`http://localhost:5000${product.photo}`}/>
                            </div>
                            <div className="product-row__name">
                                <div>{product.title}</div>
                                <small>SN-{product.serialNumber}</small>
                            </div>
                                <div className="product-row__date">
                                    <small>
                                        <span>{t("productList.from")}&nbsp;&nbsp;</span>
                                        <strong>{FormatDate(product.guarantee.start)}</strong>
                                    </small>
                                    <small>
                                        <span>{t("productList.to")}&nbsp;&nbsp;</span>
                                        <strong>{FormatDate(product.guarantee.end)}</strong>
                                    </small>
                                </div>
                            <div className="product-row__new">
                                {product.isNew ? "новый" : "б/у"}
                            </div>
                            <div className="product-row__price">
                                {product.price.map((price) => (
                                    <div key={price.symbol}>
                                        {price.value} {price.symbol}
                                    </div>
                                ))}
                            </div>
                            <div className="product-row__specification">
                                {product.specification}
                            </div>
                            <div className="product-row__order">
                                {t("productList.order")}{product.order}
                            </div>
                            <div className="product-card__date">
                                <span className="product-card__date-small">
                                    {FormatSmallDate(product.guarantee.start)}
                                </span>     
                                <span className="product-card__date-big">
                                    {FormatBigDate(product.guarantee.end)}
                                </span>
                            </div>
                            <button className="order-card__delete">
                                <img src={del} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}