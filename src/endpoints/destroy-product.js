const Product = require('../lib/model/product');

const destroyProduct = async (req, res) => {
  const {body: requestBody} = req;

  try{
    const product =  await Product.findOne({code: req.params.id});
    product.remove();

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
  destroyProduct
}