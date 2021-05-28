module.exports = (app) => {
    const employeecontroller = require('../Controllers/employee.controller');

    //2. GET ALL SALESMAN 
    app.get('/api/salesman', employeecontroller.getSalesmen);

    //2. GET ALL SALESMAN 
    app.get('/api/select/salesman/:code', employeecontroller.selectSalesmen);

    //3. POST NEW SALESMAN
    app.post('/api/salesman/new', employeecontroller.postSalesmen);

};