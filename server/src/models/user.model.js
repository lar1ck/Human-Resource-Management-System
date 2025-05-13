const db = require('../config/db.config');

const User = {
  getAll: (callback) => {
    const query = 'SELECT * FROM users';
    db.query(query, callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM users WHERE UserID = ?';
    db.query(query, [id], callback);
  },

  create: (user, callback) => {
    const query = 'INSERT INTO users (UserID, EmployeeID, Username, Password) VALUES (?, ?, ?, ?)';
    const values = [user.UserID, user.EmployeeID, user.Username, user.Password];
    db.query(query, values, callback);
  },

  update: (id, user, callback) => {
    const query = `
      UPDATE users 
      SET EmployeeID = ?, Username = ?, Password = ? 
      WHERE UserID = ?
    `;
    const values = [user.EmployeeID, user.Username, user.Password, id];
    db.query(query, values, callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM users WHERE UserID = ?';
    db.query(query, [id], callback);
  },
  getByUsername: (username, callback) => {
    const query = 'SELECT * FROM users WHERE Username = ?';
    db.query(query, [username], callback);
  }
};

module.exports = User;
