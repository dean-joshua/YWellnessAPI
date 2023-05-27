const Product = require('../models/product');

// Get all products
async function getAllProducts(req, res) {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving products', error: error.message });
  }
}

// Get product by ID
async function getProduct(req, res) {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving product', error: error.message });
  }
}

// Create a new product
async function createProduct(req, res) {
  try {
    const { productName, productDescription, productCost, productTier } =
      req.body;

    const newProduct = new Product({
      productName,
      productDescription,
      productCost,
      productTier,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating product', error: error.message });
  }
}

// Update product by ID
async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const updatedProduct = {
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productCost: req.body.productCost,
      productTier: req.body.productTier,
    };

    const product = await Product.findByIdAndUpdate(productId, updatedProduct, {
      new: true,
    });

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
}

// Delete product by ID
async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting product', error: error.message });
  }
}

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
