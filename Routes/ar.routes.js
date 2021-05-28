module.exports = (app) => {
    const arController = require('../Controllers/ar.controller.js');
app.post('/api/ar/postparty', arController.postParty);

 //1. GET PARTY_ID
 app.get('/api/ar/getParty/:partyId', arController.getParty);

//1. GET ALL pARTY
app.get('/api/ar/getAllParty', arController.getAllParty);

}
