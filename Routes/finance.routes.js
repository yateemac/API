module.exports = (app) => {
    const financeController = require('../Controllers/finance.controllers');

    //1. GET CHART OF ACCCOUNTS 
    app.get('/api/coa/getcoa/:fyear', financeController.getCoa);

    //2. GET MAIN GROUPS
    app.get('/api/coa/getmaingrp/:fyear', financeController.getmaingrp);

    //1. GET SUB GROUPS
    app.get('/api/coa/getsubgrp/:maingrp/:fyear', financeController.getsubgrp);

    //1. GET GL
    app.get('/api/coa/getgl/:subgrp/:fyear', financeController.getglcode);

    //1. GET PCODE
    app.get('/api/coa/getpcode/:glcode/:fyear', financeController.getpcode);
    //45. POST GLCODE
    app.post('/api/coa/postgl', financeController.postGlcode)
   //45. GET Account
    app.get('/api/coa/getAcc/:pcode/:fyear', financeController.getAccountCode);
 //46. GET customerAccount
    app.get('/api/coa/getCustomerAcc/:fyear', financeController.getCustomerAcc);
    //47. GET getCustomerOpeningDetails
    app.get('/api/coa/getCustomerOpening/:pcode/:sfyear/:efyear', financeController.getCustomerOpeningDetails);


    //48. GET SuppliercustomerAccount
    app.get('/api/coa/getSupplierAcc/:fyear', financeController.getSupplierAcc);
    //49. GET customerAccount
    app.get('/api/coa/getSubLedgerAcc/:fyear', financeController.getSubLedgerAcc);
     //50. GET Partywisecustomer
     app.get('/api/coa/getPartyCustomer/:pcode', financeController.getPartyCustomer);

    //51. GET Accounts Category
    app.get('/api/coa/getAccountsCategory', financeController.getAccountsCategory);

    //52. GET Accounts Type
    app.get('/api/coa/getAccountsType', financeController.getAccountsType);

};

