'use strict';
const User = require('../../model/User');
const path = require('path');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const tokenHelpers = require('../../helpers/token');

module.exports = {
	login: function(req, res) {
		let user = req.body.user;
	    User.loginEmail(user.email, function (error, doc) {
	        if (error) throw error;
	        if (!doc) {
	            return res.status(404).json({
	            		data: "",  
	            		status: false,
	            		exception: global.app.EXC_NOT_FOUND,
	            		exception_message: "Not exists"
	            	});
	        } else if (doc) {
	            if (doc.password != md5(user.password)) {
	                return res.status(400).json({
	            		data: "",  
	            		status: false,
	            		exception: global.app.EXC_INVALID,
	            		exception_message: "Password wrong"
	            	});
	            } else {
	                let p = new Promise(function (resolve, reject) {
                        let token = doc.token;
                        jwt.verify(token, global.app.SUPER_SECRET, function(err, decoded) {
                            if(!token || token === "" || !decoded) {
                                doc.token = tokenHelpers.create(doc);
                                doc.save(function () {
                                    resolve(doc.token)
                                })
                            } else {
                                resolve(token)
                            }
                        });
                    });
                    p.then(function (val) {
                        res.status(200).json({
                            data: {id: doc._id},  
	            			status: true,
	            			exception: global.app.EXC_SUCCESS,
	            			exception_message: "Login success",
                            token: val
                        });
                    });              	                
	            }
	        }
		});
	}
}
