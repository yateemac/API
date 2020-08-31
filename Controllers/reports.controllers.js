const mssql = require('mssql');

exports.recAgeingRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT COMP_CODE, CUST_CODE, CUST_NAME, TYPE, ACCOUNT_CATEGORY_DESC, ACCOUNT_TYPE_DESC, BRANCH_NAME, ADD1, ADD2, ADD3, POBOX, PHONE1, PHONE2, FAX1, FAX2, EMAIL, CONTACT, CREDITPERIOD, CR_LIMIT, REMARKS, REPORT_END_DATE, 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) < 30 THEN A.INV_BALANCE ELSE 0 END) AS [M_30_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 30 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 59 THEN A.INV_BALANCE ELSE 0 END) AS [M_60_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 60 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 89 THEN A.INV_BALANCE ELSE 0 END) AS [M_90_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 90 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 119 THEN A.INV_BALANCE ELSE 0 END) AS [M_120_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 120 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 179 THEN A.INV_BALANCE ELSE 0 END) AS [M_180_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 180 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 364 THEN A.INV_BALANCE ELSE 0 END) AS [M_365_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 365 THEN A.INV_BALANCE ELSE 0 END) AS ABOVE_365_DAYS, SUM(INV_BALANCE) AS INV_BALANCE, SUM(UNALLOC_BALANCE) AS UNALLOC_BALANCE, SUM(INV_BALANCE - UNALLOC_BALANCE) AS NET_BALANCE

    FROM (SELECT COMP_CODE, CUST_CODE, CUST_NAME, TYPE, ACCOUNT_CATEGORY_DESC, ACCOUNT_TYPE_DESC, BRANCH_NAME, ADD1, ADD2, ADD3, POBOX, PHONE1, PHONE2, FAX1, FAX2, EMAIL, CONTACT, CREDITPERIOD, CR_LIMIT, REMARKS, INV_NO, INV_DATE, INV_AMOUNT AS AMOUNT, REFNO, REFDT, CASE WHEN A.TYPE = 'C' THEN A.AMOUNT ELSE A.REFAMOUNT END AS DEBIT, CASE WHEN A.TYPE = 'C' THEN A.REFAMOUNT ELSE A.AMOUNT END AS CREDIT, AMOUNT - REFAMOUNT AS BALANCE, CASE WHEN ISNULL(A.INV_NO, '') <> ISNULL(A.REFNO, '') THEN A.AMOUNT - A.REFAMOUNT ELSE 0 END AS INV_BALANCE, CASE WHEN ISNULL(A.INV_NO, '') = ISNULL(A.REFNO, '') THEN A.REFAMOUNT ELSE 0 END AS UNALLOC_BALANCE, LPO_NO, 
    DESCRIPTION, CUST_REF_NO, '${req.params.date}' AS REPORT_END_DATE FROM (SELECT OP.COMP_CODE, OP.PCODE AS CUST_CODE, O.INV_NO, O.INV_DATE, ISNULL(O.INV_AMOUNT, 0) AS INV_AMOUNT, CASE WHEN O.REFDT <= '${req.params.date}' THEN O.REFNO ELSE NULL 
    END AS REFNO, CASE WHEN O.REFDT <= '${req.params.date}' THEN O.REFDT ELSE NULL END AS REFDT, CASE WHEN O.REFDT <= '${req.params.date}' THEN ISNULL(O.REFAMOUNT, 0) 
    ELSE 0 END AS REFAMOUNT, ISNULL(O.LPO_NO, '') AS LPO_NO, ISNULL(O.DESCRIPTION, '') AS DESCRIPTION, ISNULL(O.AMOUNT, 0) AS AMOUNT, ISNULL((SELECT MAX(CUST_REF_NO) AS Expr1
    FROM SALES AS I
    WHERE (COMP_CODE = OP.COMP_CODE) AND (TRN_NO = O.INV_NO)), '') AS CUST_REF_NO, CASE WHEN RTRIM(OP.TITLE) <> '' THEN RTRIM(OP.TITLE) + ' ' + OP.CUST_NAME ELSE OP.CUST_NAME END AS CUST_NAME, OP.TYPE, OP.ACCOUNT_CATEGORY_DESC, OP.ACCOUNT_TYPE_DESC, OP.BRANCH_NAME, OP.ADD1, OP.ADD2, OP.ADD3, OP.POBOX, OP.PHONE1, OP.PHONE2, OP.FAX1, OP.FAX2, OP.EMAIL, OP.CONTACT, OP.CREDITPERIOD, OP.CR_LIMIT, OP.REMARKS
    FROM vwOPBAL AS OP INNER JOIN OUTSTANDING AS O ON OP.COMP_CODE = O.COMPCODE AND OP.PCODE = O.CUST_CODE AND O.INV_DATE <= '${req.params.date}'
    WHERE (OP.COMP_CODE = '01') AND (OP.FYEAR = YEAR('${req.params.date}')) AND (OP.TYPE = 'C') AND (ISNULL(O.AMOUNT, 0) <> (CASE WHEN O.REFDT <= '${req.params.date}' THEN ISNULL(O.REFAMOUNT, 0) ELSE 0 END))) AS A) AS A
    GROUP BY COMP_CODE, CUST_CODE, CUST_NAME, TYPE, ACCOUNT_CATEGORY_DESC, ACCOUNT_TYPE_DESC, BRANCH_NAME, ADD1, ADD2, ADD3, POBOX, PHONE1, PHONE2, FAX1, FAX2, EMAIL, CONTACT, CREDITPERIOD, CR_LIMIT, REMARKS, REPORT_END_DATE 
    ORDER BY CUST_CODE;`;
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

exports.payAgeingRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT COMP_CODE, CUST_CODE, CUST_NAME, TYPE, ACCOUNT_CATEGORY_DESC, ACCOUNT_TYPE_DESC, BRANCH_NAME, ADD1, ADD2, ADD3, POBOX, PHONE1, PHONE2, FAX1, FAX2, EMAIL, CONTACT, CREDITPERIOD, CR_LIMIT, REMARKS, REPORT_END_DATE, 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) < 30 THEN A.INV_BALANCE ELSE 0 END) AS [M_30_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 30 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 59 THEN A.INV_BALANCE ELSE 0 END) AS [M_60_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 60 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 89 THEN A.INV_BALANCE ELSE 0 END) AS [M_90_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 90 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 119 THEN A.INV_BALANCE ELSE 0 END) AS [M_120_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 120 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 179 THEN A.INV_BALANCE ELSE 0 END) AS [M_180_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 180 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 364 THEN A.INV_BALANCE ELSE 0 END) AS [M_365_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 365 THEN A.INV_BALANCE ELSE 0 END) AS ABOVE_365_DAYS, SUM(INV_BALANCE) AS INV_BALANCE, SUM(UNALLOC_BALANCE) AS UNALLOC_BALANCE, SUM(INV_BALANCE - UNALLOC_BALANCE) AS NET_BALANCE

    FROM (SELECT COMP_CODE, CUST_CODE, CUST_NAME, TYPE, ACCOUNT_CATEGORY_DESC, ACCOUNT_TYPE_DESC, BRANCH_NAME, ADD1, ADD2, ADD3, POBOX, PHONE1, PHONE2, FAX1, FAX2, EMAIL, CONTACT, CREDITPERIOD, CR_LIMIT, REMARKS, INV_NO, INV_DATE, INV_AMOUNT AS AMOUNT, REFNO, REFDT, CASE WHEN A.TYPE = 'S' THEN A.AMOUNT ELSE A.REFAMOUNT END AS DEBIT, CASE WHEN A.TYPE = 'S' THEN A.REFAMOUNT ELSE A.AMOUNT END AS CREDIT, AMOUNT - REFAMOUNT AS BALANCE, CASE WHEN ISNULL(A.INV_NO, '') <> ISNULL(A.REFNO, '') THEN A.AMOUNT - A.REFAMOUNT ELSE 0 END AS INV_BALANCE, CASE WHEN ISNULL(A.INV_NO, '') = ISNULL(A.REFNO, '') THEN A.REFAMOUNT ELSE 0 END AS UNALLOC_BALANCE, LPO_NO, 
    DESCRIPTION, CUST_REF_NO, '${req.params.date}' AS REPORT_END_DATE FROM (SELECT OP.COMP_CODE, OP.PCODE AS CUST_CODE, O.INV_NO, O.INV_DATE, ISNULL(O.INV_AMOUNT, 0) AS INV_AMOUNT, CASE WHEN O.REFDT <= '${req.params.date}' THEN O.REFNO ELSE NULL 
    END AS REFNO, CASE WHEN O.REFDT <= '${req.params.date}' THEN O.REFDT ELSE NULL END AS REFDT, CASE WHEN O.REFDT <= '${req.params.date}' THEN ISNULL(O.REFAMOUNT, 0) 
    ELSE 0 END AS REFAMOUNT, ISNULL(O.LPO_NO, '') AS LPO_NO, ISNULL(O.DESCRIPTION, '') AS DESCRIPTION, ISNULL(O.AMOUNT, 0) AS AMOUNT, ISNULL((SELECT MAX(CUST_REF_NO) AS Expr1
    FROM SALES AS I
    WHERE (COMP_CODE = OP.COMP_CODE) AND (TRN_NO = O.INV_NO)), '') AS CUST_REF_NO, CASE WHEN RTRIM(OP.TITLE) <> '' THEN RTRIM(OP.TITLE) + ' ' + OP.CUST_NAME ELSE OP.CUST_NAME END AS CUST_NAME, OP.TYPE, OP.ACCOUNT_CATEGORY_DESC, OP.ACCOUNT_TYPE_DESC, OP.BRANCH_NAME, OP.ADD1, OP.ADD2, OP.ADD3, OP.POBOX, OP.PHONE1, OP.PHONE2, OP.FAX1, OP.FAX2, OP.EMAIL, OP.CONTACT, OP.CREDITPERIOD, OP.CR_LIMIT, OP.REMARKS
    FROM vwOPBAL AS OP INNER JOIN OUTSTANDING AS O ON OP.COMP_CODE = O.COMPCODE AND OP.PCODE = O.CUST_CODE AND O.INV_DATE <= '${req.params.date}'
    WHERE (OP.COMP_CODE = '01') AND (OP.FYEAR = YEAR('${req.params.date}')) AND (OP.TYPE = 'S') AND (ISNULL(O.AMOUNT, 0) <> (CASE WHEN O.REFDT <= '${req.params.date}' THEN ISNULL(O.REFAMOUNT, 0) ELSE 0 END))) AS A) AS A
    GROUP BY COMP_CODE, CUST_CODE, CUST_NAME, TYPE, ACCOUNT_CATEGORY_DESC, ACCOUNT_TYPE_DESC, BRANCH_NAME, ADD1, ADD2, ADD3, POBOX, PHONE1, PHONE2, FAX1, FAX2, EMAIL, CONTACT, CREDITPERIOD, CR_LIMIT, REMARKS, REPORT_END_DATE 
    ORDER BY CUST_CODE;`;
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

