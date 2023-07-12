const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  commentDate: Date,
  commentBody: String,
});

const blogPostSchema = mongoose.Schema({
  title: String,
  creationDate: Date,
  image: String,
  content: [String],
  comments: [commentSchema],
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
