const Product = require('../../src/lib/model/product');
const mongoose = require('mongoose');


const initializeProducts = () => {
  const data = [{
    full_name: 'Império das Grifes LTDA',
    short_name: 'Império das Grifes',
    identifier: '01001001000113'
  },
  {
    full_name: 'Computei Consultoria SA',
    short_name: 'Computei Consultoria',
    identifier: '02002002000226'
  }];

  return Promise.all(data.map(async (product) => {
    return new Product(product).save()
  }));
}


const clearProducts = async () => {
  return Product.collection.remove().exec();
}

const mockProducts = [{
  full_name: 'Império das Grifes LTDA',
  short_name: 'Império das Grifes',
  identifier: '01001001000113'
},
{
  full_name: 'Computei Consultoria SA',
  short_name: 'Computei Consultoria',
  identifier: '02002002000226'
}];

const connectMongo = () => {
  const {MONGO_URL = 'localhost:3001/products'} = process.env;
  mongoose.connect(MONGO_URL);
}

module.exports = {
  initializeProducts,
  clearProducts,
  mockProducts,
  connectMongo
}