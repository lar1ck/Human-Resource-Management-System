const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.getAllUsers = (req, res) => {
  User.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

exports.getUserById = (req, res) => {
  const id = req.params.id;
  User.getById(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'User not found' });
    res.json(results[0]);
  });
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  User.create(newUser, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'User created', insertedId: results.insertId });
  });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  User.update(id, updatedUser, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User updated' });
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.delete(id, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'User deleted' });
  });
};

exports.signup = async (req, res) => {
    const { Username, Password, EmployeeID } = req.body;
  
    try {
      User.getByUsername(Username, async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) return res.status(400).json({ message: 'Username already taken' });
  
        const hashedPassword = await bcrypt.hash(Password, 10);
  
        const newUser = { Username, Password: hashedPassword, EmployeeID };
        User.create(newUser, (err, results) => {
          if (err) return res.status(500).json({ error: err.message });
          res.status(201).json({ message: 'User registered successfully' });
        });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  exports.login = (req, res) => {
    const { Username, Password } = req.body;
  
    User.getByUsername(Username, async (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length === 0) return res.status(401).json({ message: 'Invalid username or password' });
  
      const user = results[0];
      const isMatch = await bcrypt.compare(Password, user.Password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid username or password' });
  
      const token = jwt.sign(
        { userId: user.UserID, username: user.Username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.json({ message: 'Login successful', token });
    });
  };