import express from 'express'
import {getProducts, createProduct, deleteProduct, updateProduct, updateProductImage} from '../controllers/products'
import { ensureAuth } from '../middlewares/authenticated';

const api = express.Router();

api.get('/products', ensureAuth, getProducts);
api.delete('/products', ensureAuth, deleteProduct);
api.post('/products', ensureAuth, createProduct);
api.put('/products', ensureAuth, updateProduct)
api.put('/products/image', ensureAuth, updateProductImage)

export default api