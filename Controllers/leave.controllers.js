const mssql = require('mssql');

exports.getAllLeaveTypes = (req, res) =>
{
     // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `SELECT  * from hrm.LEAVE_MASTER`;
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
             if (recordset.recordset.toString() == '') {
                 res.send('Oops!!! No data found...');
             }
             else {
                 // Send records as response
                 res.send(recordset);
             }
         };
    });
};

exports.getAllLeaveapplns = (req, res) =>
{
     // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `SELECT  * from hrm.LEAVE_APPLN`;
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
             if (recordset.recordset.toString() == '') {
                 res.send('Oops!!! No data found...');
             }
             else {
                 // Send records as response
                 res.send(recordset);
             }
         };
    });
};

exports.getLeaveappln = (req, res) =>
{
     // Validate request
     console.log(`Fetching RESPONSE`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
     const queryStr = `SELECT * from hrm.LEAVE_APPLN WHERE LEAVE_APPLN_NO = '${req.params.leaveappnbr}'`;
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
             if (recordset.recordset.toString() == '') {
                 res.send('Oops!!! No data found...');
             }
             else {
                 // Send records as response
                 res.send(recordset);
             }
         };
    });
};

/////////////////////////////////////////////////////////////////////////////////////////////////// Leave type + yyyy + mm + dd + empno == SL2021040103-001 

exports.postLeave = (req, res) =>
{
     // Validate request
     console.log(`INSERTING RECORD ${req.body}`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
const queryStr =`

INSERT INTO hrm.LEAVE_APPLN (LEAVE_APPLN_NO, EFF_FROM, EFF_UNTIL, LEAVE_CODE, STATUS_CD, EMPNO, USER_REMARKS, BACKUP_PLAN, APPLICABLE_DAYS,trans_id, COMP_CODE, CREATEUSER, CREATEDT, EDITUSER, EDITDT) VALUES ('${req.body.leaveappno}',Cast(convert(varchar,'${req.body.efffrom}',110)as datetime),Cast(convert(varchar,'${req.body.effuntil}',110)as datetime),'${req.body.leavecd}',0,'${req.body.empno},'${req.body.remarks}','${req.body.backupplan}',${req.body.applicabledays},0,'01',1,cast(convert(varchar,'${req.body.curdate}',110) as datetime), 1, cast(convert(varchar,${req.body.curdate}',110)as datetime));`;

console.log(queryStr);
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
            res.send("New user created successfully!");
         };
    });
};

exports.managerapproval = (req, res) =>
{
     // Validate request
     console.log(`INSERTING RECORD ${req.body}`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
const queryStr =`UPDATE LEAVE_APPLN SET MGR_ACTIONED_BY = '${req.body.managerid}', MGR_ACTIONED_ON = Cast(convert(varchar,'${req.body.approvaldate}',110)as datetime), MGR_REMARKS = '${req.body.managerRemarks}' WHERE LEAVE_APPLN_NO = '${req.body.leaveappno}'`;

console.log(queryStr);
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
            res.send("New user created successfully!");
         };
    });
};

exports.levelTwoapproval = (req, res) =>
{
     // Validate request
     console.log(`INSERTING RECORD ${req.body}`);
     // create Request object
     var request = new mssql.Request();
     // query to the database and get the records
const queryStr =`UPDATE LEAVE_APPLN SET L2_ACTIONED_BY= '${req.body.levelTwoManager}', L2_ACTIONED_ON = '${req.body.approvaldate}',110)as datetime), L2_REMARKS = '${req.body.levelTwoManagerRemarks}' WHERE LEAVE_APPLN_NO = '${req.body.leaveappno}'`;


console.log(queryStr);
     request.query(queryStr, function (err, recordset) {
         if (err) console.log(err)
         else {
            res.send("New user created successfully!");
         };
    });
};


   
