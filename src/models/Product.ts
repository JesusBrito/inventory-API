import mongoose from "mongoose";
const Schema = mongoose.Schema;

let ProductSchema = new Schema<Product>({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    salePrice: { type: Number, required: true },
    date: { type: Date, required: false },
    imageUrl: { type: String, required: false },
});


const ProductModel = mongoose.model<Product>('Product', ProductSchema);
export default ProductModel;