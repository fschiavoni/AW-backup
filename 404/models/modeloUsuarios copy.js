class modeloUsuarios {

    

    constructor(pool) {
        this.pool = pool;
    }

// DONE
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
                        connection.release();
                        if (err) callback(err, null);
                        else {
                            // Acceso a las filas resultado de la consulta
                            callback(null, result[0]);
                        }
                    }
                );                
            }
        });
    }

  
    //(DONE)
    getUser(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if(err) callback(err, null);
            else{
                connection.query(
                    "SELECT * FROM usuario WHERE email = ?", [email],
                    function(err, result) {
                        connection.release();
                        if (err) callback(err, null);
                        else callback(null, result);
                    }
                )
            }
        });
    }

    // Deberia cogerla con lo otro??
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

// Preguntar metodo de insercion
    newUser(user, callback){
        
        this.pool.getConnection(function (err, connection) {
            if(err) callback(err,null);
            else{
                connection.query(
                    "INSERT INTO usuario (Nombre, Email, Password,Imagen_Perfil)  VALUES (?, ?, ?,?)",[user.name,user.email, user.password,user.image],
                    //"SELECT * FROM USUARIO",
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