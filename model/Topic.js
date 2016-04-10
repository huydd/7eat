"use strict";
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TopicSchema = new Schema({
    title: String,
    descriptions: String,
    subject: String,
    detail_subject: String,
    location_posted: String,
    location_wanted: String,
    is_active: Boolean,
    salary_wanted: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        content: String,
        date: { type: Date, default: Date.now }
    }],
    care: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }],
    deadline_date: { type: Date, default: Date.now },
    created_date: { type: Date, default: Date.now },
    last_modified_date: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Topic', TopicSchema);