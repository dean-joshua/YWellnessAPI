// const client = require('../db/connection.js');
// const { ObjectId } = require('mongodb');

// // READ all documents
// async function getSiteData(req, res) {
//   try {
//     await client.connect();
//     const db = client.db();
//     const collection = db.collection('siteData');
//     const siteData = await collection.find().toArray();
//     res.status(200).send(siteData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving all siteData');
//   }
// }

// // READ One Document by Id
// async function getPageData(req, res) {
//   try {
//     await client.connect();
//     const db = client.db();
//     const pageId = new ObjectId(req.params.id);
//     const collection = db.collection('siteData');
//     const pageData = await collection.findOne({ _id: pageId });
//     if (!pageData) {
//       res.status(404).send('Page data not found');
//       return;
//     }
//     res.json(pageData);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error retrieving page data by Id');
//   }
// }

// // Create a new document
// async function addPageData(req, res) {
//   try {
//     await client.connect();
//     const db = client.db();
//     const collection = db.collection('siteData');
//     const newDocument = {
//       //Create a new json object
//       pageName: req.body.pageName,
//       pageDescription: req.body.pageDescription,
//       content: req.body.content,
//     };
//     const response = await collection.insertOne(newDocument); // insert the new object into the collection
//     res.status(201).json(response);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json('Error creating new Page Data');
//   }
// }

// module.exports = {
//   getSiteData,
//   getPageData,
//   addPageData,
//   // updatePageData,
//   // removePageData,
// };
