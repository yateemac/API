module.exports = (app) => {
    const cmplntsController = require('../Controllers/complaints.controllers.js');

    //1. GET REQUEST
    app.get('/api/complaints/:date',  cmplntsController.func1);

    //2. GET CALLER DETAILS
    app.get('/api/complaints/caller/:number', cmplntsController.func2);

};