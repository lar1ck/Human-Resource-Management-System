const Staff = require('../models/staff.model');

exports.getAllStaff = (req, res) => {
  Staff.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getStaffById = (req, res) => {
  const id = req.params.id;
  Staff.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Staff not found' });
    res.json(results[0]);
  });
};

exports.createStaff = (req, res) => {
  const newStaff = req.body;
  Staff.create(newStaff, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Staff created' });
  });
};

exports.updateStaff = (req, res) => {
  const id = req.params.id;
  const updatedStaff = req.body;
  Staff.update(id, updatedStaff, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Staff updated' });
  });
};

exports.deleteStaff = (req, res) => {
  const id = req.params.id;
  Staff.delete(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Staff deleted' });
  });
};
