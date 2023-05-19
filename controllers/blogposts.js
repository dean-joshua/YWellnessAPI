const client = require('../db/connection.js');
const { ObjectId } = require('mongodb');

// READ all documents
async function getBlogposts(req, res) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('blogposts');
    const blogposts = await collection.find().toArray();
    res.status(200).send(blogposts);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving all blogposts');
  }
}

// READ One Document by Id
async function getBlogpost(req, res) {
  try {
    await client.connect();
    const db = client.db();
    const blogpostId = new ObjectId(req.params.id);
    const collection = db.collection('blogposts');
    const blogpost = await collection.findOne({ _id: blogpostId });
    if (!blogpost) {
      res.status(404).send('Blogpost not found');
      return;
    }
    res.json(blogpost);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving blogpost by Id');
  }
}

// Create a new document
async function addBlogpost(req, res) {
  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('blogposts');
    const newDocument = {
      //Create a new json object
      title: req.body.title,
      creationDate: req.body.creationDate,
      sections: req.body.sections,
      comments: req.body.comments,
    };
    const response = await collection.insertOne(newDocument); // insert the new object into the collection
    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json('Error creating a new blogpost');
  }
}

module.exports = {
  getBlogposts,
  getBlogpost,
  addBlogpost,
  // updateBlogpost,
  // removeBlogpost,
};
