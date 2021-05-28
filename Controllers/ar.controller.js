const mssql = require('mssql');

exports.postParty = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `INSERT INTO PARTY (TYPE,NAME,ADD1,ADD2,ADD3,PHONE1,PHONE2,MOBILE,EMAIL_ID,FAX1,FAX2,REFNO,CONTACT,FLAT,BUILDING,STREET,BLOCK,CITY,POBOX,COUNTRY,PCODE,IS_PRIMARY,ACTIVE,CREATEUSER,CREATEDT) VALUES
     ('${req.body.type}','${req.body.name}','${req.body.add1}','${req.body.add2}','${req.body.add3}','${req.body.phone1}','${req.body.phone2}','${req.body.mobile}','${req.body.emailid}','${req.body.fax1}','${req.body.fax2}','${req.body.refno}','${req.body.contact}','${req.body.flatno}','${req.body.building}','${req.body.street}','${req.body.block}','${req.body.city}','${req.body.pobox}','${req.body.country}','${req.body.pcode}','${req.body.is_primary}','${req.body.active}','${req.body.createuser}''${req.body.createdt}')`;
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


exports.getParty = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT TYPE,NAME,ADD1,ADD2,ADD3,PHONE1,PHONE2,MOBILE,EMAIL_ID,FAX1,FAX2,REFNO,CONTACT,FLAT,BUILDING,STREET,BLOCK,CITY,POBOX,COUNTRY,PCODE,IS_PRIMARY,ACTIVE,CREATEUSER,CREATEDT FROM PARTY WHERE PARTY_ID = '${req.params.partyId}';`;
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


exports.getAllParty = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM PARTY WHERE TYPE='C' ORDER BY NAME;`;
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


	
	
	
