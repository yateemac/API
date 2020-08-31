module.exports = (app) => {
    const RprtContrllr = require('../Controllers/reports.controllers');

    //1. GET CUSTOMER AGEING REPORT
    app.get('/api/reports/receivables/ageing/:date', RprtContrllr.recAgeingRprt);

    //1. GET CUSTOMER AGEING REPORT
    app.get('/api/reports/payables/ageing/:date', RprtContrllr.payAgeingRprt);

    //3. GET TRAIL BALANCE
    app.get('/api/reports/financials/trialBalance/:year', RprtContrllr.trialBalanceRprt);

    //2. GET CUSTOMER AGEING REPORT
    app.get('/api/reports/custAgeing/:custCode/:date', RprtContrllr.custAgeingRprt);

    //3. GET CUSTOMER OUTSTANDING REPORT
    app.get('/api/reports/outstanding/:date', RprtContrllr.outstandingRprt);

    //4. GET TOP 15 HIGH VALUED PRODUCT REPORTS
    app.get('/api/reports/highValueProd', RprtContrllr.highValueProdRprt);

    //5. GET ALL LOCATION_WISE STOCK VALUE REPORT
    app.get('/api/reports/locWiseStockVal', RprtContrllr.locWiseStockValRprt);

    //6. GET ALL SUBCATEGORY_WISE STOCK VALUE REPORT
    app.get('/api/reports/subCatWiseStockVal', RprtContrllr.subCatWiseStockValRprt);

    //7. GET ALL AGREEMENTS - SMC EXPIRED AND RUNNING
    app.get('/api/reports/allAgreementsSMC', RprtContrllr.allAgreementsSMCRprt);

    //8. GET ALL AGREEMENTS - MASTER DETAIL
    app.get('/api/reports/allAgreements', RprtContrllr.allAgreementsRprt);

    //9. GET ALL WORK ORDERS
    app.get('/api/reports/allWorkOrders/:agrno', RprtContrllr.allWorkOrdersRprt);

    //9. REFRESH DALES TRADING DATA
    app.get('/api/reports/refreshData', RprtContrllr.refreshSalesData);

    //10. GET ITEMWISETOTAL SALES REPORT - TRADING
    app.get('/api/reports/tradingTotalSales/:year', RprtContrllr.allTradingTotalSalesRprt);

    //11. GET ITEMWISE SHOWROOM SALES REPORT
    app.get('/api/reports/tradingTotalSales/showroom/:year', RprtContrllr.showroomItemwiseSalesRprt);

    //12. GET ITEMWISE SHOWROOM SALES REPORT
    app.get('/api/reports/tradingTotalSales/oneStopShop/:year', RprtContrllr.oneStopShopItemwiseSalesRprt);

    //14. GET DEPT WISE TOTAL SALES REPORT - SHOWROOM
    app.get('/api/reports/deptWiseSales/showroom/:year', RprtContrllr.showroomTotalSalesRprt);
    
    //15. GET DEPT WISE TOTAL SALES REPORT - ONE STOP SHOP
    app.get('/api/reports/deptWiseSales/oneStopShop/:year', RprtContrllr.oneStopShopTotalSalesRprt);

    //16. GET DEPT WISE TOTAL SALES REPORT - SERVICE DEPT
    app.get('/api/reports/deptWiseSales/serviceDept/:year', RprtContrllr.serviceDeptTotalSalesRprt);

    //19. GET MONTHWISE SHOWROOM SALES REPORT - TRADING
    app.get('/api/reports/monthwiseShowroomSales/:year', RprtContrllr.monthWiseShowroomSalesRprt);

    //20. GET MONTHWISE SHOWROOM SALES REPORT - TRADING
    app.get('/api/reports/monthwiseOneStopShopSales/:year', RprtContrllr.monthWiseOneStopShopSalesRprt);

    //20. GET MONTHWISE SHOWROOM SALES REPORT - TRADING
    app.get('/api/reports/dayWiseShowroomSales/:date', RprtContrllr.dayWiseShowroomRprt);
    
    //20. GET MONTHWISE SHOWROOM SALES REPORT - TRADING
    app.get('/api/reports/dayWiseOneStopShopSales/:date', RprtContrllr.dayWiseOneStopShopSalesRprt);
};