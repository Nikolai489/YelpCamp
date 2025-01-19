const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user')
const users = require('../controllers/users');
const passport = require('passport');
const { storeReturnto } = require('../middleware');

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(storeReturnto, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login);

router.post('/logout', users.logout);

module.exports = router;