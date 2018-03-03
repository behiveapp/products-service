const express = require('express');
const {getSellers} = require('./endpoints/get-sellers');
const {getSeller} = require('./endpoints/get-seller');
const {createSeller} = require('./endpoints/create-seller');
const {updateSeller} = require('./endpoints/update-seller');
const {destroySeller} = require('./endpoints/destroy-seller');
const router = express.Router();

router.get('/', getSellers);
router.get('/:id', getSeller);
router.post('/', createSeller);
router.put('/:id', updateSeller);
router.delete('/:id', destroySeller);

module.exports = router;