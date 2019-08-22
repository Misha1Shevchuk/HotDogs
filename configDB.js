const mysql = require('mysql');

//amazon web services

module.exports.connection = mysql.createConnection({
    database: 'hotdogsdb',
    host: "hotdogstesttask.czrnsracishq.us-east-2.rds.amazonaws.com",
    user: "misha1shevchuk",
    password: "n=x!QW,35E2*yJv"
});