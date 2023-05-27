const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
  heading: String,
  paragraphs: [String],
});

const commentSchema = mongoose.Schema({
  commentDate: Date,
  commentBody: String,
});

const blogPostSchema = mongoose.Schema({
  title: String,
  creationDate: Date,
  sections: [sectionSchema],
  comments: [commentSchema],
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
