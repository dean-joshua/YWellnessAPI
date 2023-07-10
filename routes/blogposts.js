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
const { requiresAuth } = require('express-openid-connect');

router.get('/', getAllBlogPosts);
router.get('/:id', getBlogPost);
router.post('/', requiresAuth(), createBlogPost);
router.put('/:id', requiresAuth(), updateBlogPost);
router.delete('/:id', requiresAuth(), deleteBlogPost);

module.exports = router;
