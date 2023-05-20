const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  removeProduct,
} = require('../controllers/products');

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', removeProduct);

module.exports = router;
