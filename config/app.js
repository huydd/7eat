var path = require('path');
var app = {
	deployment: {
		mongodb: {
			host: 'localhost',
			port: 27017,
			database: 'tplus',
			admin: 'admin',
			password: 'abc123!@#',
			url: function() {
				return ('mongodb://' + this.host + '/' + this.database);
			}
		}
	},

	// Excetion code
	EXC_SUCCESS: 0,
	EXC_NOT_FOUND: 1,
	EXC_AUTH: 2,
	EXC_SERVER: 3,
	EXC_INVALID: 4,
	EXC_UNKNOW: 5,
	EXC_CONFLICT: 6

	// Super secret
	SUPER_SECRET: 'tutorplus2016'
};
module.exports = app;