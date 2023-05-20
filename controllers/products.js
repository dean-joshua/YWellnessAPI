const client = require('../db/connection.js');
const { ObjectId } = require('mongodb');

// READ all documents
async function getProducts(req, res) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('products');
    const products = await collection.find().toArray();
    res.status(200).send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving all products');
  }
}

// READ One Document by Id
async function getProduct(req, res) {
  try {
    await client.connect();
    const db = client.db();
    const productId = new ObjectId(req.params.id);
    const collection = db.collection('products');
    const product = await collection.findOne({ _id: productId });
    if (!product) {
      res.status(404).send('Product not found');
      return;
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving product by Id');
  }
}

// Create a new document
async function addProduct(req, res) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('products');
    const newDocument = {
      //Create a new json object
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productCost: req.body.productCost,
      productTier: req.body.productTier,
    };
    const response = await collection.insertOne(newDocument); // insert the new object into the collection
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json('Error creating a new product');
  }
}

// UPDATE an existing document
async function updateProduct(req, res) {
  try {
    await client.connect();
    const db = client.db();
    const productId = new ObjectId(req.params.id);
    const collection = db.collection('products');
    const newDocument = {
      //Create a new json object
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productCost: req.body.productCost,
      productTier: req.body.productTier,
    };
    const response = await collection.replaceOne(
      { _id: productId },
      newDocument
    );
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      throw new Error('Document was not able to be updated');
    }
  } catch (err) {
    console.error(err);
    res.status(500).json('Error updating a product');
  }
}

// DELETE an existing document
async function removeProduct(req, res) {
  try {
    await client.connect();
    const db = client.db();
    const productId = new ObjectId(req.params.id);
    const collection = db.collection('products');
    const response = await collection.deleteOne({ _id: productId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      throw new Error('Document was not able to be deleted');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting product');
  }
}

module.exports = {
  getProducts,
  getProduct,
  addProduct,
  updateProduct,
  removeProduct,
};
