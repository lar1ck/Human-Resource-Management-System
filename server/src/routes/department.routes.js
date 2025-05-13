const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department.controller');

router.get('/', departmentController.getAllDepartments);
router.get('/:id', departmentController.getDepartmentById);
router.post('/create', departmentController.createDepartment);
router.put('/update/:id', departmentController.updateDepartment);
router.delete('/delete/:id', departmentController.deleteDepartment);

module.exports = router;
