//import('mysql');
var mysql = require('mysql');

var conexion = mysql.createConnection({
    host: 'mysql.db.mdbgo.com',
    user: 'ivo_calveira_calveiraivo',
    password: 'Admin2024!**',
    database: 'ivo_calveira_clinica',
    port: 3306
});

function conectar(){

    conexion.connect(function(err){
        if(err) console.log(err);
        else
        console.log('conexion exitosa');
    })

}

exports.buscarPersonas= function(respuesta){
    conectar();
    conexion.query("SELECT * FROM usuario", function(err, resultado, filas){
        if(err) throw err;
        console.log(resultado);
        respuesta(resultado);
    });
}

exports.insertarPersona = function(usuario, retornar){
    conectar();

    var sql = "INSERT INTO usuario (nombre, apellido, mail, fec_nac, user, password, tipo_usuario, foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    var values = [usuario.nombre, usuario.apellido, usuario.mail, usuario.nacimiento, usuario.user,usuario.password, usuario.tipo_usuario, usuario.foto_perfil];
    
    conexion.query(sql, values,
        function(err, resultado){
           if(err) throw err;
           console.log(resultado);
           
           const idmedico = resultado.insertId;
           if(usuario.tipo_usuario == 2){
            //acá inserta en la tabla médicos
               var sql2 = "INSERT INTO medico (id_usuario, especialidad, foto_especialidad, autorizado) VALUES (?, ?, ?, ?)";
               var medico = [idmedico, usuario.especialidad, usuario.foto_especialidad, usuario.autorizado];
               conexion.query(sql2, medico,
                function(err, resultadomedico, filas){
                    if(err) throw err;
                    console.log(resultadomedico);
            //acá inserta en la tabla dias_habiles  
                const idhabiles = resultadomedico.insertId;
                var sql3 = "INSERT INTO dias_habiles (id_medico, lunes, martes, miercoles, jueves, viernes, horas_desde, horas_hasta) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                var dias = [idhabiles, usuario.dias_habiles[0], usuario.dias_habiles[1], usuario.dias_habiles[2], usuario.dias_habiles[3], usuario.dias_habiles[4], usuario.horario_desde, usuario.horario_hasta];
                conexion.query(sql3, dias,
                    function(err, resultadodias, filas){
                        if(err) throw err;
                        console.log(resultadodias);
                        
                        return retornar(resultadodias);
                    });
                });
            }
        });
}


exports.borrarPersona = function(usuario, retornar){
    conectar();
    var sql = "DELETE from usuario WHERE usuario = ";
    sql = sql + "'" + usuario.user + "'";

    conexion.query(sql,
        function(err, resultado, filas){
           if(err) throw err;
           console.log(resultado);
           
           retornar(resultado);
   
       } );


}

