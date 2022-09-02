class modeloPreguntas {

    constructor(pool) {
        this.pool = pool;
    }

     // Dada una pregunta, devuelve las tags asociadas a la misma  (DONE) 
     getTagsFromQuestion(id,callback){
        this.pool.getConnection(function (err, connection) {
            
            if (err) callback(err, null);
            else {
                connection.query("SELECT * FROM etiqueta WHERE id_pregunta=?", [id], function(err, result){
                    connection.release();
                    if (err) callback(err,null);
                    else {

                      let  tags=[];
                      for ( let i=0;i<result.length;i++){
                            tag={
                                name:result.name[i]
                            }
                           tags.push(tag)
                      }
                      callback(null,tags);
                    }
                });
            };
        });
    }

    

    getAllQuestions(callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) callback(err, null);
            else {
             
                connection.query("SELECT * from pregunta order by pregunta.fecha DESC",function (err, result) {
                        connection.release();
                        if (err) callback(err, null);
                        else {
                            
                    
                            let questions = [];
                            let question = {
                                id: null,
                                title :null,
                                body:null,
                                votes:null ,
                                post_date:null,
                                user:null, 
                                tags:[],
                                answers:[]
                            };

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

                                    // getTagsFromQuestion(question.id,function(err, result){
                                    //     if (err) {
                                    //         console.log(err);
                                    //     }
                                    //     else if (result)
                                    //     question.tags=result; 
                                    //   });

                                    
                                    
                                    questions.push(question);
           
                                    
                            }    
                            callback(null, questions);
                        }
                    });
            }
        });
    }
    
      
   
    getQuestion(id_pregunta,callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) callback(err, null);
            else {
                
                connection.query("SELECT *, GROUP_CONCAT(etiquetas.texto_etiquetas) tags FROM (preguntas LEFT JOIN etiquetas ON preguntas.id_pregunta = etiquetas.id_pregunta) where preguntas.id_pregunta= ?   GROUP BY preguntas.id_pregunta order by preguntas.fecha_publicacion DESC ",[id_pregunta],
                    function (err, rows) {
                        connection.release();
                        console.log("ROWS LENTH: " + rows.length);
                        if (err) callback(err, null);
                        else if(rows.length === 0){
                            connection.query("SELECT * FROM preguntas WHERE id_pregunta=?", [id_pregunta], function(err, result){
                                if (err) callback(err,null);
                                else {

                                    let question = {
                                        id: result[0].id_pregunta,
                                        votes: result[0].votos,
                                        title: result[0].titulo,
                                        body: result[0].cuerpo,
                                        post_date: new Date(result[0].fecha_publicacion).toDateString(),
                                        tags: result[0].tags,
                                        user: result[0].email,
                                        image:result0[0].Imagen_Perfil,
                                        answers: []
        
                                    };
                 
                                
                                    callback(null, question);
                                }
                            });
                        }
                        else if (rows.length > 0){
                            let answer = {
                                id: null,
                                id_question: null,
                                user: null,
                                votes: null,
                                body: null,
                                post_date: null
                            }

                            let answers = [];
                            

                            for (let i = 0; i < rows.length; i++) {
                                answer = {};
                                answer.id = rows[i].id_respuesta;
                                answer.id_question = rows[i].id_pregunta;
                                answer.user = rows[i].email_respuesta;
                                answer.votes = rows[i].votos_respuesta;
                                answer.body = rows[i].cuerpo_respuesta;
                                answer.image = rows[i].Imagen_Perfil;
                                answer.post_date = new Date(rows[i].fecha_publicacion).toDateString(),

                                answers.push(answer);
       
                            }
                            

                            let questions = {
                                id: rows[0].id_pregunta,
                                votes: rows[0].votos,
                                title: rows[0].titulo,
                                body: rows[0].cuerpo,
                                post_date: new Date(rows[0].fecha_publicacion).toDateString(),
                                tags: rows.tags,
                                image: rows[0].Imagen_Perfil,
                                user: rows[0].email,
                                tags:rows[0].tags,
                                answers: answers

                            };
                         
                        
                            callback(null, questions);
                    }
                });
            }
        });
    }
    
    searchQuestion(texto, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) callback(err, null);
            else {
                
                connection.query("SELECT *, GROUP_CONCAT(etiquetas.texto_etiquetas) tags FROM (preguntas LEFT JOIN etiquetas ON preguntas.id_pregunta = etiquetas.id_pregunta) where preguntas.titulo like ? or preguntas.cuerpo like ? GROUP BY preguntas.id_pregunta order by preguntas.fecha_publicacion DESC",["%"+texto+"%","%"+texto+"%"],
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
                                tags:null,
                                user:null
                            };
                    
                            let questions = [];

                    
                            for (let i = 0; i < rows.length; i++) {
                                    question = {};
                                    question.id = rows[i].id_pregunta;
                                    question.email = rows[i].email;
                                    question.votes = rows[i].votos;
                                    question.title=rows[i].titulo;
                                    question.body=rows[i].cuerpo;
                                    question.post_date = new Date(rows[i].fecha_publicacion).toDateString(),
                                    question.tags=rows[i].tags;
                                    question.user=rows[i].Nombre
                                    question.image = rows[i].Imagen_Perfil;
                                    questions.push(question);
                                    console.log(question.tags);
           
                            }
                           
                            callback(null, questions);
                        }
                    });
            }
        });
    }

 

    getNoAnsweredQuestions (callback){
    this.pool.getConnection(function(err,connection){
        if (err)callback(err,null);
        else {
            connection.query("SELECT *, GROUP_CONCAT(etiquetas.texto_etiquetas) tags FROM (preguntas LEFT JOIN etiquetas ON preguntas.id_pregunta = etiquetas.id_pregunta) where preguntas.id_pregunta not in (select id_pregunta from respuestas)  GROUP BY preguntas.id_pregunta order by preguntas.fecha_publicacion DESC",
            function (err, rows){
                connection.release();
                if(err){}
                else{
                    let question = {
                        id: null,
                        votes:null ,
                        title :null,
                        body:null,
                        post_date:null,
                        tags:null,
                        user:null
                    };
            
                    let questions = [];

            
                    for (let i = 0; i < rows.length; i++) {
                            question = {};
                            question.id = rows[i].id_pregunta;
                            question.email = rows[i].email;
                            question.votes = rows[i].votos;
                            question.title=rows[i].titulo;
                            question.body=rows[i].cuerpo;
                            question.post_date = new Date(rows[i].fecha_publicacion).toDateString(),
                            question.tags=rows[i].tags;
                            question.user=rows[i].Nombre
                            question.image = rows[i].Imagen_Perfil;
                            questions.push(question);
   
                    }
                   
                    callback(null, questions);
                }
                    });
            }
        });
    }

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
                                    question.votes = 0; //rows[i].votos;
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

   

  
    getAnswers(id_pregunta,callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) callback(err, null);
            else {
             
                connection.query("SELECT *, FROM respuestas where id_pregunta=? ",[id_pregunta],
                    function (err, rows) {
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
                                    answer.id_answer = rows[i].id_respuesta;
                                    answer.id_question = rows[i].id_pregunta;
                                    answer.email = rows[i].email;
                                    answer.votes = rows[i].votos;
                                    answer.body=rows[i].cuerpo;
                                    answer.image = rows[i].Imagen_Perfil;
                                    answer.post_date = new Date(rows[i].fecha_publicacion).toDateString(),
                                    answer.push(question);
           
                            }
                           
                            callback(null, answers);
                        }
                    });
            }
        });
    }
       
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