const BlogPost = require('../models/blogpost');
const { body, param, validationResult } = require('express-validator');

// Get all blog posts
async function getAllBlogPosts(req, res) {
  // #swagger.tags= ['Blogs']
  try {
    const blogPosts = await BlogPost.find();
    res.status(200).json(blogPosts);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving blog posts', error: error.message });
  }
}

// Get blog post by ID
async function getBlogPost(req, res) {
  // #swagger.tags= ['Blogs']
  try {
    const blogPostId = req.params.id;
    const blogPost = await BlogPost.findById(blogPostId);
    if (!blogPost) {
      res.status(404).json({ message: 'Blog post not found' });
      return;
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving blog post', error: error.message });
  }
}

// Sanitization and validation for creating a new blog post
const createBlogPostValidationRules = [
  body('title').trim().escape(),
  body('creationDate').toDate(),
  body('content')
    .isArray()
    .customSanitizer((value) => {
      // Custom sanitization for content array
      return value.map((item) => item.trim().escape());
    }),
  body('comments')
    .isArray()
    .customSanitizer((value) => {
      // Custom sanitization for comments array
      return value.map((comment) => ({
        commentDate: comment.commentDate,
        commentBody: comment.commentBody.trim().escape(),
      }));
    }),
];

// Create a new blog post
async function createBlogPost(req, res) {
  // #swagger.tags= ['Blogs']
  try {
    // Validate and sanitize the request
    await Promise.all(
      createBlogPostValidationRules.map((rule) => rule.run(req))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, creationDate, content, comments } = req.body;

    const newBlogPost = new BlogPost({
      title,
      creationDate,
      content,
      comments,
    });

    const savedBlogPost = await newBlogPost.save();
    res.status(201).json(savedBlogPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating blog post', error: error.message });
  }
}

// Sanitization and validation for updating blog post
const updateBlogPostValidationRules = [
  param('id').trim().escape(),
  body('title').trim().escape(),
  body('creationDate').toDate(),
  body('content')
    .isArray()
    .customSanitizer((value) => {
      // Custom sanitization for content array
      return value.map((item) => item.trim().escape());
    }),
  body('comments')
    .isArray()
    .customSanitizer((value) => {
      // Custom sanitization for comments array
      return value.map((comment) => ({
        commentDate: comment.commentDate,
        commentBody: comment.commentBody.trim().escape(),
      }));
    }),
];

// Update blog post by ID
async function updateBlogPost(req, res) {
  // #swagger.tags= ['Blogs']
  try {
    // Validate and sanitize the request
    await Promise.all(
      updateBlogPostValidationRules.map((rule) => rule.run(req))
    );

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const blogPostId = req.params.id;
    const updatedBlogPost = {
      title: req.body.title,
      creationDate: req.body.creationDate,
      content: req.body.content,
      comments: req.body.comments,
    };

    // Additional validation for comments
    if (
      !Array.isArray(updatedBlogPost.comments) ||
      !updatedBlogPost.comments.every((comment) => typeof comment === 'object')
    ) {
      throw new Error('Comments must be an array of objects');
    }

    const blogPost = await BlogPost.findByIdAndUpdate(
      blogPostId,
      updatedBlogPost,
      { new: true }
    );

    if (!blogPost) {
      res.status(404).json({ error: 'Blog post not found' });
      return;
    }

    res.status(204).json(blogPost);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error updating blog post', message: error.message });
  }
}

// Delete blog post by ID
async function deleteBlogPost(req, res) {
  // #swagger.tags= ['Blogs']
  try {
    const blogPostId = req.params.id;
    const deletedBlogPost = await BlogPost.findByIdAndDelete(blogPostId);
    if (!deletedBlogPost) {
      res.status(404).json({ message: 'Blog post not found' });
      return;
    }
    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting blog post', error: error.message });
  }
}

module.exports = {
  getAllBlogPosts,
  getBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