exports.custAgeingRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT COMP_CODE, CUST_CODE, CUST_NAME, TYPE, ACCOUNT_CATEGORY_DESC, ACCOUNT_TYPE_DESC, BRANCH_NAME, ADD1, ADD2, ADD3, POBOX, PHONE1, PHONE2, FAX1, FAX2, EMAIL, CONTACT, CREDITPERIOD, CR_LIMIT, REMARKS, REPORT_END_DATE, 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) < 30 THEN A.INV_BALANCE ELSE 0 END) AS [M_30_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 30 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 59 THEN A.INV_BALANCE ELSE 0 END) AS [M_60_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 60 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 89 THEN A.INV_BALANCE ELSE 0 END) AS [M_90_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 90 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 119 THEN A.INV_BALANCE ELSE 0 END) AS [M_120_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 120 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 179 THEN A.INV_BALANCE ELSE 0 END) AS [M_180_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 180 AND DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) <= 364 THEN A.INV_BALANCE ELSE 0 END) AS [M_365_DAYS], 
    SUM(CASE WHEN DATEDIFF(DAY, A.INV_DATE, A.REPORT_END_DATE) >= 365 THEN A.INV_BALANCE ELSE 0 END) AS ABOVE_365_DAYS, SUM(INV_BALANCE) AS INV_BALANCE, SUM(UNALLOC_BALANCE) AS UNALLOC_BALANCE, SUM(INV_BALANCE - UNALLOC_BALANCE) AS NET_BALANCE

    FROM (SELECT COMP_CODE, CUST_CODE, CUST_NAME, TYPE, ACCOUNT_CATEGORY_DESC, ACCOUNT_TYPE_DESC, BRANCH_NAME, ADD1, ADD2, ADD3, POBOX, PHONE1, PHONE2, FAX1, FAX2, EMAIL, CONTACT, CREDITPERIOD, CR_LIMIT, REMARKS, INV_NO, INV_DATE, INV_AMOUNT AS AMOUNT, REFNO, REFDT, CASE WHEN A.TYPE = 'C' THEN A.AMOUNT ELSE A.REFAMOUNT END AS DEBIT, CASE WHEN A.TYPE = 'C' THEN A.REFAMOUNT ELSE A.AMOUNT END AS CREDIT, AMOUNT - REFAMOUNT AS BALANCE, CASE WHEN ISNULL(A.INV_NO, '') <> ISNULL(A.REFNO, '') THEN A.AMOUNT - A.REFAMOUNT ELSE 0 END AS INV_BALANCE, CASE WHEN ISNULL(A.INV_NO, '') = ISNULL(A.REFNO, '') THEN A.REFAMOUNT ELSE 0 END AS UNALLOC_BALANCE, LPO_NO, 
    DESCRIPTION, CUST_REF_NO, '${req.params.date}' AS REPORT_END_DATE FROM (SELECT OP.COMP_CODE, OP.PCODE AS CUST_CODE, O.INV_NO, O.INV_DATE, ISNULL(O.INV_AMOUNT, 0) AS INV_AMOUNT, CASE WHEN O.REFDT <= '${req.params.date}' THEN O.REFNO ELSE NULL 
    END AS REFNO, CASE WHEN O.REFDT <= '${req.params.date}' THEN O.REFDT ELSE NULL END AS REFDT, CASE WHEN O.REFDT <= '${req.params.date}' THEN ISNULL(O.REFAMOUNT, 0) 
    ELSE 0 END AS REFAMOUNT, ISNULL(O.LPO_NO, '') AS LPO_NO, ISNULL(O.DESCRIPTION, '') AS DESCRIPTION, ISNULL(O.AMOUNT, 0) AS AMOUNT, ISNULL((SELECT MAX(CUST_REF_NO) AS Expr1
    FROM SALES AS I
    WHERE (COMP_CODE = OP.COMP_CODE) AND (TRN_NO = O.INV_NO)), '') AS CUST_REF_NO, CASE WHEN RTRIM(OP.TITLE) <> '' THEN RTRIM(OP.TITLE) + ' ' + OP.CUST_NAME ELSE OP.CUST_NAME END AS CUST_NAME, OP.TYPE, OP.ACCOUNT_CATEGORY_DESC, OP.ACCOUNT_TYPE_DESC, OP.BRANCH_NAME, OP.ADD1, OP.ADD2, OP.ADD3, OP.POBOX, OP.PHONE1, OP.PHONE2, OP.FAX1, OP.FAX2, OP.EMAIL, OP.CONTACT, OP.CREDITPERIOD, OP.CR_LIMIT, OP.REMARKS
    FROM vwOPBAL AS OP INNER JOIN OUTSTANDING AS O ON OP.COMP_CODE = O.COMPCODE AND OP.PCODE = O.CUST_CODE AND O.CUST_CODE = '${req.params.custCode}' AND O.INV_DATE <= '${req.params.date}'
    WHERE (OP.COMP_CODE = '01') AND (OP.FYEAR = YEAR('${req.params.date}')) AND (OP.TYPE = 'C') AND (ISNULL(O.AMOUNT, 0) <> (CASE WHEN O.REFDT <= '${req.params.date}' THEN ISNULL(O.REFAMOUNT, 0) ELSE 0 END))) AS A) AS A
    GROUP BY COMP_CODE, CUST_CODE, CUST_NAME, TYPE, ACCOUNT_CATEGORY_DESC, ACCOUNT_TYPE_DESC, BRANCH_NAME, ADD1, ADD2, ADD3, POBOX, PHONE1, PHONE2, FAX1, FAX2, EMAIL, CONTACT, CREDITPERIOD, CR_LIMIT, REMARKS, REPORT_END_DATE 
    ORDER BY CUST_CODE;`;
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

exports.trialBalanceRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT GLSUBGROUP, GLNAME, SUM(DR_OPBAL) AS DR_OPBAL, SUM(CR_OPBAL) AS CR_OPBAL, SUM(DR_BAL) AS DR_BAL, SUM(CR_BAL) AS CR_BAL, SUM(DR_NETBAL) AS DR_NETBAL, SUM(CR_NETBAL) AS CR_NETBAL FROM vwGLBalForExport WHERE FYEAR='${req.params.year}' AND GLSUBGROUP <> ' ' GROUP BY GLSUBGROUP, GLNAME ORDER BY GLSUBGROUP;`;
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

