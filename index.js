
const express = require("express");
const mysql = require('mysql');
var app = express();
const bodyparser = require("body-parser");
const  jwt = require("jsonwebtoken")
const{JWT_SECRET}=require("./key")
const dotenv = require('dotenv');
const bcrypt=require("bcrypt");
const { verify } = require("crypto");
dotenv.config();
  
let PORT = process.env.PORT || 8000;
//const res = require("express/lib/response");
//const res = require("express/lib/response");
app.use(bodyparser.json());
app.use(express.json());
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "books",
    multipleStatements: true
});
con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
});
app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT} ...`);
  });


//get
app.get('/book/validateToken', (req, res) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
        if(jwt.verify(token, jwtSecretKey)){
            con.query('SELECT * FROM authors', (err, rows) => {
                if (!err){
                    res.send(rows)
                    return
                }
                else
                    console.log(err);
            });
        }else{
            // Access Denied
            console.log(error)
            //return _res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return _res.status(401).send(error);
    }

    
});
//get by id
app.get('/book/:id',(_req, _res) => {

    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = _req.header(tokenHeaderKey);
        if(jwt.verify(token, jwtSecretKey)){
            con.query('SELECT * FROM authors WHERE id=?', [_req.params.id], (err, _rows, _fields) => {
                       if (!err)
                           _res.send(_rows);
                  else
                          console.log(err);
                    });
                }else{
            // Access Denied
            console.log(error)
            //return _res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return _res.status(401).send(error);
    }
//     
 });
/// delete BY ID 
app.delete('/book/:id', (req, res) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
        if(jwt.verify(token, jwtSecretKey)){
            con.query('DELETE FROM authors WHERE id=?', [req.params.id], (err, rows, fields) => {
                if (!err)
                    res.send("DELETED");
                else
                    console.log(err);
            });
        }else{
            // Access Denied
            console.log(error)
            //return _res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return _res.status(401).send(error);
    }
    
});
//all dlt
app.delete("/book", (_req,_res) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = _req.header(tokenHeaderKey);
        if(jwt.verify(token, jwtSecretKey)){
            let query = 'DELETE FROM authors  ';
    con.query(query, (err, rows) => {
        if (err)
            throw err;
        console.log('Cleared  Table');
    });
                }else{
            // Access Denied
            console.log(error)
            //return _res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return _res.status(401).send(error);
    }
    l
});
//insertion
app.post("/msg/generateToken", (req, res) => {
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data ={
        id:req.body.id,
        name:req.body.name,
        email:req.body.email
    }
    
    //res.send(token);
    con.query('INSERT INTO authors (id, name, email) VALUES  (? ,? ,?)', [data.id, data.name, data.email],(error, 
          _results) => {
           if (error) return res.json({ error: error });
          
             });
        const token = jwt.sign(data, jwtSecretKey); 
        res.send({'msg':'data saved','key':token,'payload' : data,'status':200})    
       });
         
//update 
app.put('/fetch/:id', (req, res) => {
    let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
    try {
        const token = req.header(tokenHeaderKey);
        if(jwt.verify(token, jwtSecretKey)){
          
    con.query("UPDATE `authors` SET `name`=?, `email`=? where `id`=?", [req.body.name, req.body.email, req.body.id], function (err, rows, _fields) {
        if (err)
            throw err;
        res.end(JSON.stringify(rows));
    });
        }else{
            // Access Denied
            console.log(error)
            //return _res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return _res.status(401).send(error);
    }

});
