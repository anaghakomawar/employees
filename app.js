const express = require ('express');
const app = express();
const morgan = require('morgan');// morgan call next function if problem occure
const bodyParser = require('body-parser');// this package use to formate json data 
const mongoose = require ('mongoose');
// const {MongoClient} = require('mongodb');
var globalVariable = require('./nodemon.js');


const empRoutes 				= require('./api/employees/routes.js');

mongoose.connect('mongodb://localhost/'+globalVariable.dbname,{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
mongoose.promise =global.Promise;

// process.env.MANGO_ATLAS_PW envirnmaent variable name
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));// urlencode true and false simple-body url data
app.use(bodyParser.json());// it show json data in good manner

app.use((req, res, next) =>{
	res.header("Access-Control-Allow-origin","*"); // use API from anywhere insted of * we use domain
	res.header("Access-Control-Allow-Headers","Origin, X-requested-With, Content-Type, Accept, Authorization");

	if (req.method === 'OPTIONS') {
		req.header('Access-Control-Allow_Methods','PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

/*

        Call the URL for Routes

*/
app.use("/employee", empRoutes);
// handle all other request which not found 
app.use((req, res, next) => {
	const error = new Error('Not Found Manual ERROR');
	error.status = 404;
	next(error);
		// when we get 404 error it send to next 
});

// it will handel all error in the application
app.use((error, req, res, next) => {
	// 500 type error is used when we use database
	res.status(error.status || 500);
	res.json({
		error:{
			message:error.message
		}
	})
});

module.exports = app;