exports.outstandingRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT TOP (100) PERCENT O.CUST_CODE, MAX(OP.CUST_NAME) AS CUST_NAME, O.INV_NO, O.INV_DATE, MAX(ISNULL(O.LPO_NO, N'')) AS LPO_NO, MAX(ISNULL(O.DESCRIPTION, N'')) AS DESCRIPTION, SUM(ISNULL(O.AMOUNT, 0)) AS AMOUNT, SUM(CASE WHEN O.REFDT <= '${req.params.date}' THEN ISNULL(O.REFAMOUNT, 0) ELSE 0 END) AS REFAMOUNT, SUM(ISNULL(O.AMOUNT, 0)) - SUM(CASE WHEN O.REFDT <= '${req.params.date}' THEN ISNULL(O.REFAMOUNT, 0) ELSE 0 END) AS [BALANCE AMOUNT]
    FROM  dbo.OUTSTANDING AS O LEFT OUTER JOIN dbo.vwOPBAL AS OP ON O.COMPCODE = OP.COMP_CODE AND O.YEAR = OP.FYEAR AND O.CUST_CODE = OP.PCODE
    WHERE  (O.COMPCODE = '01') AND (O.CUST_CODE LIKE '%A201%') AND (O.INV_DATE <= '${req.params.date}') GROUP BY O.CUST_CODE, O.INV_NO, O.INV_DATE
    HAVING  (SUM(ISNULL(O.AMOUNT, 0)) <> SUM(CASE WHEN O.REFDT <= '${req.params.date}' THEN ISNULL(O.REFAMOUNT, 0) ELSE 0 END))
    ORDER BY O.INV_DATE;`;
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

exports.highValueProdRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT TOP 10 * FROM VWPRODUCTHIGHVAL ORDER BY AMOUNT DESC;`;
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

