const Seller = require('../lib/model/seller');

const updateSeller = async (req, res) => {
  const {body: requestBody} = req;

  try{
    const seller =  await Seller.findOne({identifier: req.params.id});
    Object.keys(requestBody).forEach(field => {seller[field] = requestBody[field]});
    seller.save();

    res.json(seller);
  }catch(err){
    const errStatusCode = err.status || 500;
    const errType = err.name || 'ErrorUnknown';

    res.status(errStatusCode);
    console.error(`${errType} - `, err);
    res.end();
  }

};

module.exports = {
  updateSeller
}