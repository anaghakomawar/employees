const mongoose = require('mongoose');

const employeesSchema = mongoose.Schema({
	_id			: mongoose.Schema.Types.ObjectId,
    name		: String,
	results 	: {
						"evaluation"  	: String,
						"score"			: String,
						"score"			: Number,
					},
	
});

module.exports = mongoose.model('employees',employeesSchema);