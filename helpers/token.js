'use strict';
const jwt = require('jsonwebtoken');

module.exports = {
	create: function(user) {
		let token = jwt.sign({id: user._id, type: user.account_type}, global.app.SUPER_SECRET, {
	        expiresInMinutes: 24 * 60 * 30
	    });
	    return token;
	}
}