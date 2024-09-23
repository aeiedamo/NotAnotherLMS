const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');
const router = express.Router();

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send({ message: 'Unauthorized' });
};

router.get('/profile', ensureAuthenticated, userController.getProfile);

router.put('/profile', ensureAuthenticated, userController.updateProfile);

module.exports = router;
