const Product = require('../../src/lib/model/product');
const mongoose = require('mongoose');


const initializeProducts = () => {
  const data = [{
    code: 'PROD01',
    name: 'Product 1',
    seller_identifier: '01001001000113'
  },
  {
    code: 'PROD02',
    name: 'Product 2',
    seller_identifier: '02002002000226'
  },
  {
    code: 'PROD03',
    name: 'Product 3',
    seller_identifier: '02002002000226'
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