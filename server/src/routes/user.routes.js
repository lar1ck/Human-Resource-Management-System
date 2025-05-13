const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);

module.exports = router;
