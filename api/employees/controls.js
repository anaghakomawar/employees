const mongoose	        = require("mongoose");
const Employees             = require('./models.js');

// 1.  Find count and percentage of employees who failed in term 1, the passing score being 37
exports.count_percentage_failed_termOne = (req, res, next) => {
	Employees.aggregate([
                            {
                                $unwind :  "$results",
                            },
                            {
                                $match : { 
                                    "results.evaluation":"term1"
                                }
                            },
                            {
                                $project : {
                                    "Emp"         : "$results.score",
                                    "FailedEmp"   : { "$cond" : [{"$lt": ["$results.score" , 37]}, 1 , 0]}
                                }
                            },
                            {
                                $group : {
                                    "_id"                   : null,
                                    "totalEmp"              : { "$sum" : 1},
                                    "FailedEmp"             : { "$sum" : "$FailedEmp"},
                                }
                            },
                            {
                                $project : {
                                             "totalEmp"             : 1,
                                             "Failed_Emp_1Term"     : "$FailedEmp",
                                             // "Percentage_Failed"    : (("$FailedEmp"*100)/"$totalEmp")
                                        }
                            }
                        ])
		.exec()
		.then(data =>{
		  res.status(200).json({
                                 "totalEmp"             : data[0].totalEmp,
                                 "Failed_Emp_1Term"     : data[0].Failed_Emp_1Term,
                                 "Percentage_Failed"    : ((data[0].Failed_Emp_1Term*100)/data[0].totalEmp)
                                });	
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
    Employees.aggregate([
                            {
                                $unwind :  "$results",
                            },
                            {
                                $group : {
                                    "_id"           : {
                                                            "id"    : "$_id",
                                                            "name" : "$name"
                                                    },
                                    "totalScore"    : {"$sum":"$results.score"}
                                }
                            },
                            {
                                $match : {
                                    "totalScore"    : {"$lt":111}
                                }
                            },
                            {
                                $project : {
                                                "_id"           : "$_id.id",
                                                "name"          : "$_id.name",
                                                "totalScore"    : "$totalScore",
                                            }
                            }
                        ])
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
    Employees.aggregate([
                            {
                                $unwind :  "$results",
                            },
                            {
                                $match : { 
                                    "results.evaluation":"term1"
                                }
                            },
                            {
                                $group : {
                                                "_id"       : null,
                                                "Average"   : { "$avg" : "$results.score"}
                                        }
                            }
        ])
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
    Employees.aggregate([
                            {
                                $unwind :  "$results",
                            },
                            {
                                $group : {
                                            "_id"       : "$name",
                                            "average"   : { "$avg" : "$results.score"}
                                        }
                            }
                        ])
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
    Employees.aggregate([
                            {
                                $unwind :  "$results",
                            },
                            {
                                $match : {
                                            "results.score" : { "$lt" : 37}
                                        }
                            },
                            {
                                $group : {
                                    "_id"       : "$_id",
                                    "name"      : { "$first" : "$name"},
                                    "results"    : { "$push" : "$results"}
                                }
                            },
                            {
                                $project : {
                                                "_id"        : 1,
                                                "failedTerms" : { "$size" : "$results"}
                                            }
                            },
                            {
                                $match : {
                                            "failedTerms" : 3
                                        }
                            },
                            {
                                $count : "Failed_Emp_All_3_Terms"
                            }
                        ])
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
    Employees.aggregate([
                            {
                                $unwind :  "$results",
                            },
                            {
                                $match : {
                                            "results.score" : { "$lt" : 37}
                                        }
                            },
                            {
                                $group : {
                                    "_id"       : "$_id",
                                    "name"      : { "$first" : "$name"},
                                    "results"    : { "$push" : "$results"}
                                }
                            },
                            {
                                $project : {
                                                "_id"        : 1,
                                                "failedTerms" : { "$size" : "$results"}
                                            }
                            },
                            {
                                $match : {
                                            "failedTerms" : { "$gte" : 1}
                                        }
                            },
                            {
                                $count : "Failed_Emp_All_3_Terms"
                            }
                        ])
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
