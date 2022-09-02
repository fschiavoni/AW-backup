class modeloUsuarios {

    

    constructor(pool) {
        this.pool = pool;
    }

//DONE
    userExist(email, password, callback) {
        this.pool.getConnection(function (err, connection) {

            if (err) callback(err, null);
            else {
                
                // ... realizar consulta ...
                connection.query(
                    "SELECT * FROM usuario WHERE email = ? AND password = ?", [email, password],
                    function (err, rows) {
                        connection.release();
                        if (err) callback(err, null);
                        else {
                            // Acceso a las filas resultado de la consulta
                            let cont = 0;
                            rows.forEach(function () {
                                cont++;
                            });
                            if (cont > 0) {
                                callback(null, rows[0]);
                                
                            }
                            else callback(null, rows[0]);
                        }
                    }
                );
            }
        });
    }
// DONE
    verifyUser(email, callback){
        this.pool.getConnection(function (err, connection) {
            if (err) callback(err, null);
            else {
                connection.query(
                    "SELECT * FROM usuario WHERE email = ?", [email],
                    function (err, result) {
                        console.log("usuario verificado"),
                        connection.release();
                        if (err) callback(err, null);
                        else {
                            if (result.length){
                                callback(null,true);
                            }
                            else callback(null,false)
                            callback(null, result[0]);
                        }
                    }
                );                
            }
        });
    }

  

    getUser(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if(err) callback(err, null);
            else{
                connection.query(
                    "SELECT * FROM usuarios WHERE email = ?", [email],
                    function(err, row) {
                        connection.release();
                        if (err) callback(err, null);
                        else callback(null, row);
                    }
                )
            }
        });
    }


    getImage(id,callback){        
        this.pool.getConnection((error,conexion)=>{
            if(error){
                callback(error);
            }else{                
                conexion.query("SELECT Imagen_Perfil FROM usuario WHERE name= ?",[id],(error,result)=>{
                    conexion.release();
                    if(error){
                        callback(error);
                    }else{
                        if(result[0].length === 0){
                            callback(null,undefined);
                        }else{
                            console.log(result[0].Imagen_Perfil);
                            callback(null,result[0].Ìmagen_Perfil);
                        }
                        
                    }
                });
                
            }
        });
    }

//DONE
    newUser(user, callback){
        
        this.pool.getConnection(function (err, connection) {
            if(err) callback(err,null);
            else{
                connection.query(
                    "INSERT INTO usuario (email, password,apodo,num_preguntas,num_respuestas,reputacion,fecha_alta,img)  VALUES (?,?,?,0,0,0,'2008-11-11',?)",[user.email, user.password,user.name,user.image],
                
                    function(err, inserted) {               
                        connection.release();
                        if (err) callback(err); 
                        else callback(null, inserted);
                    }
                )
            }
        });
    }
}

module.exports = modeloUsuarios;