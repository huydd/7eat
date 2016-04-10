'use strict';
const User = require('../../model/User');
const Student = User.Student;
const Tutor = User.Tutor;
const path = require('path');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

module.exports = {
	all: function(req, res) {
		if(req.query.accType) {
	        let accType = req.query.accType;
	        if(accType == 'student') {
	            Student.getAll(function(error, docs) {
	                res.json(docs);
	            });
	        } else if(accType == 'tutor') {
	            Tutor.getAll(function (error, docs) {
	                res.json(docs);
	            })
	        }
	    } else {
	        User.getAll(function (error, docs) {
	            res.json(docs);
	        })
	    }
	}
}