const Seller = require('../lib/model/seller');

const destroySeller = async (req, res) => {
  const {body: requestBody} = req;

  try{
    const seller =  await Seller.findOne({identifier: req.params.id});
    seller.remove();

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
  destroySeller
}