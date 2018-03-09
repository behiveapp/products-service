const express = require('express');
const {getProducts} = require('./endpoints/get-products');
const {getProduct} = require('./endpoints/get-product');
const {createProduct} = require('./endpoints/create-product');
const {updateProduct} = require('./endpoints/update-product');
const {destroyProduct} = require('./endpoints/destroy-product');
const {fromSeller} = require('./endpoints/from-seller');
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', destroyProduct);
router.get('/from-seller/:id', fromSeller);

module.exports = router;