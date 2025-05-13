const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staff.controller');

router.get('/', staffController.getAllStaff);
router.get('/:id', staffController.getStaffById);
router.post('/create', staffController.createStaff);
router.put('/update/:id', staffController.updateStaff);
router.delete('/delete/:id', staffController.deleteStaff);

module.exports = router;
