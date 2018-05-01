const Product = require('../../src/lib/model/product');
const mongoose = require('mongoose');


const initializeProducts = () => {
  const data = [{
    code: 'PROD01',
    name: 'Product 1',
    seller_identifier: '01001001000113',
    categories: ['Category1', 'Category2'],
    price: 29.9,
    description: 'A brief description of the product',
  },
  {
    code: 'PROD02',
    name: 'Product 2',
    seller_identifier: '02002002000226',
    categories: ['Category1', 'Category2'],
    price: 9.99,
    description: 'A brief description of the product',
  },
  {
    code: 'PROD03',
    name: 'Product 3',
    seller_identifier: '02002002000226',
    categories: ['Category1', 'Category2'],
    price: 15.84,
    description: 'A brief description of the product',
  }];

  return Promise.all(data.map((product) => {
    return new Product(product).save()
  }));
}


const clearProducts = async () => {
  return await Product.collection.remove().exec();
}

const connectMongo = () => {
  const {MONGO_URL = 'localhost:3001/products'} = process.env;
  mongoose.connect(MONGO_URL);
}

module.exports = {
  initializeProducts,
  clearProducts,
  connectMongo
}