exports.locWiseStockValRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT (SUM((COSTPRICE*CURRENT_QTY))) AS AMOUNT, LOCATION_ID  FROM  VWPRODUCT_LOCATION_QTY WHERE CURRENT_QTY>0 GROUP BY LOCATION_ID ORDER BY AMOUNT DESC`;
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

exports.subCatWiseStockValRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT TOP 10 SUM(P.CURRENT_QTY*P.COSTPRICE) AS AMOUNT, S.SUBCATEGORY_NAME FROM VWPRODUCT_LOCATION_QTY P, SUBCATEGORY S WHERE P.SUBCATEGORY_ID=S.SUBCATEGORY_ID GROUP BY SUBCATEGORY_NAME ORDER BY AMOUNT DESC`;
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

exports.allAgreementsSMCRprt = (req, res) =>
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT J.JOBNO, J.JOBNAME, J.JDATE, S.SONO, S.SODATE, A.AGR_NO, A.PCODE CUST_CODE, S.CUST_NAME,A.CUST_NAME AS CONTACT, A.START_DATE, A.END_DATE, A.INVOICE_PERIOD, A.TOTAL AGR_AMT,
    CASE WHEN A.END_DATE<GETDATE() Then 'Expired' ELSE 'Running' END STATUS
    FROM AGREEMENTMASTER A
    LEFT OUTER JOIN SOMASTER S ON A.COMP_CODE=S.COMP_CODE AND A.SONO=S.SONO
    LEFT OUTER JOIN JOB J ON S.COMP_CODE=J.COMP_CODE AND S.JOB_NO=J.JOBNO
    WHERE A.COMP_CODE='01' AND J.JOBNO LIKE 'MC%'
    AND EXISTS (
                               SELECT *
                               FROM
                               (
                                      SELECT TOP 1 A2.COMP_CODE, J2.JOBNO, A2.AGR_NO, A2.START_DATE, A2.END_DATE
                                      FROM AGREEMENTMASTER A2
                                      LEFT OUTER JOIN SOMASTER S2 ON A2.COMP_CODE=S2.COMP_CODE AND A2.SONO=S2.SONO
                                      LEFT OUTER JOIN JOB J2 ON S2.COMP_CODE=J2.COMP_CODE AND S2.JOB_NO=J2.JOBNO
                                      WHERE A2.COMP_CODE=A.COMP_CODE AND J2.JOBNO=J.JOBNO
                                      ORDER BY A2.START_DATE DESC
                               ) D WHERE D.COMP_CODE=J.COMP_CODE AND D.JOBNO=J.JOBNO AND D.AGR_NO=A.AGR_NO
                         );`;
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

exports.allAgreementsRprt = (req, res) =>
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT J.JOBNO, J.JOBNAME, J.JDATE, S.SONO, S.SODATE, A.AGR_NO, A.PCODE CUST_CODE, S.CUST_NAME,A.CUST_NAME AS CONTACT, A.START_DATE, A.END_DATE, A.INVOICE_PERIOD, A.TOTAL AGR_AMT
    FROM AGREEMENTMASTER A
    LEFT OUTER JOIN SOMASTER S ON A.COMP_CODE=S.COMP_CODE AND A.SONO=S.SONO
    LEFT OUTER JOIN JOB J ON S.COMP_CODE=J.COMP_CODE AND S.JOB_NO=J.JOBNO
    WHERE A.COMP_CODE='01' AND J.JOBNO LIKE 'MC%';`;
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

