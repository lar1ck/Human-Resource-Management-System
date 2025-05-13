const Post = require('../models/post.model');

exports.getAllPosts = (req, res) => {
  Post.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getPostById = (req, res) => {
  const id = req.params.id;
  Post.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Post not found' });
    res.json(results[0]);
  });
};

exports.createPost = (req, res) => {
  const newPost = req.body;
  Post.create(newPost, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Post created' });
  });
};

exports.updatePost = (req, res) => {
  const id = req.params.id;
  const updatedPost = req.body;
  Post.update(id, updatedPost, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Post updated' });
  });
};

exports.deletePost = (req, res) => {
  const id = req.params.id;
  Post.delete(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Post deleted' });
  });
};
