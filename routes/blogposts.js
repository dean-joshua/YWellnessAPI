const express = require('express');
const router = express.Router();
const {
  getBlogposts,
  getBlogpost,
  addBlogpost,
  updateBlogpost,
  removeBlogpost,
} = require('../controllers/blogposts');

router.get('/', getBlogposts);
router.get('/:id', getBlogpost);
router.post('/', addBlogpost);
router.put('/:id', updateBlogpost);
router.delete('/:id', removeBlogpost);

module.exports = router;