exports.allWorkOrdersRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT * FROM VWSCHEDULE WHERE AGR_NO LIKE '${req.params.agrno}%';`;
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

exports.refreshSalesData = (req, res) => 
{
    // Validate request
    console.log(`Refreshing DATA`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `DROP TABLE SALES_DETAILS; SELECT * INTO SALES_DETAILS FROM VWSALESDETAILS;`;
    request.query(queryStr, function (err, recordset) {
        if (err) console.log(err)
        else {
            res.send('Sales data refreshed.')
        };
    });
}

exports.allTradingTotalSalesRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    const queryStr = `SELECT PCODE, DESCRIPTION, SUM(TOTALQUANTITY) AS QTY, SUM(TOTALQUANTITY * UNITCOSTPRICE) AS COST, SUM(TOTALQUANTITY * UNITPRICE) AS SELLLING, SUM(LINE_QTY * LINE_UNIT_PRICE - LINE_QTY * UNITCOSTPRICE) AS GROSS FROM SALES_DETAILS WHERE YEAR (TRN_DATE) = '${req.params.year}' GROUP BY DESCRIPTION, PCODE;`;
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

exports.showroomItemwiseSalesRprt = (req, res) =>
{
     // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    //const queryStr = `SELECT PCODE, DESCRIPTION, SUM(ABS(TOTALQUANTITY)) AS QTY, SUM(ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE)) AS COST, SUM(ABS(TOTALQUANTITY) * ABS(UNITPRICE)) AS SELLLING, SUM(ABS(TOTALQUANTITY) * ABS(UNITPRICE) - ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE)) AS GROSS FROM SALES_DETAILS WHERE DEPT IN ('RU','SU','PL') AND YEAR (TRN_DATE) = '${req.params.year}' GROUP BY DESCRIPTION, PCODE ORDER BY PCODE;`;
    const queryStr = `SELECT PCODE, DESCRIPTION, ABS(SUM(TOTALQUANTITY)) AS QTY, ABS(SUM(TOTALQUANTITY * UNITCOSTPRICE)) AS COST, ABS(SUM(TOTALQUANTITY * UNITPRICE)) AS SELLLING, ABS(SUM(TOTALQUANTITY * UNITPRICE - TOTALQUANTITY * UNITCOSTPRICE)) AS GROSS FROM SALES_DETAILS WHERE DEPT IN ('RU','SU','PL') AND YEAR (TRN_DATE) = '${req.params.year}' GROUP BY DESCRIPTION, PCODE ORDER BY PCODE;`;
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

exports.oneStopShopItemwiseSalesRprt = (req, res) =>
{
     // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    //const queryStr = `SELECT PCODE, DESCRIPTION, SUM(ABS(TOTALQUANTITY)) AS QTY, SUM(ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE)) AS COST, SUM(ABS(TOTALQUANTITY) * ABS(UNITPRICE)) AS SELLLING, SUM(ABS(TOTALQUANTITY) * ABS(UNITPRICE) - ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE)) AS GROSS FROM SALES_DETAILS WHERE DEPT IN ('PC') AND YEAR (TRN_DATE) = '${req.params.year}' GROUP BY DESCRIPTION, PCODE ORDER BY PCODE;`;
    const queryStr = `SELECT PCODE, DESCRIPTION, ABS(SUM(TOTALQUANTITY)) AS QTY, ABS(SUM(TOTALQUANTITY * UNITCOSTPRICE)) AS COST, ABS(SUM(TOTALQUANTITY * UNITPRICE)) AS SELLLING, ABS(SUM(TOTALQUANTITY * UNITPRICE - TOTALQUANTITY * UNITCOSTPRICE)) AS GROSS FROM SALES_DETAILS WHERE DEPT IN ('PC') AND YEAR (TRN_DATE) = '${req.params.year}' GROUP BY DESCRIPTION, PCODE ORDER BY PCODE;`;
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

exports.monthWiseShowroomSalesRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    //const queryStr = `SELECT MONTH (TRN_DATE) AS MONTH, SUM(ABS(TOTALQUANTITY)) AS QTY, SUM(ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE)) AS COST, SUM(ABS(TOTALQUANTITY) * ABS(UNITPRICE)) AS SELLLING, SUM(ABS(TOTALQUANTITY) * ABS(UNITPRICE) - ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE)) AS GROSS, SUM(AMOUNT) AS AMOUNT FROM SALES_DETAILS WHERE DEPT IN ('RU','SU','AP') AND YEAR (TRN_DATE) = '${req.params.year}' GROUP BY MONTH (TRN_DATE) ORDER BY MONTH (TRN_DATE);`;
    const queryStr = `SELECT MONTH (TRN_DATE) AS MONTH, ABS(SUM(TOTALQUANTITY)) AS QTY, ABS(SUM(TOTALQUANTITY * UNITCOSTPRICE)) AS COST, ABS(SUM(TOTALQUANTITY * UNITPRICE)) AS SELLLING, ABS(SUM(TOTALQUANTITY * UNITPRICE - TOTALQUANTITY * UNITCOSTPRICE)) AS GROSS, SUM(AMOUNT) AS AMOUNT FROM SALES_DETAILS WHERE DEPT IN ('RU','SU','AP') AND YEAR (TRN_DATE) = '${req.params.year}' GROUP BY MONTH (TRN_DATE) ORDER BY MONTH (TRN_DATE);`;
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

exports.dayWiseShowroomRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    //const queryStr = `SELECT TRN_DATE, PCODE, DESCRIPTION, ABS(TOTALQUANTITY) AS QTY, ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE) AS COST, ABS(TOTALQUANTITY) * ABS(UNITPRICE) AS SELLLING, ABS(TOTALQUANTITY) * ABS(UNITPRICE) - ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE) AS GROSS FROM SALES_DETAILS WHERE DEPT IN ('RU','SU','AP') AND TRN_DATE = '${req.params.date}' ORDER BY TRN_DATE;`;
    const queryStr = `SELECT TRN_DATE, PCODE, DESCRIPTION, ABS(TOTALQUANTITY) AS QTY, ABS(TOTALQUANTITY * UNITCOSTPRICE) AS COST, ABS(TOTALQUANTITY * UNITPRICE) AS SELLLING, ABS(TOTALQUANTITY * UNITPRICE - TOTALQUANTITY * UNITCOSTPRICE) AS GROSS FROM SALES_DETAILS WHERE DEPT IN ('RU','SU','AP') AND TRN_DATE = '${req.params.date}' ORDER BY TRN_DATE;`;
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

exports.dayWiseOneStopShopSalesRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    //const queryStr = `SELECT TRN_DATE, PCODE, DESCRIPTION, ABS(TOTALQUANTITY) AS QTY, ABS(OTALQUANTITY) * ABS(UNITCOSTPRICE) AS COST, ABS(TOTALQUANTITY) * ABS(UNITPRICE) AS SELLLING, ABS(TOTALQUANTITY) * ABS(UNITPRICE) - ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE) AS GROSS FROM SALES_DETAILS WHERE DEPT IN ('PC') AND TRN_DATE = '${req.params.date}' ORDER BY TRN_DATE;`;
    const queryStr = `SELECT TRN_DATE, PCODE, DESCRIPTION, ABS(TOTALQUANTITY) AS QTY, ABS(OTALQUANTITY) * ABS(UNITCOSTPRICE) AS COST, ABS(TOTALQUANTITY) * ABS(UNITPRICE) AS SELLLING, ABS(TOTALQUANTITY) * ABS(UNITPRICE) - ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE) AS GROSS FROM SALES_DETAILS WHERE DEPT IN ('PC') AND TRN_DATE = '${req.params.date}' ORDER BY TRN_DATE;`;
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

exports.monthWiseOneStopShopSalesRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    //const queryStr = `SELECT MONTH (TRN_DATE) AS MONTH, SUM(ABS(TOTALQUANTITY)) AS QTY, SUM(ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE) AS COST, SUM(ABS(TOTALQUANTITY) * ABS(UNITPRICE)) AS SELLLING, SUM(ABS(TOTALQUANTITY) * ABS(UNITPRICE) - ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE)) AS GROSS, SUM(ABS(AMOUNT)) AS AMOUNT FROM SALES_DETAILS WHERE DEPT IN ('PC') AND YEAR (TRN_DATE) = '${req.params.year}' GROUP BY MONTH (TRN_DATE) ORDER BY MONTH (TRN_DATE);`;
    const queryStr = `SELECT MONTH (TRN_DATE) AS MONTH, ABS(SUM(TOTALQUANTITY)) AS QTY, ABS(SUM(TOTALQUANTITY * UNITCOSTPRICE) AS COST, ABS(SUM(TOTALQUANTITY * UNITPRICE)) AS SELLLING, ABS(SUM(TOTALQUANTITY * UNITPRICE - TOTALQUANTITY * UNITCOSTPRICE)) AS GROSS, SUM(ABS(AMOUNT)) AS AMOUNT FROM SALES_DETAILS WHERE DEPT IN ('PC') AND YEAR (TRN_DATE) = '${req.params.year}' GROUP BY MONTH (TRN_DATE) ORDER BY MONTH (TRN_DATE);`;
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

exports.showroomTotalSalesRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    //const queryStr = `SELECT SUM(ABS(TOTALQUANTITY)) AS QTY, SUM(ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE)) AS COST, SUM(ABS(TOTALQUANTITY) * ABS(UNITPRICE)) AS SELLLING, SUM(ABS(TOTALQUANTITY) * ABS(UNITPRICE) - ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE)) AS GROSS, SUM(ABS(AMOUNT)) AS AMOUNT FROM SALES_DETAILS WHERE DEPT IN ('RU','SU','AP') AND YEAR (TRN_DATE) = '${req.params.year}';`;
    const queryStr = `SELECT ABS(SUM(TOTALQUANTITY)) AS QTY, ABS(SUM(TOTALQUANTITY * UNITCOSTPRICE)) AS COST, ABS(SUM(TOTALQUANTITY * UNITPRICE)) AS SELLLING, ABS(SUM(TOTALQUANTITY * UNITPRICE - TOTALQUANTITY * UNITCOSTPRICE)) AS GROSS, SUM(ABS(AMOUNT)) AS AMOUNT FROM SALES_DETAILS WHERE DEPT IN ('RU','SU','AP') AND YEAR (TRN_DATE) = '${req.params.year}';`;
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

exports.oneStopShopTotalSalesRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    //const queryStr = `SELECT SUM(ABS(TOTALQUANTITY)) AS QTY, SUM(ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE)) AS COST, SUM(ABS(TOTALQUANTITY) * ABS(UNITPRICE)) AS SELLLING, SUM(ABS(TOTALQUANTITY) * ABS(UNITPRICE) - ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE)) AS GROSS, SUM(ABS(AMOUNT)) AS AMOUNT FROM SALES_DETAILS WHERE DEPT IN ('PC') AND YEAR (TRN_DATE) = '${req.params.year}';`;
    const queryStr = `SELECT ABS(SUM(TOTALQUANTITY)) AS QTY, ABS(SUM(TOTALQUANTITY * UNITCOSTPRICE)) AS COST, ABS(SUM(TOTALQUANTITY * UNITPRICE)) AS SELLLING, ABS(SUM(TOTALQUANTITY * UNITPRICE - TOTALQUANTITY * UNITCOSTPRICE)) AS GROSS, ABS(SUM(AMOUNT)) AS AMOUNT FROM SALES_DETAILS WHERE DEPT IN ('PC') AND YEAR (TRN_DATE) = '${req.params.year}';`;
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

exports.serviceDeptTotalSalesRprt = (req, res) => 
{
    // Validate request
    console.log(`Fetching RESPONSE`);
    // create Request object
    var request = new mssql.Request();
    // query to the database and get the records
    //const queryStr = `SELECT SUM(ABS(TOTALQUANTITY)) AS QTY, SUM(ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE)) AS COST, SUM(ABS(TOTALQUANTITY) * ABS(UNITPRICE)) AS SELLLING, SUM(ABS(TOTALQUANTITY) * ABS(UNITPRICE) - ABS(TOTALQUANTITY) * ABS(UNITCOSTPRICE)) AS GROSS, SUM(ABS(AMOUNT)) AS AMOUNT FROM SALES_DETAILS WHERE DEPT IN ('SC', 'MC', 'SJ') AND YEAR (TRN_DATE) = '${req.params.year}';`;
    const queryStr = `SELECT ABS(SUM(TOTALQUANTITY)) AS QTY, ABS(SUM(TOTALQUANTITY * UNITCOSTPRICE)) AS COST, ABS(SUM(TOTALQUANTITY * UNITPRICE)) AS SELLLING, ABS(SUM(TOTALQUANTITY * UNITPRICE - TOTALQUANTITY * UNITCOSTPRICE)) AS GROSS, ABS(SUM(AMOUNT)) AS AMOUNT FROM SALES_DETAILS WHERE DEPT IN ('SC', 'MC', 'SJ') AND YEAR (TRN_DATE) = '${req.params.year}';`;
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