import ProductModel from "../models/Product";
import {Request, Response} from 'express';
import { uploadCloudinaryImage } from "../services/cloudinary";

export async function createProduct(req: Request, res: Response) {
  try {
    let product = await ProductModel.create(req.body);
    const date = new Date();
    product.date = date
    const productStored = await product.save();
    res.status(200).send({ product: productStored });
  } catch (error) {
    console.log("🚀 ~ file: products.ts ~ line 10 ~ createProduct ~ error", error)
    return res.status(500).send({ message: error });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const query = req.query;
    let id = query.id
    const productStored = await ProductModel.findByIdAndUpdate(id, req.body);
    if(productStored){
      let product = await ProductModel.findById(id);
      res.status(200).send({ product: product });
    }else{
      res.status(404).send({ message: "El producto no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ file: products.ts ~ line 27 ~ updateProduct ~ error", error)
    return res.status(500).send({ message: error });
  }
}

export async function updateProductImage(req: Request, res: Response) {
  try {
    const query = req.query;
    let id = query.id
    let product = await ProductModel.findById(id);
    console.log("🚀 ~ file: products.ts ~ line 39 ~ updateProductImage ~ req.file", req)
    if(product){
      const imageUploadResult = await uploadCloudinaryImage(req.file!.path)
      product!.imageUrl = imageUploadResult!.url
      product?.save()
      res.status(200).send({ product: product });
    }else{
      res.status(404).send({ message: "El producto no existe" });
    }

  } catch (error) {
    console.log("🚀 ~ file: products.ts ~ line 27 ~ updateProduct ~ error", error)
    return res.status(500).send({ message: error });
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    let products = await ProductModel.find();
    res.status(200).send({ products: products });
  } catch (error) {
    console.log("🚀 ~ file: products.ts ~ line 9 ~ getProducts ~ error", error)
    return res.status(500).send({ message: error });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const query = req.query;
    let id = query.id
    let responseDeleted = await ProductModel.deleteOne({ _id: id });
    console.log("🚀 ~ file: products.ts ~ line 60 ~ deleteProduct ~ responseDeleted", responseDeleted)
    if(responseDeleted.deletedCount>0){
      return res.status(200).send({ message: "Se eliminó el producto" });
    }else{
      return res.status(404).send({ message: "El producto no existe" });
    }
  } catch (error) {
    console.log("🚀 ~ file: products.ts ~ line 9 ~ getProducts ~ error", error)
    return res.status(500).send({ message: error,  });
  }
}