
const path = require("path");
const { response } = require("express");
const express = require("express");
const multer = require("multer");
const multerFactory=multer({dest: path.join(__dirname, "../public/images")});
const controllerUsuario = require("../controllers/controllerUsuario");
const router = express.Router();



router.get("/", function(request, response){
    response.redirect('/login');
});

// REGISTER
router.get('/register', controllerUsuario.register);
router.post('/register',controllerUsuario.checkPassword,multerFactory.single("image"), controllerUsuario.processRegister);

// LOGIN
router.get('/login', controllerUsuario.login);
router.post('/login', controllerUsuario.processLogin);

// HOME
router.get('/home', controllerUsuario.loggedUser, controllerUsuario.home);
//router.post('/home', controllerUsuario.loggedUser, controllerUsuario.logout);

// LOGOUT
router.get('/logout', controllerUsuario.loggedUser, controllerUsuario.logout)
//router.post('/logout', controllerUsuario.loggedUser, controllerUsuario.logout);

// IMAGENES USUARIO
router.get('/images/:image', controllerUsuario.loggedUser,controllerUsuario.showImagen);

module.exports = router;