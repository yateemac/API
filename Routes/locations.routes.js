module.exports = (app) => {
    const LocContrllr = require('../Controllers/locations.controllers');

    //1. GET REQUEST
    app.get('/api/locs', LocContrllr.func1);

    //2. REQUEST TO INSERT NEW LOCATION
    //app.post('/api/newLoc', LocContrllr.func2);
    app.get('/api/newLoc/:locId/:locName/:locLat/:locLong/:locBrType', LocContrllr.func2)

};