const express = require('express');
const router = express.Router();
const {
  getAllBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogposts');
const dotenv = require('dotenv'); // Using dotenv to get our mongodb uri
dotenv.config();
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

router.get('/', getAllBlogPosts);
router.get('/:id', getBlogPost);
router.post('/', requiresAuth(), createBlogPost);
router.put('/:id', requiresAuth(), updateBlogPost);
router.delete('/:id', requiresAuth(), deleteBlogPost);

module.exports = router;
