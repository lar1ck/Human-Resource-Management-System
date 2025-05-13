const db = require('../config/db.config');

const Post = {
  getAll: (callback) => {
    db.query('SELECT * FROM post', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM post WHERE PostID = ?', [id], callback);
  },

  create: (post, callback) => {
    db.query(
      'INSERT INTO post (PostID, PostTitle) VALUES (?, ?)',
      [post.PostID, post.PostTitle],
      callback
    );
  },

  update: (id, post, callback) => {
    db.query(
      'UPDATE post SET PostTitle = ? WHERE PostID = ?',
      [post.PostTitle, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM post WHERE PostID = ?', [id], callback);
  }
};

module.exports = Post;
