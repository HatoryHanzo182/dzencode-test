import Order from "../shema/order.shema.js";
import Product from "../shema/product.shema.js";

export default new class OrderService
{
    async GetAll()
    {
        const orders = await Order.find({}).lean();

        return orders;
    }

    async GetById(id)
    {
        return Order.findOne({ id: Number(id) },
        {
            _id: 0,
            id: 1,
            title: 1,
            date: 1,
            description: 1,
        }).lean();
    }

    async GetProductsByOrderId(orderId)
    {
        return Product.find({ order: Number(orderId) }).lean();
    }

    async GetSummary(orderId)
    {
        const orderProducts = await Product.find({ order: Number(orderId) }).lean();

        const usd = orderProducts.reduce(
            (total, product) =>
                total +
                (
                    product.price.find(price => price.symbol === "USD")?.value ?? 0
                ),
            0
        );
        const uah = orderProducts.reduce(
            (total, product) =>
                total +
                (
                    product.price.find(price => price.symbol === "UAH")?.value ?? 0
                ),
            0
        );

        return {
            productsCount: orderProducts.length,
            prices: { USD: usd, UAH: uah }
        };
    }

    async GetProducts(orderId)
    {
        return Product.find({ order: Number(orderId) }).lean();
    }
};