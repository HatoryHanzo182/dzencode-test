import '@/components/group-list-product/GroupProductList.css';
import trash from '@/assets/delete.png';
import type { IProduct } from '@/types/IProduct';
import { useTranslation } from 'react-i18next';

interface GroupProductListProps 
{
    products: IProduct[];
}

export default function GroupProductList({ products }: GroupProductListProps)
{
    const { t } = useTranslation();

    return (
        <div className="product-list">
            {products.map(product => (
                <div className="product-item" key={product.id}>
                    <div className="product-item__status">
                        <span className="product-item__dot"></span>
                    </div>
                    <div className="product-item__icon">
                        <img src={`http://localhost:5000${product.photo}`}/>
                    </div>
                    <div className="product-item__info">
                        <span className="product-item__name">{product.title}</span>
                        <span className="product-item__serial">
                            SN-{product.serialNumber}
                        </span>
                    </div>
                    <div className="product-item__state">
                        <span className="product-item__state-free">{t("products.free")}</span>
                    </div>
                    <button className="product-item__delete">
                        <img src={trash}/>
                    </button>
                </div>
            ))}
        </div>
    );
}