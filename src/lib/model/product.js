const Record = require('./record');

class Product extends Record{
  static get schema(){
    return {
      code: {type: String, index: true},
      name: {type: String, index: true},
      seller_identifier: {type: String, index: true, required: true},
      categories: {type: [String], index: true, validate: [ value => { return value.length > 0}]}
    }
  }
}

module.exports = Product;