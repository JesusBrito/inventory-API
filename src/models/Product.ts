import mongoose from "mongoose";
const Schema = mongoose.Schema;

let ProductSchema = new Schema<User>({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});


const ProductModel = mongoose.model<User>('Product', ProductSchema);
export default ProductModel;