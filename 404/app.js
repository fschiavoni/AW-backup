"use strict";

const config = require("./config");
const morgan = require("morgan");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const modeloUsuarios = require("./models/modeloUsuarios");
const modeloPreguntas = require("./models/modeloPreguntas");



// SESIONES
const session = require("express-session");
const mysqlSession = require("express-mysql-session");
const MySqlStore = mysqlSession(session);
const sessionStore = new MySqlStore({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.name
});

const middlewareSession = session({
    saveUninitialized: false,
    secret: "404",
    resave: false,
    store: sessionStore
});

const userRouter = require("./routers/routerUsuario");
const questionsRouter = require("./routers/routerPreguntas");


// Crear un servidor Express.js
const app = express();



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(middlewareSession);



app.use("/", userRouter);
app.use("/preguntas", questionsRouter);



// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
//   });
 


// // error handler
// app.use(function(err, req, res, next) {
   
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
//   });




// Arrancar el servidor
app.listen(config.port, function(err) {
    if (err) {
     console.log("ERROR al iniciar el servidor");
 }
 else {
     console.log(`Servidor arrancado en el puerto ${config.port}`);
 }
 });