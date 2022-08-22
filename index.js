
// const express = require("express");
// const mysql = require('mysql');
// var app = express();
// const bodyparser = require("body-parser");
// //const res = require("express/lib/response");
// //const res = require("express/lib/response");
// app.use(bodyparser.json);
// app.use(express.json());
// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "books",
//     multipleStatements: true
// });
// con.connect(function (err) {
//     if (err)
//         throw err;
//     console.log("Connected!");
// });

// app.listen(8000, (req,res) => {
//     console.log("runinggggg");
// });

// app.get('/',(req,res)=>{
//     console.log('i am called');
// })
// //get
// app.get('/book', (_req, _res) => {
//     console.log("vgvg");
//     con.query('SELECT * FROM authors', (err, _rows, _fields) => {
//         if (!err)
//             //console.log(_rows);
//             res.send(_rows)
//         else
//             console.log(err);
//     });
// });
// //get by id
// app.get('/book/:id', (_req, _res) => {
//     console.log("hgsxh");
//     con.query('SELECT * FROM authors WHERE id=?', [_req.params.id], (err, _rows, _fields) => {
//         if (!err)
//             _res.send(_rows);
//         else
//             console.log(err);
//     });
// });
// /// delete BY ID 
// app.delete('/book/:id', (_req, _res) => {
//     con.query('DELETE FROM authors WHERE id=?', [_req.params.id], (err, _rows, _fields) => {
//         if (!err)
//             _res.send("DELETED");
//         else
//             console.log(err);
//     });
// });
// //all dlt
// app.delete("/book", (req, _res) => {
//     let query = 'DELETE FROM authors  ';
//     con.query(query, (err, _rows) => {
//         if (err)
//             throw err;
//         console.log('Cleared  Table');
//     });
// });
// //insertion
// app.post('/insert', function (req, res, _next) {
//     var id = req.body.id;
//     var name = req.body.name;
//     var email = req.body.email;
//     var sql = `INSERT INTO authors (id, name, email) VALUES ("${id}", "${name}","${email}")`;
//     con.query(sql, function (err, _result) {
//         if (err)
//             throw err;
//         console.log('record inserted');
//         res.redirect('/authors');
//     });
// });
// //update 
// app.put('/fetch', (req, res) => {
//     con.query("UPDATE `authors` SET `name`=?, `email`=? where `id`=?", [req.body.name, req.body.email, req.body.id], function (err, rows, _fields) {
//         if (err)
//             throw err;
//         res.end(JSON.stringify(rows));
//     });
// });

const express = require("express");
//const mysql = require('mysql');

const bodyparser = require("body-parser");
var app = express();
app.use(bodyparser.json());
app.use(express.json());

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "books",
//     multipleStatements: true
// });

// con.connect(function (err) {
//     if (err)
//         throw err;
//     console.log("Connected!");
// });
const port = 8000

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/', (req, res) => {
    res.send('Hello World!')
  })