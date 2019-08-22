// Import file with configs to DB
const configDB = require('./configDB');
const connection = configDB.connection;

// Get HotDogs
module.exports.getHotDogs = res => {
    connection.query('SELECT * FROM hotdog', (err, rows, fields) => {
        res.send(rows);
    });
}

// Insert new HotDog
module.exports.addHotDog = obj => {
    let post = [obj.hotdog, obj.description];
    let query = connection.query('INSERT INTO hotdog SET hotdog = ?, description = ? ', post, (err, result) => {});
    console.log(query.sql);
}

// Remove HotDog
module.exports.removeHotDog = obj => {
    let post = [obj.id];
    let query = connection.query('DELETE FROM hotdog WHERE id = ?', post, (err, result) => {});
    console.log(query.sql);
}

// Change HotDog
module.exports.changeHotDog = obj => {
    let post = [obj.hotdog, obj.description, obj.id];
    let query = connection.query('UPDATE hotdog SET hotdog = ?, description = ? WHERE id = ?', post, (err, result) => {});
    console.log(query.sql);
}