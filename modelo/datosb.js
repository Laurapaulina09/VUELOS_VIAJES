var conectar = require("./conectdb")

function Conexion() { }
//registro
Conexion.almacenarUsuario = (datos, cb) => {
    conectar.query(`INSERT INTO registro VALUES (${datos.cc},"${datos.nombres}","${datos.apellidos}","${datos.email}","${datos.contrasena}")`, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}
//iniciar sesion
Conexion.verificarUsuario = (datos, cb) => {
    var sql = `SELECT * FROM registro WHERE cedula =${datos.cc} and contraseña="${datos.contrasena}"`;
    conectar.query(sql, function (err, res) {
        if (err) {
            console.log("ERROR EN VERIFICAR USUARIO")
            console.log(err);
            throw err;
        } else {
            cb(res)
        }
    })

}
Conexion.AlmacenarVuelo = (datos, cb) => {
    conectar.query(`INSERT INTO vuelos_disponibles (origen,destino,hora_salida,precio,fecha) values ("${datos.origen}","${datos.destino}","${datos.hora}",${datos.precio},"${datos.fecha}")`,
        function (err, res) {
            if (err) {
                console.log(err)
            } else {
                cb()
               
            }
        })
}
Conexion.ConsultarVuelos = (cb) => {
    conectar.query("SELECT * FROM vuelos_disponibles",
        function (err, res) {
            if (err) {
                console.log(err)
            } else {
                cb(res)
            }
        })
}
Conexion.CrearReserva = (datos, cb) => {
    conectar.query(`INSERT INTO reserva (cc,id_vuelo) values (${datos.cedula},"${datos.id_vuelo}")`,
        function (err, res) {
            if (err) {
                console.log(err)
            } else {
                cb()
            }
        })
}
Conexion.CancelarReserva = (datos, cb) => {
    conectar.query(`DELETE FROM reserva WHERE id_reserva =${datos.id_reserva}`,
        function (err, res) {
            if (err) {
                console.log(err)
            } else {
                cb()
            }
        })
}
Conexion.ConsultarReserva = (datos, cb) => {
    conectar.query(`SELECT * FROM reserva Inner join vuelos_disponibles on reserva.id_vuelo = vuelos_disponibles.id_vuelo WHERE cc = ${datos.cedula}`, function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb(res)
        }
    })

}
Conexion.ModificarReserva=(datos,cb)=>{
    conectar.query(`Update reserva set id_vuelo=${datos.id_vuelo} where id_reserva=${datos.id_reserva}`,
    function (err, res) {
        if (err) {
            console.log(err)
        } else {
            cb()
        }
    })
}


module.exports = Conexion;