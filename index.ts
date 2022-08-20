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
});
con.connect(function (err:any) {
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
app.get('/students', (_req:any, _res:any) => {
   con.query('select * from students',(err:any,rows:any,_fields:any)=>{
       if(!err)
       console.log(rows)
       else
       console.log(err)
   })
})
///PATCH METHOD 
app.patch('/students/:id', function (req:any, res:any) {
    var id = req.params.id;
    var _a = req.body, first_name = _a.first_name, last_name = _a.last_name, email = _a.email;
    var student = students.find(function (student:any) { return student.id == id; });
    if (first_name)
        student.first_name = first_name;
    if (last_name)
        student.last_name = last_name;
    if (email)
        student.email = email;
    res.send("changed");
});
// fetch by id
app.get("/fetch/:id", (req:any, res:any) => {
    con.query("select * from students where id = ?", [req.params.id], function (err:any, result:any, _fields:any) {
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
app.delete("/students/:id", (req:any,_res:any) => {
    con.query('DELETE from  students WHERE id = ?', [req.params.id],  (err:any, _result:any, _fields:any) =>{
        if (err) {
            console.log(err);
        }
        else {
            console.log(_result)
            _res.send(_result)
               var r=(JSON.parse(JSON.stringify(_result)))
               console.log(r)
            console.log("deleted");
        }
    });
});

//all dlt
app.delete("/students", (req:any,_res:any) => {
let query = 'DELETE FROM students';
  
    con.query(query, (err:any, rows:any) => {
        if(err) throw err;
  
        console.log('Cleared users Table');
    });
})
//insert new student
app.post('/insert', function(req:any, res:any, next:any) {
    var id  = req.body.id;
    var first_name = req.body.first_name;
    var last_name = req.body.last_name;
    var email= req.body.email
  
    var sql = `INSERT INTO students (id, first_name, last_name, email,  created_at) VALUES ("${id}", "${first_name}", "${last_name}","${email}", NOW())`;
    con.query(sql, function(err:any, result:any) {
      if (err) throw err;
      console.log('record inserted');
      res.redirect('/students');
    });
  });
app.put('/fetch', (req:any, res:any) => {
    con.query("UPDATE `students` SET `first_name`=?,  `last_name`=?,`email`=? where `id`=?", [req.body.first_name, req.body.last_name, req.body.email, req.body.id], function (err:any, rows:any,fields:any) {
        if (err)
            throw err;
        res.end(JSON.stringify(rows));
    });
});
