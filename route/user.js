const express = require('express')
const mysql = require('mysql')
const router = express.Router()
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser');
// connect database 
const connect = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database: "task_rotation"

})

// const pool = mysql.createPool({
// connectionLimit : 10,
// host : "localhost",
//     user: "root",
//     password: "",
//     database: "taskrotation"

// }) 

// select all user
router.get("/users",(req,res)=>{
    console.log("Fetch user with id :"+ req.params.id)
    
    const userId = req.params.id
    const querystring = "SELECT * FROM registration"
    connect.query(querystring,[userId],(err,rows) => {
    if(err){
            console.log("failed query"+err)
            res.sendStatus(500)
            return
    }
    console.log("select success")
    res.json(rows)
    console.log("customers: ", rows);
    })

})
// select all user by id 
router.get("/users/:id",(req,res)=>{
    console.log("Fetch user with id :"+ req.params.id)
    
    const userId = req.params.id
    const querystring = "SELECT * FROM registration where user_id = ?"
    connect.query(querystring,[userId],(err,rows) => {
    if(err){
            console.log("failed query"+err)
            res.sendStatus(500)
            return
    }
    console.log("select success")
    res.json(rows)
    console.log("customers: ", rows);
    })
    //res.end()
} )

// insert user registration
router.post("/user_create",(req,res)=> {


    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(req.body.password,salt,function(err,hash){
            console.log("user created")
            const username = req.body.username
            const email  = req.body.email
            const password = req.body.password
            const staffID = req.body.staffID
            const designation = req.body.designation
            const queryString = "insert into registration(user_name,user_email,user_password,user_staff_id,user_designation	) values(?,?,?,?,?)"
            connect.query(queryString,[username,email,password,staffID,designation],(err,results,fields) =>{
            
            if(err){
                console.log("failed "+ err)
                res.sendStatus(500)
                return
            }
            var massage = "insert complete";
            res.sendStatus(200)
            // console.log("insert complete")
            // res.json({massage})
            res.end()
            })
        })
    })
})
//  complete
router.put("/user/update",(req,res)=> {
    const userId = req.params.id
    const username = req.body.username
    const email  = req.body.email
    const password = req.body.password
    const staffID = req.body.staffID
    const designation = req.body.designation
    const queryString = "Update registration SET user_name = ?,user_email = ?,user_password = ?,user_designation = ? where user_staff_id = ? "
    connect.query(queryString,[username,email,password,designation,staffID],(err,results,fields) =>{
        if(err){
            console.log("failed "+ err)
            res.sendStatus(500)
            return
        }
        console.log("Update complete")
        res.sendStatus(200)
        res.end()
        })
    
    })    
// not complete 
router.delete("/user/delete",(req,res) => {
    const queryString = "DELETE FROM registration  WHERE user_staff_id = ?"
    const staffID = req.body.staffID
    console.log([staffID])
    connect.query(queryString,[staffID], function (err, results, fields) {
      if (err) res.sendStatus(500);
      console.log("Record has been deleted!")
      res.sendStatus(200)
      res.end();

    })
})
// for test input form.html
router.use(express.static('./public'))
module.exports = router