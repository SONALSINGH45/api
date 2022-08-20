"use strict";
const express = require("express");
const students = require("ipaddr.js");
//const createConnection = require("typeorm")
const bodyparser = require("body-parser");
//onst app = express()
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "typeorm_test_db",
    multipleStatements: true
});DELETE
con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
});
const app = express();
//app.use(cors());
app.use(express.json());
app.use(bodyparser.json());
app.listen(7000, () => {
    console.log("listining");
});
// GET 
app.get('/students', (_req, _res) => {
   con.query('select * from students',(err,rows,_fields)=>{
       if(!err)
       console.log(rows)
       else
       console.log(err)
   })
})
///PATCH METHOD 
app.patch('/students/:id', function (req, res) {
    var id = req.params.id;
    var _a = req.body, first_name = _a.first_name, last_name = _a.last_name, email = _a.email;
    var student = students.find(function (student) { return student.id == id; });
    if (first_name)
        student.first_name = first_name;
    if (last_name)
        student.last_name = last_name;
    if (email)
        student.email = email;
    res.send("changed");
});
// fetch by id
app.get("/fetch/:id", (req, res) => {
    con.query("select * from students where id = ?", [req.params.id], function (err, result, _fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
            var r = (JSON.parse(JSON.stringify(result)));
            console.log(r);
        }
    });
});

//delete 
app.delete("/students/:id", (req,_res) => {
    con.query('DELETE from  students WHERE id = ?', [req.params.id],  (err, _result, _fields) =>{
        if (err) {
            console.log(err);
        }
        else {
            console.log(_result)
            res.send(result)
               var r=(JSON.parse(JSON.stringify(_result)))
               console.log(r)
            console.log("deleted");
        }
    });
});

//all dlt
app.delete("/students", (req,_res) => {
let query = 'DELETE FROM students';
  
    con.query(query, (err, rows) => {
        if(err) throw err;
  
        console.log('Cleared users Table');
    });
})
//insert new student
app.post('/insert', function(req, res, next) {
    var id  = req.body.id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email= req.body.email
  
    var sql = `INSERT INTO students (id, first_name, last_name, email,  created_at) VALUES ("${id}", "${first_name}", "${last_name}","${email}", NOW())`;
    con.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
      res.redirect('/students');
    });
  });
app.put('/fetch', (req, res) => {
    con.query("UPDATE `students` SET `first_name`=?,  `last_name`=?,`email`=? where `id`=?", [req.body.first_name, req.body.last_name, req.body.email, req.body.id], function (err, rows, _fields) {
        if (err)
            throw err;
        res.end(JSON.stringify(rows));
    });
});
