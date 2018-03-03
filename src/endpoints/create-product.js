const Product = require('../lib/model/product');

const createProduct = async (req, res) => {
  const product = new Product(req.body);
  
  try{
    await product.save();
    res.json(product._document);
  } catch(err){
    const errStatusCode = err.status || 500;
    const errType = err.name || 'ErrorUnknown';

    res.status(errStatusCode);
    console.error(`${errType} - `, err);
    res.end();
  }

};

module.exports = {
  createProduct
}