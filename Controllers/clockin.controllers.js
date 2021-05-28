const mssql = require('mssql');

exports.getArea = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM AREA`;
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

exports.getPremises = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT PREMISISID, PREMISINAME, LATITUDE, LONGITUDE, AREA, ROAD_NBR, BLOCK_NBR, BLDG_NBR, FLAT_NBR FROM PREMISES;`;
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

exports.selectPremises = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT PREMISISID, PREMISINAME, LATITUDE, LONGITUDE, AREA, ROAD_NBR, BLOCK_NBR, BLDG_NBR, FLAT_NBR FROM PREMISES WHERE PREMISISID = '${req.params.premisesid}';`;
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


exports.postPremises = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `INSERT INTO PREMISES (PREMISISID, PREMISINAME, LATITUDE, LONGITUDE, AREA, ROAD_NBR, BLOCK_NBR, BLDG_NBR, FLAT_NBR) VALUES ('${req.body.premisesid}', '${req.body.premisesname}', '${req.body.latitude}', '${req.body.longitude}', '${req.body.areaname}', '${req.body.roadnbr}', '${req.body.blocknbr}', '${req.body.bldgnbr}', '${req.body.flatnbr}');`;
    request.query(queryStr, function (err, recordset) {
        console.log(queryStr);
        request.query(queryStr, function (err, recordset) {
            if (err) console.log(err)
            else {
               res.send("New Premises created successfully!");
            };
       });
    });
};

exports.editPremises = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `UPDATE PREMISES SET PREMISINAME = '${req.body.premisesname}', LATITUDE = '${req.body.latitude}', LONGITUDE = '${req.body.longitude}', AREA = '${req.body.areaname}', ROAD_NBR = '${req.body.roadnbr}', BLOCK_NBR = '${req.body.blocknbr}', BLDG_NBR = '${req.body.bldgnbr}', FLAT_NBR = '${req.body.flatnbr}' WHERE PREMISISID = '${req.body.premisesid}';`;
    request.query(queryStr, function (err, recordset) {
        console.log(queryStr);
        request.query(queryStr, function (err, recordset) {
            if (err) console.log(err)
            else {
               res.send("Premises edited successfully!");
            };
       });
    });
};

exports.searchPremises = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT PREMISISID, PREMISINAME, LATITUDE, LONGITUDE, AREA, ROAD_NBR, BLOCK_NBR, BLDG_NBR, FLAT_NBR FROM PREMISES WHERE PREMISISID LIKE '%${req.params.search}%' OR PREMISINAME LIKE '%${req.params.search}%' OR LATITUDE LIKE '%${req.params.search}%' OR LONGITUDE LIKE '%${req.params.search}%' OR AREA LIKE '%${req.params.search}%' OR ROAD_NBR LIKE '%${req.params.search}%' OR BLOCK_NBR LIKE '%${req.params.search}%' OR BLDG_NBR LIKE '%${req.params.search}%' OR FLAT_NBR LIKE '%${req.params.search}%';`;
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

exports.getAllEmployees = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM HRM.VWEMPLOYEE;`;
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

exports.getEmployeeList = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT A.EMPID, A.EMPNAME, B.DEPARTMENT_NAME, B.DESIGNATION_NAME, A.CONTACT_NUMBER, B.ATT_CARD_NO FROM EMPLOYEE_PREMISES_RELATIONS A, HRM.vwEmployee B WHERE A.EMPID = B.EMPNO AND A.PREMISISID = '${req.params.premisesid}';`;
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

exports.searchEmployee = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM HRM.VWEMPLOYEE WHERE EMPNO = '${req.params.empid}';`;
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

exports.unassignEmployee = (req, res) => {
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `DELETE FROM EMPLOYEE_PREMISES_RELATIONS WHERE PREMISISID = '${req.params.premisisid}' AND EMPID = '${req.params.empid}';`;
    request.query(queryStr, function (err, recordset) {
        console.log(queryStr);
        request.query(queryStr, function (err, recordset) {
            if (err) console.log(err)
            else {
               res.send("New Premises created successfully!");
            };
       });
    });
}

exports.getPremisesList = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM EMPLOYEE_PREMISES_RELATIONS WHERE EMPID = '${req.params.empid}';`;

    console.log(queryStr);
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

exports.assignEmployee = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `INSERT INTO EMPLOYEE_PREMISES_RELATIONS (PREMISISID, PREMISINAME, EMPID, EMPNAME, CONTACT_NUMBER) VALUES ('${req.body.premisesid}', '${req.body.premisesname}', '${req.body.empid}', '${req.body.empname}', '${req.body.contactnbr}');`;
    request.query(queryStr, function (err, recordset) {
        console.log(queryStr);
        request.query(queryStr, function (err, recordset) {
            if (err) console.log(err)
            else {
               res.send("New Premises created successfully!");
            };
       });
    });
};

exports.empClockIn = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `INSERT INTO USER_CHECKINOUT (USERID, NAME, CHECKTIME, BADGENUMBER, CTIME, CHECKTYPE, DEVICE_TYPE, PREMISISID, SHIFT_ID, CONTRACTOR_ID) VALUES ('${req.body.userid}', '${req.body.name}', '${req.body.checktime}', '${req.body.badgenumber}', '${req.body.ctime}', 'IN', 'M', '${req.body.premisisid}', '${req.body.shiftid}', '${req.body.contractorid}');`;
    request.query(queryStr, function (err, recordset) {
        console.log(queryStr);
        request.query(queryStr, function (err, recordset) {
            if (err) console.log(err)
            else {
               res.send(`${req.body.name} has been successfully clocked in`);
            };
       });
    });
};

exports.empClockOut = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `INSERT INTO USER_CHECKINOUT (USERID, NAME, CHECKTIME, BADGENUMBER, CTIME, CHECKTYPE, DEVICE_TYPE, PREMISISID, SHIFT_ID, CONTRACTOR_ID) VALUES ('${req.body.userid}', '${req.body.name}', '${req.body.checktime}', '${req.body.badgenumber}', '${req.body.ctime}', 'OUT', 'M', '${req.body.premisisid}', '${req.body.shiftid}', '${req.body.contractorid}');`;
    request.query(queryStr, function (err, recordset) {
        console.log(queryStr);
        request.query(queryStr, function (err, recordset) {
            if (err) console.log(err)
            else {
               res.send(`${req.body.name} has been successfully clocked out`);
            };
       });
    });
};

exports.empDetails = (req, res) => {
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT EMPNO, EMPNAME, FIRST_NAME, MIDDLE_NAME, LAST_NAME, DEPARTMENT_ID, DEPARTMENT_NAME, ATT_CARD_NO, CONTRACTOR_ID, CONTRACTOR_NAME, SHIFT_ID, SHIFT_DESC, SHIFT_START_TIME, SHIFT_END_TIME, SHIFT_NO FROM hrm.vwemployee WHERE EMPNO = '${req.params.empno}';`;
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
}

exports.empWageSheet = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM USERINFOCHECK WHERE BADGENUMBER = '${req.params.badgenumber}' ORDER BY CONTRACTOR_ID, CHECKTIME;`;
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

exports.empShiftMaster = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `select * FROM hrm.SHIFT_MASTER order by SHIFT_ID;`;
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