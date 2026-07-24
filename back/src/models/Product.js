export default class Product
{
    constructor(data)
    {
        this.id = data.id;
        this.serialNumber = data.serialNumber;
        this.isNew = data.isNew;
        this.photo = data.photo;
        this.title = data.title;
        this.type = data.type;
        this.specification = data.specification;
        this.guarantee = data.guarantee;
        this.price = data.price;
        this.order = data.order;
        this.date = data.date;
    }
}