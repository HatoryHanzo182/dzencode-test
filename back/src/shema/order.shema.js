import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
{
    id:
    {
        type: Number,
        required: true,
        unique: true,
    },
    title:
    {
        type: String,
        required: true,
    },
    description:
    {
        type: String,
        default: "",
    },
    date:
    {
        type: String,
        required: true,
    },
},
{
    versionKey: false,
    collection: "Orders",
}
);

export default mongoose.model("Orders", orderSchema);