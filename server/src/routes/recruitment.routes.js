const express = require('express');
const router = express.Router();
const recruitmentController = require('../controllers/recruitment.controller');

router.get('/', recruitmentController.getAllRecruitments);
router.get('/:id', recruitmentController.getRecruitmentById);
router.post('/create', recruitmentController.createRecruitment);
router.put('/update/:id', recruitmentController.updateRecruitment);
router.delete('/deletet/:id', recruitmentController.deleteRecruitment);

module.exports = router;
