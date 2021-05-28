const mssql = require('mssql');

exports.getSalesmen = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM SALESMAN;`;
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

exports.selectSalesmen = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM SALESMAN WHERE SALESMAN_CD = '${req.params.code}';`;
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


exports.postSalesmen = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `INSERT INTO SALESMAN (COMP_CODE, SALESMAN_CD, NAME, ADD1, ADD2, ADD3, MOBILE, EMAIL_ID, ACTIVE) VALUES (1, '${req.body.code}','${req.body.name}','${req.body.add1}','${req.body.add2}','${req.body.add3}','${req.body.mobile}','${req.body.email}',1);`;
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






/*

SELECT * FROM SALESMAN;


*/