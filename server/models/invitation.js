var mongoose = require('mongoose');

module.exports = mongoose.model('invitation', {
	invites: Array,
	email: String,
	valid: {type: Boolean, default: true},
	date: {type: Date, default: Date.now},
	count: {type: Number}
})
