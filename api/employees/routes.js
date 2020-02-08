const express 	= require("express");
const router 	= express.Router();
const EmployeesController = require('./controls.js');

// 1.	Find count and percentage of employees who failed in term 1, the passing score being 37
router.get('/count_percentage_failed_termOne', EmployeesController.count_percentage_failed_termOne);
// 2.	Find employees who failed in aggregate (term1 + term2 + term3)
router.get('/list_failed_aggregate', EmployeesController.list_failed_aggregate);
//3.	Find the Average score of trainees for term1
router.get('/average_score_trainees', EmployeesController.average_score_trainees);
// 4.	Find the Average score of trainees for aggregate (term1 + term2 + term3)     
router.get('/average_score_trainees_aggregate', EmployeesController.average_score_trainees_aggregate);
// 5.	Find number of employees who failed in all the three (term1 + term2 + term3)
router.get('/count_employee_failed_allterm', EmployeesController.count_employee_failed_allterm);
// 6.	Find the number of employees who failed in any of the three (term1 + term2 + term3)
router.get('/count_employee_failed_anyterm', EmployeesController.count_employee_failed_anyterm);

module.exports = router;