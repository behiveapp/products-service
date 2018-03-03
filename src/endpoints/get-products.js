const Product = require('../lib/model/product');

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

module.exports = {
  getProducts
}