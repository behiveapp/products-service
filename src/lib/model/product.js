const Record = require('./record');

class Product extends Record{
  static get schema(){
    return {
      full_name: String,
      short_name: String,
      identifier: {type: String, required: true, unique: true}
    }
  }
}

module.exports = Product;