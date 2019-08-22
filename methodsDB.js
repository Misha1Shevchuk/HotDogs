// import file with configs to DB
const configDB = require('./configDB');
const connection = configDB.connection;

// get HotDogs
module.exports.getHotDogs = res => {
    connection.query('SELECT * FROM hotdog', (err, rows, fields) => {
        res.send(rows);
    });
}

// insert new HotDog
module.exports.addHotDog = obj => {
    let post = [obj.hotdog, obj.description];
    connection.query('INSERT INTO hotdog SET hotdog = ?, description = ? ', post, (err, result) => {});
}

// remove HotDog
module.exports.removeHotDog = obj => {
    let post = [obj.id];
    connection.query('DELETE FROM hotdog WHERE id = ?', post, (err, result) => {});
}

// change HotDog
module.exports.changeHotDog = obj => {
    let post = [obj.hotdog, obj.description, obj.id];
    connection.query('UPDATE hotdog SET hotdog = ?, description = ? WHERE id = ?', post, (err, result) => {});
}