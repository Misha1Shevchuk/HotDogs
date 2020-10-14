'use strict';

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/router');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(require('body-parser').json());

app.use('/api/hotdogs', router);

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log('Server Listening on port ' + server.address().port);
});

mongoose.connect(
    process.env.CONNECT_DB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("Connected to DB")
);
