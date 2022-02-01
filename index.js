const mysql = require('mysql');

const express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
};


const bodyparser = require('body-parser');

app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Tech@9000',
    database: 'EmployeeDB',
    multipleStatements: true
});

mysqlConnection.connect((err)=>{
    if(!err){
        console.log("DB CONNECTED")
    }
    else{
        console.log("CONNECTION FAILED"+ JSON.stringify(err,undefined,2))
    }
})

app.listen(5500,()=>console.log('Express server is running at port no : 5500'));


//GET all Employee
app.get('/employees', cors(corsOptions), (req,res)=>{
    mysqlConnection.query('SELECT * FROM Employee', (err, rows, fields)=>{
        if(!err){
            // console.log(rows)
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
})

//GET an Employee
app.get('/employees/:id', cors(corsOptions), (req,res)=>{
    mysqlConnection.query('SELECT * FROM Employee WHERE id = ?', [req.params.id], (err, rows, fields)=>{
        if(!err){
            // console.log(rows)
            res.send(rows)
        }
        else{
            console.log(err)
        }
    })
})

//DELETE an Employee
app.get('/employees/:id', cors(corsOptions), (req,res)=>{
    mysqlConnection.query('DELETE FROM Employee WHERE id = ?', [req.params.id], (err, rows, fields)=>{
        if(!err){
            // console.log(rows)
            res.send('Deleted Successfully');
        }
        else{
            console.log(err)
        }
    })
})

//INSERT an Employee
app.post('/employees/:id', cors(corsOptions), (req,res)=>{
    let emp = req.body;
    var sql = "SET @id = ?; SET @name = ?; SET @post = ?; SET @dob = ?; SET @phone = ?; SET @email = ?; SET @address = ?; SET @img = ?; \
    CALL EmployeeAddEdit(@id, @name, @post, @dob, @phone, @email, @address, @img);"
    mysqlConnection.query(sql,[emp.id, emp.name, emp.post, emp.dob, emp.phone, emp.email, emp.address, emp.img], (err, rows, fields)=>{
        if(!err){
            res.send(rows);
        }
        else{
            console.log(err)
        }
    })
})

//UPDATE an Employee
app.put('/employees/:id', cors(corsOptions), (req,res)=>{
    let emp = req.body;
    var sql = "SET @id = ?; SET @name = ?; SET @post = ?; SET @dob = ?; SET @phone = ?; SET @email = ?; SET @address = ?; SET @img = ?; \
    CALL EmployeeAddEdit(@id, @name, @post, @dob, @phone, @email, @address, @img);"
    mysqlConnection.query(sql,[emp.id, emp.name, emp.post, emp.dob, emp.phone, emp.email, emp.address, emp.img], (err, rows, fields)=>{
        if(!err){
            res.send("Updated Successfully");
        }
        else{
            console.log(err)
        }
    })
})