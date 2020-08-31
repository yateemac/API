const express = require('express');
const morgan = require('morgan') ;
const mssql = require('mssql');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = {
    'user': 'sa',
    'password': 'P@ssw0rd',
    'server': 'YATEEMDC2012',
    'database': 'IFASOFT',
    'dialect': 'mssql',
    'dialectOptions': {
        'instanceName': 'YATEEMDC2012\SQLEXPRESS'
    }
}

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('short'));
/*app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});*/
app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Length, Content-Type, Accept, Authorization");
    next();
});
//app.use(cors({origin: 'http://localhost:4200'}));
//app.use(cors({origin: 'http://call.yateemac.net'}));

mssql.connect(config).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Welcome to application."});
});

require('./Routes/users.routes.js')(app);
require('./Routes/reports.routes.js')(app);
require('./Routes/racks.routes.js')(app);
require('./Routes/locations.routes.js')(app);
require('./Routes/complaints.routes.js')(app);

//ENVIRONMENT VARIABLE
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port ${port}…`));