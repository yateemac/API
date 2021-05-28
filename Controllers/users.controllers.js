const mssql = require('mssql');

exports.getAllUsers = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM GDUSERS`;
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

exports.getUser = (req, res) =>
{
     // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `SELECT USERCODE, PASSWORD, FIRSTNAME, LASTNAME, USERCLASS, CONTACTNO, EMPNO FROM GDUSERS WHERE USERCODE = '${req.params.username}';`;
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
             if (recordset.recordset.toString() == '') {
                 res.send('Oops!!! Users with the given USERCODE not found...');
             }
             else {
                 // Send records as response
                 res.send(recordset);
             }
         };
    });
};

exports.getUserRoles = (req, res) =>
{
     // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `SELECT * FROM GDMODULE_ACCESS_CONTROL WHERE ROLE_ID = '${req.params.userClass}';`;
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
             if (recordset.recordset.toString() == '') {
                 res.send('Oops!!! Required data not found...');
             }
             else {
                 // Send records as response
                 res.send(recordset);
             }
         };
    });
};

exports.addNewUser = (req, res) =>
{
     // Validate request
     console.log(`INSERTING RECORD ${req.body}`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `INSERT INTO GDUSERS (USERCODE, PASSWORD, LANGUAGE, USERCLASS, FIRSTNAME, LASTNAME, CONTACTNO, USERID) VALUES ('${req.body.usercode}', '${req.body.password}', 'EN', '0', '${req.body.firstname}', '${req.body.lastname}', '${req.body.contactno}', 100);`;
     console.log(queryStr);
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
            res.send("New user created successfully!");
         };
    });
};