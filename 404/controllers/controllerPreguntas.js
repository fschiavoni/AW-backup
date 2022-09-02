const modeloPreguntas = require("../models/modeloPreguntas");
const mysql = require("mysql");
const config = require("../config");
const { use } = require("../routers/routerPreguntas");

var pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.name
});

const modPreguntas = new modeloPreguntas(pool);


module.exports = {


showAllQuestions:function(request, response){
    modPreguntas.getAllQuestions(function(err,result){
        if (err) {
            console.log(err);
        }
        else if (result){

        

            response.render('questions',{list: result, username: request.session.name});
        }


    })
},

getNoAnsweredQuestions: function(request, response){ 
modPreguntas.getNoAnsweredQuestions(function(err,result){

    if (err){
        console.log(err);
    }else if (result){

        response.render('questions',{list:result, username:request.session.name});
    }


})
},
processNewQuestion: function(request,response){

    let tags = request.body.tags.split("#");
    tags.shift();
    
    if (tags.length < 6){
        modPreguntas.newQuestion(request.session.email, request.body.title,request.body.body, tags, function(err){
            if (err){
                console.log(err);
            }else{
                console.log("Pregunta añadida");
                
                response.redirect('/home');
            }
        });
        
    }
            
    



},



newQuestion: function(request,response){



    response.render('askQuestion',{username:request.session.name});


},




filterQuestionByTag: function(request,response){
modPreguntas.filterQuestionByTag(request.params.tag, function(err, result){
if (err){
    console.log(err);
}
else if (result){
    console.log("EL RESULT ES: " + result[0]);
    response.render('questions',{list: result, username: request.session.name });
}


})





},

 searchQuestion:function (request,response){
     

   modPreguntas.searchQuestion(request.body.texto, function(err, result){
    if (err) {
        console.log(err);
    }
    else if (result){
    //    console.log(result);
        response.render('questions',{list:result, username: request.session.name });

    }
   
    })
 
 },

 getQuestion:function(request, response){
     //console.log("id is: " + request.params.id_pregunta);
    modPreguntas.getQuestion(request.params.id_pregunta, function(err, result){
        //console.log(result);
        if (err) console.log(err);
        else{
            response.render('question', {username: request.session.name, question: result});
        }
    });
     
 },

 newAnswer:function(request, response) {
     modPreguntas.newAnswer(request.params.id_pregunta, request.session.email, request.body.body, function(err){
         if (err) console.log(err);
         else response.redirect('/preguntas'); 
     });
 }
}