const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  addProduct,
} = require('../controllers/products');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
// router.put('/:id', );
// router.delete('/:id', );

module.exports = router;
