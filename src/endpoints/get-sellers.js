const Seller = require('../lib/model/seller');

const getSellers = async (req, res) => {
  const sellers = await Seller.find();
  res.json(sellers);
};

module.exports = {
  getSellers
}