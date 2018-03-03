const Seller = require('../lib/model/seller');

const createSeller = async (req, res) => {
  const seller = new Seller(req.body);
  
  try{
    await seller.save();
    res.json(seller._document);
  } catch(err){
    const errStatusCode = err.status || 500;
    const errType = err.name || 'ErrorUnknown';

    res.status(errStatusCode);
    console.error(`${errType} - `, err);
    res.end();
  }

};

module.exports = {
  createSeller
}