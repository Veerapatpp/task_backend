const jwt = require ('jsonwebtoken');
const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');
const { request } = require('http');
const session = require('express-session');
const connect = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database: "task_rotation"

})
router.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
router.use(bodyParser.urlencoded({extended : true}));
router.use(bodyParser.json());
router.post('/login',(req,res)=> {
        const email = req.body.email;
        const password = req.body.password;
        
        
        if(email&&password){
            console.log(email);
            console.log(password);
            var tokenlogin
            const querystring = "SELECT user_email,user_password FROM registration where user_email = ? AND user_password = ?"
            connect.query(querystring,[email,password],function(err,results){
                console.log(results);
                jwt.sign({email:password}, 'secretkey',(err,token) =>{
                    tokenlogin = token
                     
                if(results.length > 0){
                    
                    console.log("sucsses")
                    // res.sendStatus(200)
                    res.json({tokenlogin});
                    
                }else{
                    console.log(err)
                    res.sendStatus(500)
                    // res.send('Incorrect Username and/or Password!');
                }
                    res.end()
            });
        });
        }else {
            // res.send('Please enter Username and Password!');
            res.sendStatus(200)
            res.end();
        }

        // mock up user
            // jwt.sign({user:req.body.password}, 'secretkey',(err,token) =>{
            // res.json({
            //     token
        
            // });
            // });
        
        })
        // jwt token 
        function verifyToken(req,res,next){
        
            const bearerHeader = req.headers['authorization']
            // Check if undefined
            if(typeof bearerHeader !== 'undefined'){
                const bearer = bearerHeader.split(' ');
        
                const bearerToken = bearer[1];
                req.token = bearerToken;
                next();
            }else{
                res.sendStatus(403);
            }
        }

router.use(express.static('./public'))
module.exports = router;