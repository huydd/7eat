'use strict';
const jwt = require('jsonwebtoken');

module.exports = {
	authToken: function(req, res, next) {
		let token = req.body.token || req.query.token || req.headers['x-access-token'];
	    if (token) {
	        jwt.verify(token, global.app.SUPER_SECRET, function(error, decoded) {
	            if (error) {
	                return res.status(401).json({
			            data: "",	            	    
			            status: false,
			            exception: global.app.EXC_AUTH,
			            exception_message: "Failed to authenticate token!"
			        })
	            } else {
	            	req.idUser = decoded._id;
	            	req.typeUser = decoded.account_type;
	                next();
	            }
	        })
	    } else {
	        return res.status(404).json({
	            data: "",	            	    
	            status: false,
	            exception: global.app.EXC_NOT_FOUND,
	            exception_message: "No token provider!"
	        })
	    }
	}
}