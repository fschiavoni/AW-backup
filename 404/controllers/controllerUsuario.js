
const modeloUsuarios = require("../models/modeloUsuarios");
const mysql = require("mysql");
const config = require("../config");
const { use } = require("../routers/routerUsuario");

var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.name
});

const modUsers = new modeloUsuarios(pool);


module.exports = {
    login:function(request, response){
        response.render('login', {errorMsg: null});
    },

    checkPassword: function(request,response,next){
        
        if (request.body.password===request.body.password2){
            next(); 
        }else {
            response.render('register',{errorMsg:"Las contraseñas no coinciden"});
        }
    },

    showImagen: function(request,response){
     
        
        response.sendFile(path.join(__dirname, "../public/images/",request.params.image));


    },


    processLogin:function(request, response){
        modUsers.userExist(request.body.email, request.body.password, function(err, result) {
            if (err) {
                console.log(err);
                
            } else if (result) {
            
                request.session.currentUser = true;
               
                request.session.email = result.email;
                request.session.date = result.fecha_Alta;
                request.session.name = result.apodo;
                request.session.questions = result.num_preguntas;
                request.session.answers = result.num_respuestas; 
                request.session.image=result.img;
               
                response.redirect("/home");
            }else {
                response.render('login', {errorMsg: "Email o contraseña no validos."});
                console.log("failed to login");
                //console.log(request.session);
            }
        });
    },
    logout:function(request, response){
        request.session.destroy();
        response.redirect('/');
    },

    register:function(request, response){
        //response.render('register'); // añadir warnings
        response.render('register', {errorMsg: null});
    },

    processRegister:function(request, response) {
        let user = {
            email: request.body.email,
            password: request.body.password,
            name: request.body.apodo,
            image: null
            
        };

        if (request.file) {
            user.image = request.file.filename;      
        }
        
      

        modUsers.verifyUser(user.email, function(err, result){
            if (err) console.log(err);
            else if (result) {
                response.render('register', {errorMsg: "El usuario introducido ya existe en la base de datos."});
                
            }else {
                modUsers.newUser(user, function(error){
                    if (error){
                        console.log(error);
                    }else {
                        //response.render('exito'); 
                        response.redirect('login');
                        //response.render('login', {errorMsg: "Cuenta creada exitosamente, ya puedes iniciar sesion"});    
                    }
            });}
       

       
    });


    },

    loggedUser:function(request, response, next){
        if (request.session.currentUser){
            next();
        }else {
            response.redirect('/');
        }
    },
    
    home:function(request, response){
        response.render('home', {username: request.session.name});
    }
}
