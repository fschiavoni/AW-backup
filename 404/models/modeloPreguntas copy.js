class modeloPreguntas {

    constructor(pool) {
        this.pool = pool;
    }

     question = {
        id: null,
        title :null,
        body:null,
        votes:null ,
        post_date:null,
        user:null, 
        tags:[],
        answers:[]
    };
    //Muestra por pantalla todas las preguntas   (DONE) 
    getAllQuestions(callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) callback(err, null);
            else {
             
                connection.query("SELECT * from pregunta order by pregunta.fecha DESC",function (err, result) {
                        connection.release();
                        if (err) callback(err, null);
                        else {
                            
                    
                            let questions = [];

                            for (let i = 0; i < result.length; i++) {

                                    question = {};
                                    question.id = result[i].id;
                                    question.title=result[i].titulo;
                                    question.body=result[i].cuerpo;
                                    question.votes = result[i].votos;                                    
                                    question.post_date = new Date(result[i].fecha).toDateString();
                                    question.email = result[i].usuario;
                                    // question.tags=rows[i].tags;
                                    // question.user=rows[i].Nombre;
                                    // question.image = rows[i].Imagen_Perfil;
                                    // Lleno el array tags de question con las tags de esa pregunta  (la paso por parametro)
                                    // question.tags=getTagsFromQuestion(question.id); (COMPROBAR SI ASI VALDRIA)

                                    getTagsFromQuestion(question.id,function(err, result){
                                        if (err) {
                                            console.log(err);
                                        }
                                        else if (result)
                                        question.tags=result; 
                                      });
                                    questions.push(question);
           
                                    
                            }    
                            callback(null, questions);
                        }
                    });
            }
        });
    }
    

    


    // DADO UN ID TE MUESTRA LA PREGUNTA CON SUS RESPUESTAS  (DONE) 
    getQuestion(id_pregunta,callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) callback(err, null);
            else {
                
                connection.query("SELECT * FROM pregunta WHERE id=?", [id_pregunta],
                    function (err, result) {
                        connection.release();
                        if (err) callback(err, null);
                        else if(rows.length == 0){
                            question = {};
                            question.id = result.id;
                            question.title=result.titulo;
                            question.body=result.cuerpo;
                            question.votes = result.votos;                                    
                            question.post_date = new Date(result[i].fecha).toDateString();
                            question.email = result.usuario;   
                            getTagsFromQuestion(question.id,function(err, result){
                                if (err)  console.log(err);
                                         
                                else if (result) question.tags=result; 
                              }); 
                           getAnswers(question.id,function(err,result){
                            if  (err) console.log(err);
                            else if(result) 
                            question.answers=result;
                                // MISMA DUDA QUE EN LAS TAGS
                           })
                            
                            }

                             callback(null, question);
                                });
                            }
                        });
                    }
                      

    //                         let questions = {
    //                             id: rows[0].id_pregunta,
    //                             votes: rows[0].votos,
    //                             title: rows[0].titulo,
    //                             body: rows[0].cuerpo,
    //                             post_date: new Date(rows[0].fecha_publicacion).toDateString(),
    //                             tags: rows.tags,
    //                             image: rows[0].Imagen_Perfil,
    //                             user: rows[0].email,
    //                             tags:rows[0].tags,
    //                             answers: answers

    //                         };
                         
                        
    //                         callback(null, questions);
    //                 }
    //             });
    //         }
    //     });
    // }




 
    //DADO UN TEXTO BUSCA PREGUNTAS QUE CONTENGAN DICHO TEXTO EN EL CUERPO O EL TITULO  (DONE) 
    searchQuestion(texto, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) callback(err, null);
            else {
                
                connection.query("SELECT * FROM pregunta  where pregunta.titulo like ? or pregunta.cuerpo like ?  order by pregunta.fecha DESC",["%"+texto+"%","%"+texto+"%"],
                    function (err, result) {
                        connection.release();
                        if (err) callback(err, null);
                        else {
                             
                            let questions = [];

                            for (let i = 0; i < result.length; i++) {

                                    question = {};
                                    question.id = result[i].id;
                                    question.title=result[i].titulo;
                                    question.body=result[i].cuerpo;
                                    question.votes = result[i].votos;                                    
                                    question.post_date = new Date(result[i].fecha).toDateString();
                                    question.email = result[i].usuario;
                                    // question.tags=rows[i].tags;
                                    // question.user=rows[i].Nombre;
                                    // question.image = rows[i].Imagen_Perfil;
                                    // Lleno el array tags de question con las tags de esa pregunta  (la paso por parametro)
                                    // question.tags=getTagsFromQuestion(question.id); (COMPROBAR SI ASI VALDRIA)

                                    getTagsFromQuestion(question.id,function(err, result){
                                        if (err) {
                                            console.log(err);
                                        }
                                        else if (result)
                                        question.tags=result; 
                                      });
                                    questions.push(question);
           
                                    
                            }    
                            callback(null, questions);
                        
                        }
                    });
            }
        });
    }

 
    //DEVUELVE LAS PREGUNTAS SIN NINGUNA RESPUESTA (DONE) 
    getNoAnsweredQuestions (callback){
    this.pool.getConnection(function(err,connection){
        if (err)callback(err,null);
        else {
            connection.query("SELECT * FROM pregunta  where pregunta.id not in (select id_pregunta from respuesta)  order by pregunta.fecha DESC",
            function (err, rows){
                connection.release();
                if(err){}
                else{
                    
                    let questions = [];

                    for (let i = 0; i < result.length; i++) {

                            question = {};
                            question.id = result[i].id;
                            question.title=result[i].titulo;
                            question.body=result[i].cuerpo;
                            question.votes = result[i].votos;                                    
                            question.post_date = new Date(result[i].fecha).toDateString();
                            question.email = result[i].usuario;
                            // question.tags=rows[i].tags;
                            // question.user=rows[i].Nombre;
                            // question.image = rows[i].Imagen_Perfil;
                            // Lleno el array tags de question con las tags de esa pregunta  (la paso por parametro)
                            // question.tags=getTagsFromQuestion(question.id); (COMPROBAR SI ASI VALDRIA)

                            getTagsFromQuestion(question.id,function(err, result){
                                if (err) {
                                    console.log(err);
                                }
                                else if (result)
                                question.tags=result; 
                              });
                            questions.push(question);
   
                            
                    }    
                    callback(null, questions);
                }
                    });
            }
        });
    }
