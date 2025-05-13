const db = require('../config/db.config');

const Recruitment = {
  getAll: (callback) => {
    db.query('SELECT * FROM recruitment', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM recruitment WHERE RecId = ?', [id], callback);
  },

  create: (recruitment, callback) => {
    db.query(
      'INSERT INTO recruitment (RecId, HireDate, Salary, Status, EmployeeID) VALUES (?, ?, ?, ?, ?)',
      [
        recruitment.RecId,
        recruitment.HireDate,
        recruitment.Salary,
        recruitment.Status,
        recruitment.EmployeeID
      ],
      callback
    );
  },

  update: (id, recruitment, callback) => {
    db.query(
      'UPDATE recruitment SET HireDate = ?, Salary = ?, Status = ?, EmployeeID = ? WHERE RecId = ?',
      [
        recruitment.HireDate,
        recruitment.Salary,
        recruitment.Status,
        recruitment.EmployeeID,
        id
      ],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM recruitment WHERE RecId = ?', [id], callback);
  }
};

module.exports = Recruitment;
