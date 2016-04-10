"use strict";
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const http = require('http');

const app = express();

/**
* Config Init
*/
global.app = require('./config/app');
let deployment = global.app.deployment;

/**
* Database init
*/
mongoose.connect(deployment.mongodb.url(), function(error) {
  if(error) throw error;
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Global variable
 */
app.use(function(req, res, next) {
  next();
});

/**
* Mount routes
*/
app.use('/api/v1/', require('./routes/index'));

module.exports = app;
