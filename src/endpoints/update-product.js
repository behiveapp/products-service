const Product = require('../lib/model/product');

const updateProduct = async (req, res) => {
  const {body: requestBody} = req;

  try{
    const product =  await Product.findOne({identifier: req.params.id});
    Object.keys(requestBody).forEach(field => {product[field] = requestBody[field]});
    product.save();

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
  updateProduct
}