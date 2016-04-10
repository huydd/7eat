"use strict";
var express = require('express');
var router = express.Router();
var User = require('../model/User');
var jwt = require('jsonwebtoken');
var md5 = require('md5');
const user = require('../controller/users/index');
const auth = require('../controller/middlewares/index');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/signup', user.register.signup);
router.post('/login', user.login.login);

router.use(auth.authToken);

router.get('/users', user.list.all);
router.get('/users/:id', user.user.getUser)

module.exports = router;
