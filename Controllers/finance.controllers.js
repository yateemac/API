const mssql = require('mssql');

exports.getCoa = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM VWCOA WHERE FYEAR = '${req.params.fyear}';`;
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            if (recordset.recordset.toString() === '') {
                res.send('Oops!!! Required data not found...');
            }
            else {
                // send records as a response
                res.send(recordset);
            }
        };
    });
};

exports.getmaingrp = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT DISTINCT MAINGRPCODE, MAINGRPNAME FROM VWCOA WHERE FYEAR = '${req.params.fyear}' AND MAINGRPCODE <> ' ' ORDER BY MAINGRPCODE;`;
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            if (recordset.recordset.toString() === '') {
                res.send('Oops!!! Required data not found...');
            }
            else {
                // send records as a response
                res.send(recordset);
            }
        };
    });
};

exports.getsubgrp = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT DISTINCT SUBGRPCODE, SUBGRPNAME FROM VWCOA WHERE MAINGRPCODE = '${req.params.maingrp}' AND FYEAR = '${req.params.fyear}' ORDER BY SUBGRPCODE;`;
    console.log(queryStr);
    console.log(req.params);
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            if (recordset.recordset.toString() === '') {
                res.send('Oops!!! Required data not found...');
            }
            else {
                // send records as a response
                res.send(recordset);
            }
        };
    });
};

exports.getglcode = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT DISTINCT GLCODE, GLNAME FROM VWCOA WHERE SUBGRPCODE = '${req.params.subgrp}' AND FYEAR = '${req.params.fyear}' ORDER BY GLCODE;`;
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            if (recordset.recordset.toString() === '') {
                res.send('Oops!!! Required data not found...');
            }
            else {
                // send records as a response
                res.send(recordset);
            }
        };
    });
};

exports.getpcode = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT PCODE, CUST_NAME FROM VWCOA WHERE GLCODE = '${req.params.glcode}' AND FYEAR = '${req.params.fyear}' ORDER BY PCODE;`;
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            if (recordset.recordset.toString() === '') {
                res.send('Oops!!! Required data not found...');
            }
            else {
                // send records as a response
                res.send(recordset);
            }
        };
    });
};


exports.getAccountCode = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM VWOPBAL WHERE PCODE = '${req.params.pcode}' AND FYEAR = '${req.params.fyear}';`;
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            if (recordset.recordset.toString() === '') {
                res.send('Oops!!! Required data not found...');
            }
            else {
                // send records as a response
                res.send(recordset);
            }
        };
    });
};


exports.getCustomerAcc = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM VWOPBAL WHERE FYEAR = '${req.params.fyear}' AND TYPE = 'C';`;
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            if (recordset.recordset.toString() === '') {
                res.send('Oops!!! Required data not found...');
            }
            else {
                // send records as a response
                res.send(recordset);
            }
        };
    });
};


exports.getSupplierAcc = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM VWOPBAL WHERE FYEAR = '${req.params.fyear}' AND TYPE = 'S';`;
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            if (recordset.recordset.toString() === '') {
                res.send('Oops!!! Required data not found...');
            }
            else {
                // send records as a response
                res.send(recordset);
            }
        };
    });
};


exports.getSubLedgerAcc = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM VWOPBAL WHERE FYEAR = '${req.params.fyear}' AND TYPE = 'G';`;
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            if (recordset.recordset.toString() === '') {
                res.send('Oops!!! Required data not found...');
            }
            else {
                // send records as a response
                res.send(recordset);
            }
        };
    });
};

exports.getCustomerOpeningDetails = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT CASE WHEN ISNULL(O.INV_NO,'')=ISNULL(O.REFNO,'') THEN '' ELSE ISNULL(O.INV_NO,'') END INV_NO,
    CASE WHEN ISNULL(O.INV_NO,'')=ISNULL(O.REFNO,'') THEN NULL ELSE INV_DATE END INV_DATE, 
    CASE WHEN ISNULL(O.INV_NO,'')=ISNULL(O.REFNO,'') THEN NULL ELSE INV_AMOUNT END INV_AMOUNT,
    ISNULL(O.REFNO,'') REFNO, O.REFDT, O.REFAMOUNT, ISNULL(O.DESCRIPTION,'') DESCRIPTION 
    FROM OUTSTANDING O WHERE O.CUST_CODE='${req.params.pcode}' AND (O.INV_DATE<'${req.params.sfyear}' OR O.REFDT<'${req.params.efyear}');`;
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            if (recordset.recordset.toString() === '') {
                res.send('Oops!!! Required data not found...');
            }
            else {
                // send records as a response
                res.send(recordset);
            }
        };
    });
};


// Customerwise Party Details
exports.getPartyCustomer = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM PARTY WHERE PCODE = '${req.params.pcode}'`;
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            if (recordset.recordset.toString() === '') {
                res.send('Oops!!! Required data not found...');
            }
            else {
                // send records as a response
                res.send(recordset);
            }
        };
    });
};


// get customer category Details
exports.getAccountsCategory = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT  * from ACCOUNT_CATEGORY`; 
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            if (recordset.recordset.toString() === '') {
                res.send('Oops!!! Required data not found...');
            }
            else {
                // send records as a response
                res.send(recordset);
            }
        };
    });
};

// get customer Type Details
exports.getAccountsType = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `select * from ACCOUNT_TYPE`; 
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            if (recordset.recordset.toString() === '') {
                res.send('Oops!!! Required data not found...');
            }
            else {
                // send records as a response
                res.send(recordset);
            }
        };
    });
};




exports.postGlcode = (req, res) =>
{
     // Validate request
     console.log(`INSERTING RECORD ${req.body}`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
          const queryStr = `INSERT INTO GLCODE (GLCODE,GLNAME,SUBGROUP,PL_BS,PL_BS_CODE,COMP_CODE,CREATEDUSER,CREATEDT) VALUES ('${req.body.glcode}', '${req.body.glname}', '${req.body.subgroup}', '${req.body.pl_bs}','${req.body.pl_bs_code}','${req.body.comp_code}','${req.body.createuser}','${req.body.createdt};`
     console.log(queryStr);
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
            res.send("New user created successfully!");
         };
    });
};