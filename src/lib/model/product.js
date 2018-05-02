const Record = require('./record');

class Product extends Record{
  static get schema(){
    return {
      code: {type: String, required: true},
      name: {type: String, required: true},
      seller_identifier: {type: String, required: true},
      categories: {type: [String], validate: [ value => { return value.length > 0}]},
      price: { type: Number, required: true },
      description: { type: String }
    }
  }
}

module.exports = Product;