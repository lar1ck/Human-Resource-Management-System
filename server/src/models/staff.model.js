const db = require('../config/db.config');

const Staff = {
  getAll: (callback) => {
    db.query('SELECT * FROM staff', callback);
  },

  getById: (id, callback) => {
    db.query('SELECT * FROM staff WHERE EmployeeID = ?', [id], callback);
  },

  create: (staff, callback) => {
    const {
      EmployeeID,
      PostID,
      FirstName,
      LastName,
      Gender,
      DOB,
      Email,
      Phone,
      Address,
      DepID
    } = staff;

    db.query(
      `INSERT INTO staff 
      (EmployeeID, PostID, FirstName, LastName, Gender, DOB, Email, Phone, Address, DepID) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [EmployeeID, PostID, FirstName, LastName, Gender, DOB, Email, Phone, Address, DepID],
      callback
    );
  },

  update: (id, staff, callback) => {
    const {
      PostID,
      FirstName,
      LastName,
      Gender,
      DOB,
      Email,
      Phone,
      Address,
      DepID
    } = staff;

    db.query(
      `UPDATE staff SET 
      PostID = ?, FirstName = ?, LastName = ?, Gender = ?, DOB = ?, 
      Email = ?, Phone = ?, Address = ?, DepID = ? 
      WHERE EmployeeID = ?`,
      [PostID, FirstName, LastName, Gender, DOB, Email, Phone, Address, DepID, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query('DELETE FROM staff WHERE EmployeeID = ?', [id], callback);
  }
};

module.exports = Staff;
