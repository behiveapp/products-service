const Seller = require('../../src/lib/model/seller');
const mongoose = require('mongoose');


const initializeSellers = () => {
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

  return Promise.all(data.map(async (seller) => {
    return new Seller(seller).save()
  }));
}


const clearSellers = async () => {
  return Seller.collection.remove().exec();
}

const mockSellers = [{
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
  const {MONGO_URL = 'localhost:3001/sellers'} = process.env;
  mongoose.connect(MONGO_URL);
}

module.exports = {
  initializeSellers,
  clearSellers,
  mockSellers,
  connectMongo
}