//DADA UNA ETIQUETA DEVUELVE LAS PREGUNTAS QUE LA CONTENGAN (TODO)
    filterQuestionByTag(tag, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) callback(err, null);
            else {
              
                connection.query("(SELECT *, GROUP_CONCAT(etiquetas.texto_etiquetas) tags FROM (preguntas LEFT JOIN etiquetas ON preguntas.id_pregunta = etiquetas.id_pregunta) GROUP BY preguntas.id_pregunta HAVING etiquetas.texto_etiquetas = ?)",[tag],
                    function (err, rows) {
                        connection.release();
                        if (err) callback(err, null);
                        else {
                            let question = {
                                id: null,
                                votes:null ,
                                title :null,
                                body:null,
                                post_date:null,
                                user:null,
                                image:null,
                                tags:null
                            };
                    
                            let questions = [];

                            

                    
                            for (let i = 0; i < rows.length; i++) {
                                    question = {};
                                    question.id = rows[i].id_pregunta;
                                    question.email = rows[i].email;
                                    question.votes = 0; 
                                    question.title=rows[i].titulo;
                                    question.body=rows[i].cuerpo;
                                    question.post_date = new Date(rows[i].fecha_publicacion).toDateString(),
                                    question.tags=rows[i].tags;
                                    question.image = rows[i].Imagen_Perfil;
                                    question.user=rows[i].Nombre
                                    questions.push(question);
           
                            }
                            

                            for (let i = 0; i < questions.length; i++){
                                if (questions[i].tags !== null){
                                    let tagList = questions[i].tags;
                                

                                    questions[i].tags = tagList.split(',');
                                   
                                }
                            }


                        
                           
                            callback(null, questions);
                        }
                    });
            }
        });
    }
    /**
     * 
     * @param {*Email del usuario al que le queremos agregar una tarea} email 
     * @param {*Tarea a agregar} task 
     * @param {*Devuelve err} callback 
     */

    //(TODO)
     newQuestion(email,titulo,cuerpo, tags, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) callback(err,null);
            else {
              
                console.log(email,titulo,cuerpo, tags);
                connection.query("INSERT INTO preguntas(email, titulo, cuerpo ) VALUES (?, ?, ?) ", [email,titulo,cuerpo], 
                    function (err) {
                        console.log("Insertado");
                        if (err) callback(err,null);
                       else if (tags.length>0) {
                            connection.query("SELECT MAX(id_pregunta) as ultima FROM preguntas", function(err, result){
                               
                                if (err) callback(err, null);
                                else if (result){
                                    for (let i = 0; i < tags.length; i++) {

                                        
                                        connection.query("INSERT INTO etiquetas(id_pregunta, texto_etiquetas) VALUES (?, ?)", [result[0].ultima, tags[i]],
                                        function (err) {
                                            
                                            if (err) callback(err);
                                            
                                        }); 
                                    }

                                    
                                }
                                
                                
                            });

                            
                        } connection.release();
                        callback(err,null);
                    });
            }
        });
    }

   
