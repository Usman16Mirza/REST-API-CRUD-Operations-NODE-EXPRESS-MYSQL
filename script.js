const express = require ('express');
const app = express();
const port = 5500;

var bodyParser = require('body-parser')
var Parser = bodyParser.json()

const mysql = require('mysql2')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Macbookpro123',
    database:'SchoolManSys'
});

connection.connect(function(error){
    if (error) {
        throw error; }
    else {
        console.log("MySQL data base connected successfully");
      }
});


app.post('/:students/', Parser, function (req, res) {
    var sql = `insert into students values (${req.body.ID},"${req.body.StudentName}",${req.body.ClassID}, ${req.body.CurrentEduYear}, "${req.body.Grade}")`;
    connection.query(sql,(err,result) =>{
        if (err) throw err ;
        
        
        res.send(`Student with ID: ${req.body.ID} has been added`)
    } )
    
})

app.put('/:students/:identity',Parser, function (req,res) {
    let sql = `update students set ID = ${req.body.ID}, StudentName= "${req.body.StudentName}" , ClassID= ${req.body.ClassID}, Grade = "${req.body.Grade}"  WHERE ID= ${req.params.identity}`
    connection.query(sql, (err,result)=> {
        if (err) throw err;

        res.send(`Student record with ID= ${req.params.identity} has been updated`)
    })
})

app.delete('/:students/:id', (req,res) => {
    let sql = `delete from students where id = ${req.params.id}`;
    connection.query(sql,(err,result) =>{
        if (err) throw err ;
        
        // res.send('Table Created ')
        res.send(`The ID:${req.params.id} has been deleted.`)
    } )
});

app.get('/students', (req,res) => {
    let sql = 'Select * from  students';
    connection.query(sql,(err,result) =>{
        if (err) throw err ;
        console.log(result);
        // res.send('Table Created ')
        res.send(result)
    } )
});

app.get('/students/:id', (req,res) =>{
    
    let sql = `Select * from  students where ID = ${req.params.id}` ;
    connection.query(sql,(err,result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
});

app.get('/students/:id/:grade', (req,res) =>{
    
    let sql = `Select grade from  students where ID = ${req.params.id}` ;
    connection.query(sql,(err,result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
});

app.get('/students/:id/:grade/:year', (req,res) =>{
    
    let sql = `Select grade from  students where ID = ${req.params.id} and CurrentEduYear = ${req.params.year} ` ;
    connection.query(sql,(err,result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
});

app.get('/admins', (req,res) => {
    let sql = 'Select * from  admins';
    connection.query(sql,(err,result) =>{
        if (err) throw err ;
        console.log(result);
        // res.send('Table Created ')
        res.send(result)
    } )
});

app.get('/admins/:id', (req,res) =>{
    
    let sql = `Select * from  students where ID = ${req.params.id}` ;
    connection.query(sql,(err,result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
});

app.get('/teachers', (req,res) => {
    let sql = 'Select * from teachers';
    connection.query(sql,(err,result) =>{
        if (err) throw err ;
        console.log(result);
        // res.send('Table Created ')
        res.send(result)
    } )
});

app.get('/teachers/:id', (req,res) =>{
    
    let sql = `Select * from  students where ID = ${req.params.id}` ;
    connection.query(sql,(err,result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
});

app.get('/classes', (req,res) =>{
    
    let sql = `Select * from  classes` ;
    connection.query(sql,(err,result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
});


app.get('/studentgrades', (req,res) =>{
    
    let sql = `Select * from  studentgrades` ;
    connection.query(sql,(err,result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
});


app.get('/students/:id/:grade', (req,res) =>{
    
    let sql = `Select grade from  students where ID=${req.params.id}` ;
    connection.query(sql,(err,result) => {
        if (err) throw err;
        console.log(result);
        res.send(result)
    })
});

app.listen(
    port,
    function() {console.log(`listening at HTTP:/localhost/${port}`)}
)