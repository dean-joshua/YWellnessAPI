const express = require('express');
const router = express.Router();
const {
  getBlogposts,
  getBlogpost,
  addBlogpost,
} = require('../controllers/blogposts');

router.get('/', getBlogposts);
router.get('/:id', getBlogpost);
router.post('/', addBlogpost);
// router.put('/:id', );
// router.delete('/:id', );

module.exports = router;
