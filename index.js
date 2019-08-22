const express = require('express');
const path = require('path');
const app = express();

const controller = require("./controller");
controller.configure(app);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;
let server = app.listen(port, () => {
    console.log('Server Listening on port ' + server.address().port);
});