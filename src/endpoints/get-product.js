const Product = require('../lib/model/product');

const getProduct = async (req, res) => {
  try{
    const product = await Product.findOne({identifier: req.params.id});
    res.json(product);
  }catch(err){
    const errStatusCode = err.status || 500;
    const errType = err.name || 'ErrorUnknown';

    res.status(errStatusCode);
    console.error(`${errType} - `, err);
    res.end();
  }


};

module.exports = {
  getProduct
}