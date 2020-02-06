const mongoose	        = require("mongoose");
const Employees             = require('models.js');

// 1.  Find count and percentage of employees who failed in term 1, the passing score being 37
exports.count_percentage_failed_termOne = (req, res, next) => {
	Employees.find({})
		.exec()
		.then(data =>{
		  res.status(200).json(data);	
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// 2.  Find employees who failed in aggregate (term1 + term2 + term3)
exports.list_failed_aggregate = (req, res, next) => {
    Employees.find({})
        .exec()
        .then(data =>{
          res.status(200).json(data);   
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// 3.  Find the Average score of trainees for term1
exports.average_score_trainees = (req, res, next) => {
    Employees.find({})
        .exec()
        .then(data =>{
          res.status(200).json(data);   
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// 4.  Find the Average score of trainees for aggregate (term1 + term2 + term3)     
exports.average_score_trainees_aggregate = (req, res, next) => {
    Employees.find({})
        .exec()
        .then(data =>{
          res.status(200).json(data);   
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
// 5.  Find number of employees who failed in all the three (term1 + term2 + term3)
exports.count_employee_failed_allterm = (req, res, next) => {
    Employees.find({})
        .exec()
        .then(data =>{
          res.status(200).json(data);   
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
// 6.  Find the number of employees who failed in any of the three (term1 + term2 + term3)
exports.count_employee_failed_anyterm = (req, res, next) => {
    Employees.find({})
        .exec()
        .then(data =>{
          res.status(200).json(data);   
        })
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
