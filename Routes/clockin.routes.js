module.exports = (app) => {
    const clockinController = require('../Controllers/clockin.controllers.js');

    //1. GET REQUEST
    app.get('/api/area',  clockinController.getArea);

    //2. GET ALL PREMISES 
    app.get('/api/premises', clockinController.getPremises);

    //2. GET ALL PREMISES 
    app.get('/api/select/premises/:premisesid', clockinController.selectPremises);

    //3. POST NEW PREMISES
    app.post('/api/premises/new', clockinController.postPremises);

    //3. POST NEW PREMISES
    app.post('/api/premises/edit', clockinController.editPremises);

    //2. SEARCH PREMISES 
    app.get('/api/search/premises/:search', clockinController.searchPremises);

    app.get('/api/list/emp', clockinController.getAllEmployees);

    //2. GET CALLER DETAILS
    app.get('/api/list/employees/:premisesid', clockinController.getEmployeeList);

    //2. GET CALLER DETAILS
    app.get('/api/list/premises/:empid', clockinController.getPremisesList);

    //2. GET CALLER DETAILS
    app.post('/api/assign/premises/employee', clockinController.assignEmployee);

    app.get('/api/unassign/:premisisid/:empid', clockinController.unassignEmployee);

    app.get('/api/search/employee/:empid', clockinController.searchEmployee);

    app.post('/api/employee/clockin', clockinController.empClockIn);

    app.post('/api/employee/clockout', clockinController.empClockOut);

    app.get('/api/employee/details/:empno', clockinController.empDetails);

    app.get('/api/employee/wagesheet/:badgenumber', clockinController.empWageSheet);

    app.get('/api/employee/shift', clockinController.empShiftMaster);

};