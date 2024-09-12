const express = require('express');
const { verifyToken, roleAuthorization } = require('../middleware/authRole');
const { createLecture, getLectures} = require('../controllers/LectureController.js');

const router = express.Router();

router.post('/create', verifyToken, roleAuthorization(['instructor']), createLecture);

router.get('/', verifyToken, roleAuthorization(['student', 'instructor', 'admin']), getLectures);

module.exports = router;
