var express = require('express');
var app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
   res.send("Hello world!");
});

const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "test",
});

app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE IF NOT EXISTS test";
    db.query(sql, (err) => {
      if (err) {
        throw err;
      }
      res.send("Database created");
    });
  });

  app.get("/createtable", (req, res) => {
      let sql ="create table if not exists employee(empId integer primary key, ename varchar(30), salary double)";
      db.query(sql, (err) => {
          if(err) {
              throw err;
          }
          res.send("Employee Table created");
      });
  });

  app.get("/showemployee/:id", (req, res) => {
    let sql = `select * from employee WHERE empId = ${req.params.id}`;
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });
  });

  app.post("/insert", (req, res) => {
    const bdy = req.body;
    let sql = "insert into employee values ("+bdy.id+", '"+bdy.name+"', "+bdy.salary+")";
    db.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Inserted into Table");
      });
    console.log(bdy)
    
    res.send("Inserted to the table")
  });


  app.get("/showall", (req, res) => {
    let sql = `select * from employee`;
    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result)
      });
  });


app.listen(3000);