//DADO UN ID de pregunta devuelve todas las respuestas que tenga dicha pregunta (DONE) 
  
    getAnswers(id_pregunta,callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) callback(err, null);
            else {
             
                connection.query("SELECT * FROM respuesta where id_pregunta=? ",[id_pregunta],
                    function (err, result) {
                        connection.release();
                        if (err) callback(err, null);
                        else {
                            let answer = {
                                id_answer,
                                id_question,
                                email,
                                votes,
                                body,
                                post_date
                            };
                    
                            let answers = [];

                    
                            for (let i = 0; i < rows.length; i++) {
                                    answer = {};
                                    answer.id_answer = result[i].id;
                                    answer.body=result[i].texto;                                   
                                    answer.votes = result[i].votos;                        
                                    answer.post_date = new Date(result[i].fecha_publicacion).toDateString(),
                                    answer.email = result[i].usuario;
                                    answer.id_question = result[i].id_pregunta;
                                    answers.push(answer);
           
                            }
                           
                            callback(null, answers);
                        }
                    });
            }
        });
    }
       //(TODO)
    newAnswer(question, email, answer, callback) {
            this.pool.getConnection(function (err, connection) {
                if (err) callback(err,null);
                else {
                     
                    connection.query("INSERT INTO respuestas (id_pregunta, email_respuesta, cuerpo_respuesta) VALUES (?, ?, ?)", [question, email, answer], 
                        function (err) {
                            
                            connection.release();
                            if (err) callback(err,null);
                            else callback(null);
                              
                            
                        });
                }
            });
        }
 
   

//(TODO)
        
    voteQuestion(email,id_question, voto, callback){
            this.pool.getConnection(function (err, connection) {
                if (err) callback(err);
                else {
                       
                    connection.query("INSERT INTO vota_pregunta (email, id_pregunta, voto) VALUES (?,?,?)", [email,id_question,voto],
                        function (err, result) {
                            connection.release();
                            if (err) callback(err);
                            else{
                                connection.query("UPDATE preguntas SET voto=voto+? where id_pregunta=?", [voto,id_question],
                                function (err) {
                                    connection.release();
                                    if (err) callback(err);
                                    else
                                    callback(null);
                                });
                            }
                        });
                }
            });
        }


//(TODO)
        voteAnswer(email,id_answer, voto, callback){
        this.pool.getConnection(function (err, connection) {
        if (err) callback(err);
        else {
                
            connection.query("INSERT INTO vota_respuesta (email, id_respuesta, voto) VALUES (?,?,?)", [email,id_answer,voto],
                function (err, result) {
                    connection.release();
                    if (err) callback(err);
                    else{
                        connection.query("UPDATE respuestas SET voto=voto+? where id_respuesta=?", [voto,id_answer],
                        function (err) {
                            connection.release();
                            if (err) callback(err);
                            else
                            callback(null);
                        });
                    }
                });
        }
    });
    }

  
}

module.exports = modeloPreguntas;