const Record = require('./record');

class Product extends Record{
  static get schema(){
    return {
      code: String,
      name: String,
      seller_identifier: {type: String, required: true}
    }
  }
}

module.exports = Product;