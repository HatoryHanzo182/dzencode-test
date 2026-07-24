export default class Order
{
    constructor(data)
    {
        this.id = data.id;
        this.title = data.title;
        this.description = data.description;
        this.date = data.date;
    }
}