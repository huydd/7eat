'use strict';
const User = require('../../model/User');
const path = require('path');
const md5 = require('md5');

module.exports = {
	signup: function(req, res) {
		let user = new User(req.body.user);
		let p = new Promise(function (resolve, reject) {	      
	        User.loginEmail(user.email, function (error, doc) {
	            resolve(doc);	    
	        })
	    });
	    p.then(function (val) {
	        if (!val) {
	            user.password = md5(user.password);
	            user.create(function (error, doc) {
	            	if(error) {
	            		return res.status(500).json({
	            			data: "",
	            			status: false,
	            			exception: global.app.EXC_SERVER,
	            			exception_message: "Server error"
	            		})
	            	}
	            	if(!doc) {
	            		return res.status(400).json({
	            			data: "",
	            			status: false,
	            			exception: global.app.EXC_UNKNOW,
	            			exception_message: "Unknow error"
	            		})
	            	} else {
	            		return res.status(200).json({	
	            			data: "",      
	            			status: true,
	            			exception: global.app.EXC_SUCCESS,
	            			exception_message: "Success"
	            		})
	            	}	                
	            });
	        } else {
	            return res.status(409).json({
	            			data: "",
	            			status: false,
	            			exception: global.app.EXC_CONFLICT,
	            			exception_message: "Exists"
	            		})
	        }	  
	    })
	}
}