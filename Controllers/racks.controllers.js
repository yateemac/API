const mssql = require('mssql');

exports.getAllRacks = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM RACK`;
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

exports.getRack = (req, res) =>
{
     // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `SELECT * FROM RACK WHERE LOCID = '${req.params.locid}';`;
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
             if (recordset.recordset.toString() == '') {
                 res.send('Oops!!! RACKS from given LOCATIONID not found...');
             }
             else {
                 // Send records as response
                 res.send(recordset);
             }
         };
     });
};

exports.getShelf = (req, res) =>
{
     // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `SELECT * FROM SHELF WHERE LOCID = '${req.params.locid}' AND RACKID = '${req.params.rackid}' AND DUPLICATE = 'N';`;
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
             if (recordset.recordset.toString() == '') {
                 res.send('Oops!!! SHELFS from given RACK in LOCATIONID not found...');
             }
             else {
                 // Send records as response
                 res.send(recordset);
             }
         };
     });
};


exports.checkShelf = (req, res) =>
{
     // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `SELECT * FROM SHELF WHERE LOCID = '${req.params.locid}' AND RACKID = '${req.params.rackid}' AND SHELFID LIKE '${req.params.shelfid}%';`;
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
             if (recordset.recordset.toString() == '') {
                 res.send('Oops!!! SHELFS from given RACK in LOCATIONID not found...');
             }
             else {
                 // Send records as response
                 res.send(recordset);
             }
         };
     });
};

exports.postRack = (req, res) =>
{
     // Validate request
     console.log(`INSERTING NEW RACK`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `INSERT INTO RACK VALUES ('${req.body.locId}', '${req.body.rackId}', '${req.body.rackDesc}', ${req.body.rackRows}, ${req.body.rackColumns});`;
     request.query(queryStr, function (err, recordset) {
        console.log(queryStr);
        request.query(queryStr, function (err, recordset) {
            if (err) console.log(err)
            else {
               res.send("New Rack created successfully!");
            };
       });
    });
};

exports.postShelf = (req, res) =>
{
     // Validate request
     console.log(`INSERTING NEW SHELF`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `INSERT INTO SHELF VALUES ('${req.body.locId}', '${req.body.rackId}', '${req.body.shelfId}', '${req.body.itemCode}', '${req.body.itemDesc}', ${req.body.itemQty}, '${req.body.remarks}', '${req.body.barcode}', '${req.body.category}', '${req.body.unitdesc}', '${req.body.lastpurchasedate}', ${req.body.cost}, '${req.body.duplicate}');`;
     request.query(queryStr, function (err, recordset) {
        console.log(queryStr);
        request.query(queryStr, function (err, recordset) {
            if (err) console.log(err)
            else {
               res.send("New Shelf created successfully!");
            };
       });
    });
};

exports.deleteShelf = (req, res) => 
{
    // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `DELETE FROM SHELF WHERE LOCID = '${req.params.locid}' AND RACKID = '${req.params.rackid}' AND SHELFID = '${req.params.shelfid}'`;
     request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
           res.send("Item deleted successfully!");
        };
     });
}

exports.updateShelf = (req, res) =>
{
     // Validate request
     console.log(`UPDATING SHELF`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `UPDATE SHELF SET ITEMCODE = '${req.body.itemCode}', ITEMDESC = '${req.body.itemDesc}', ITEMQTY = ${req.body.itemQty}, REMARKS =  '${req.body.remarks}', CATEGORY = '${req.body.category}', ITEMUNITDESCRIPTION = '${req.body.unitdesc}', ITEM_LAST_PURCHASE_DATE = '${req.body.lastpurchasedate}', ITEMCOSTPRICE = ${req.body.cost} WHERE LOCID = '${req.body.locId}' AND RACKID = '${req.body.rackId}' AND SHELFID = '${req.body.shelfId}';`;
     request.query(queryStr, function (err, recordset) {
        console.log(queryStr);
        request.query(queryStr, function (err, recordset) {
            if (err) console.log(err)
            else {
               res.send("New items added successfully!");
            };
       });
    });
};

exports.checkProduct = (req, res) => 
{
    // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `SELECT * FROM VWPRODUCT WHERE PCODE = '${req.params.pcode}' AND YEAR = '${req.params.year}';`;
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
             if (recordset.recordset.toString() == '') {
                 res.send('Oops!!! SHELFS from given RACK in LOCATIONID not found...');
             }
             else {
                 // Send records as response
                 res.send(recordset);
             }
         };
     });
}

exports.getProducts = (req, res) => 
{
    // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `SELECT * FROM SHELF WHERE BARCODE = '${req.params.barcode}'`;
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
             if (recordset.recordset.toString() == '') {
                 res.send('Oops!!! SHELFS from given RACK in LOCATIONID not found...');
             }
             else {
                 // Send records as response
                 res.send(recordset);
             }
         };
     });
}


// get all product
exports.listProduct = (req, res) => 
{
    // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `SELECT * FROM VWPRODUCT WHERE YEAR = '${req.params.year}';`;
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
             if (recordset.recordset.toString() == '') {
                 res.send('Oops!!! List not found...');
             }
             else {
                 // Send records as response
                 res.send(recordset);
             }
         };
     });
}