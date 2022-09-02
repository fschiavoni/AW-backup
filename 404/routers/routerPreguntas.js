
const { response } = require("express");
const express = require("express");
const controllerPreguntas = require("../controllers/controllerPreguntas");

const controllerUsuario = require("../controllers/controllerUsuario");
const router = express.Router();

// falta multer

router.get('/',controllerUsuario.loggedUser,controllerPreguntas.showAllQuestions);
router.get('/search',controllerUsuario.loggedUser,controllerPreguntas.searchQuestion);
router.post('/search',controllerUsuario.loggedUser,controllerPreguntas.searchQuestion);
router.get('/new',controllerUsuario.loggedUser,controllerPreguntas.newQuestion);
router.post('/new',controllerUsuario.loggedUser,controllerPreguntas.processNewQuestion);
router.get('/noAnswered',controllerUsuario.loggedUser, controllerPreguntas.getNoAnsweredQuestions);

router.post('/noAnswered',controllerUsuario.loggedUser, controllerPreguntas.getNoAnsweredQuestions);

router.get('/:id_pregunta', controllerUsuario.loggedUser, controllerPreguntas.getQuestion);
router.post('/:id_pregunta', controllerUsuario.loggedUser, controllerPreguntas.newAnswer);

router.get('/tags/:tag', controllerUsuario.loggedUser, controllerPreguntas.filterQuestionByTag);

module.exports = router;