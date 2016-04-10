'use strict';
const User = require('../../model/User');
const Student = User.Student;
const Tutor = User.Tutor;
const path = require('path');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

module.exports = {
	getUser: function(req, res) {
		let id = req.params.id;
	    User.getOne(id, function (error, doc) {
	        res.json(doc);
	    })
	}
}