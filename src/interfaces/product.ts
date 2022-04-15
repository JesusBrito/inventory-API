interface Product {
    _id: number
    name: string,
    quantity: number,
    purchasePrice: number,
    salePrice?: number,
    date: Date,
    imageUrl: string,
  }