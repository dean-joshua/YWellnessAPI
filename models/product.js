const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: String,
  productDescription: String,
  productCost: String,
  productTier: String,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
