import ProductService from "../services/ProductService.js";

export default new class ProductController
{
    async GetProducts(req, res)
    {
        const orderId = req.query.order;

        const products = await ProductService.GetByOrder(orderId);

        res.json(products);
    }

    async GetProductFilters(req, res)
    {
        const orderId = req.query.order;

        const filters = await ProductService.GetFiltersByOrder(orderId);

        res.json(filters);
    }
}