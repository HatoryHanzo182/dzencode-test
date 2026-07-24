import Product from "../shema/product.shema.js";

export default new class ProductService
{
    async GetByOrder(orderId)
    {
        return Product.find({ order: Number(orderId) }).lean();
    }

    async GetFiltersByOrder(orderId)
    {
        const orderProducts = await this.GetByOrder(orderId);
        const types = [...new Set(orderProducts.map(product => product.type).filter(Boolean))];
        const specifications = [...new Set(orderProducts.map(product => product.specification).filter(Boolean))];

        return { types, specifications };
    }
};