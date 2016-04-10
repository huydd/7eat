"use strict";
var mongoose = require('mongoose');  
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	avatar: String,
	avatarId: String,
	name: String,
	email: String,
	birthday: String,
	gender: Boolean,
	address: String,
	university: String,
	phone: String,
	job: String,
	password: String,
	cmnd: String,
	favorite: [{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
	}],
	rate: [{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		content: String,
		date: { type: Date, default: Date.now }
	}],
	achievement: String,
	lovequote: String,
	about: String,
	workingplace: String,
	uyearstarted: String,
	account_type: { type: String, default: "Student" },
	last_login_date: String,
	is_active: Boolean,
	token: String,
	created_date: { type: Date, default: Date.now },
	last_modified_date: { type: Date, default: Date.now }
}, {collection: 'users'});
var Model = mongoose.model('User', UserSchema);

class User {

	constructor(user) {
		Object.assign(this, user);
	}

	static getAll(callback) {
		return Model
			.where()
			.exec(callback)
	}

	create(callback) {
		return new Model(this)
            .save(callback);
	}

	static getOne(id, callback) {
		return Model
			.findOne({_id: id})
			.exec(callback)
	}

	static loginEmail(email, callback) {
		return Model
			.findOne({email: email}, {email: 1, password: 1})
			.select({
				_id: 1,
				email: 1,
				password: 1,
				account_type: 1,
				token: 1
			})
			.exec(callback)
	}


}

class Student extends User {

	static get accType() {
		return "student"
	};

	static getAll(callback) {
		return Model
			// .where({account_type: this.accType})
			.where({account_type: this.accType})
			.exec(callback)
	}
}

class Tutor extends User {

	static get accType() {
		return "tutor"
	};

	static getAll(callback) {
		return Model
			.where({account_type: this.accType})
			.exec(callback)
	}
}

module.exports = User;
module.exports.Student = Student;
module.exports.Tutor = Tutor;
