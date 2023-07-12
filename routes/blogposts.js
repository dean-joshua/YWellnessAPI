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

router.get('/', getAllBlogPosts);
router.get('/:id', getBlogPost);
router.post('/', createBlogPost);
router.put('/:id', updateBlogPost);
router.delete('/:id', deleteBlogPost);

module.exports = router;
