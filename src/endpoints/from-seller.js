const Product = require('../lib/model/product');

const fromSeller = async (req, res) => {
  try{
    const product = await Product.find({seller_identifier: req.params.id});
    res.json(product);
  }catch(err){
    console.log(err);
    const errStatusCode = err.status || 500;
    const errType = err.name || 'ErrorUnknown';

    res.status(errStatusCode);
    console.error(`${errType} - `, err);
    res.end();
  }


};

module.exports = {
  fromSeller
}