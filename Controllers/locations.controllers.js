const mssql = require('mssql');

exports.func1 = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    //const queryStr = `SELECT * FROM LOCATION;`;
    const queryStr = `SELECT L.LOCATIONID, L.LOCATIONNAME, L.BRANCH_TYPE, L.LATITUDE, L.LONGITUDE, A.AREANAME, L.ROAD_NBR, L.BLOCK_NBR, L.BLDG_NBR, L.INSURANCE_POLICY_NBR, L.INSURANCE_EXPIRY_DATE, L.INSURED_AMOUNT, L.REMARKS, L.CONTACT_PERSON, L.CONTACT_NUMBER, L.NATURE_OF_STOCK, L.FIXTURE_AND_FITTINGS FROM LOCATION L, AREA A WHERE L.AREA = A.CODEN`;
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

exports.func2 = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `INSERT INTO LOCATION VALUES ('${req.params.locId}', '${req.params.locName}', '01', 'Y', '', 'true', 'A', '2014-01-01', 'A', '2014-01-01', '${req.params.locLat}', '${req.params.locLong}', '${req.params.locBrType}'); SELECT LOCATIONID, LOCATIONNAME, LATITUDE, LONGITUDE, BRANCH_TYPE FROM LOCATION;`;
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            if (recordset.recordset.toString() === '') {
                res.send('Oops!!! Required data not sent...');
            }
            else {
                // send records as a response
                res.send(recordset);
            }
        };
    });
};