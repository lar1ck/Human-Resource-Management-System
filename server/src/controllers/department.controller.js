const Department = require('../models/department.model');

exports.getAllDepartments = (req, res) => {
  Department.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getDepartmentById = (req, res) => {
  const id = req.params.id;
  Department.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Department not found' });
    res.json(results[0]);
  });
};

exports.createDepartment = (req, res) => {
  const newDepartment = req.body;
  Department.create(newDepartment, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Department created' });
  });
};

exports.updateDepartment = (req, res) => {
  const id = req.params.id;
  const updatedDepartment = req.body;
  Department.update(id, updatedDepartment, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Department updated' });
  });
};

exports.deleteDepartment = (req, res) => {
  const id = req.params.id;
  Department.delete(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Department deleted' });
  });
};
