const Recruitment = require('../models/recruitment.model');

exports.getAllRecruitments = (req, res) => {
  Recruitment.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getRecruitmentById = (req, res) => {
  const id = req.params.id;
  Recruitment.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Recruitment not found' });
    res.json(results[0]);
  });
};

exports.createRecruitment = (req, res) => {
  const newRecruitment = req.body;
  Recruitment.create(newRecruitment, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Recruitment created' });
  });
};

exports.updateRecruitment = (req, res) => {
  const id = req.params.id;
  const updatedRecruitment = req.body;
  Recruitment.update(id, updatedRecruitment, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Recruitment updated' });
  });
};

exports.deleteRecruitment = (req, res) => {
  const id = req.params.id;
  Recruitment.delete(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Recruitment deleted' });
  });
};
