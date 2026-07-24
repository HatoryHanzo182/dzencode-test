import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
    id:
    {
        type: Number,
        required: true,
        unique: true,
    },
    serialNumber:
    {
        type: Number,
        required: true,
    },
    isNew:
    {
        type: Number,
        required: true,
    },
    photo:
    {
        type: String,
        default: "",
    },
    title:
    {
        type: String,
        required: true,
    },
    type:
    {
        type: String,
        default: "",
    },
    specification:
    {
        type: String,
        default: "",
    },
    guarantee:
    {
        start:
        {
            type: String,
            default: "",
        },
        end:
        {
            type: String,
            default: "",
        },
    },
    price:
    [
        {
            value:
            {
                type: Number,
                required: true,
            },
            symbol:
            {
                type: String,
                required: true,
            },
            isDefault:
            {
                type: Number,
                default: 0,
            },
        }
    ],
    order:
    {
        type: Number,
        required: true,
    },
    date:
    {
        type: String,
        required: true,
    },
},
{
    versionKey: false,
    collection: "Products",
}
);

export default mongoose.model("Products", productSchema);