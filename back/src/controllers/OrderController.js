import OrderService from "../services/OrderService.js";

export default new class OrderController
{
    async GetOrders(req, res)
    {
        const orders = await OrderService.GetAll();

        res.json(orders);
    }

    async GetOrder(req, res)
    {
        const order = await OrderService.GetById(req.params.id);

        res.json(order);
    }

    async GetOrderSummary(req, res)
    {
        const summary = await OrderService.GetSummary(req.params.id);

        res.json(summary);
    }

    async GetOrderProducts(req, res)
    {
        const products = await OrderService.GetProducts(req.params.id);

        res.json(products);
    }
};