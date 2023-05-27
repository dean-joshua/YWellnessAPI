const BlogPost = require('../models/blogpost');

// Get all blog posts
async function getAllBlogPosts(req, res) {
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

// Create a new blog post
async function createBlogPost(req, res) {
  try {
    const { title, creationDate, sections, comments } = req.body;

    const newBlogPost = new BlogPost({
      title,
      creationDate,
      sections,
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

// Update blog post by ID
async function updateBlogPost(req, res) {
  try {
    const blogPostId = req.params.id;
    const updatedBlogPost = {
      title: req.body.title,
      creationDate: req.body.creationDate,
      sections: req.body.sections,
      comments: req.body.comments,
    };

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
    res.status(500).json({ error: 'Error updating blog post' });
  }
}

// Delete blog post by ID
async function deleteBlogPost(req, res) {
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
