// import * as http from 'http';
const express = require('express');
const listenport = 9201;
const app = express();
const mysql = require('mysql');
const morgan = require('morgan');
const authRoute = require('./route/login_auth');
const bodyParser = require('body-parser');
const connect = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database: "taskrotation"

})
const jsonParser = bodyParser.json()
const server = require('http').Server(app)
const userrouter = require('./route/user')
const jwt = require ('jsonwebtoken');




app.use(bodyParser.urlencoded({extended : false}))

app.use(morgan('short'))

app.get("/",(req,res) => {

    console.log("Respone to root ")
})
app.use(authRoute);
app.use(userrouter)

// ---------------not complete user login -------------------------

app.set('port',(process.env.PORT || listenport))
server.listen(app.get('port'),function(){
    console.log(" listening on port " + this.address().port, app.settings.env)
})



// ---------------not complete user login -------------------------

app.listen()
app.listen(4000, () => console.log('server up'));

