const db = require("../config/db.config");

const Department = {
  getAll: (callback) => {
    db.query("SELECT * FROM department", callback);
  },

  getById: (id, callback) => {
    db.query("SELECT * FROM department WHERE DepId = ?", [id], callback);
  },

  create: (department, callback) => {
    db.query(
      "INSERT INTO department (DepId, DepName) VALUES (?, ?)",
      [department.DepId, department.DepName],
      callback
    );
  },

  update: (id, department, callback) => {
    db.query(
      "UPDATE department SET DepName = ? WHERE DepId = ?",
      [department.DepName, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.query("DELETE FROM department WHERE DepId = ?", [id], callback);
  },
};

module.exports = Department;
