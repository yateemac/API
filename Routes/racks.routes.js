module.exports = (app) => {
    const RackContrllr = require('../Controllers/racks.controllers');

    //1. GET REQUEST
    app.get('/api/racks', RackContrllr.getAllRacks);

    //2. GET LOCATIONWISE RACK
    app.get('/api/racks/:locid', RackContrllr.getRack)

    //3. GET LOCATIONWISE RACKWISE SHELF
    app.get('/api/shelfs/:locid/:rackid', RackContrllr.getShelf);

    //4. GET LOCATIONWISE RACKWISE SHELF
    app.get('/api/shelfs/:locid/:rackid/:shelfid', RackContrllr.checkShelf);

    //5. POST NEW RACK
    app.post('/api/rack/new', RackContrllr.postRack);

    //6. POST NEW SHELF
    app.post('/api/shelf/new', RackContrllr.postShelf);

    //7. UPDATE SHELF
    app.post('/api/shelf/update', RackContrllr.updateShelf);

    //8. GET PRODUCTS
    app.get('/api/shelf/:barcode', RackContrllr.getProducts);

    //9. CHECK PRODUCTS
    app.get('/api/product/:pcode/:year', RackContrllr.checkProduct);
};