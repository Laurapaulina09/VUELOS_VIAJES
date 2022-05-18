const req = require("express/lib/request")
const res = require("express/lib/response")
var conectar = require("../modelo/datosb")
var express = require("express"),
    path = require('path'),
    router = express.Router()
router
    .post("/CrearUsuario", (req, res) => {
        var datos = {
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            cc:req.body.cedula,
            email:req.body.correo,
            contrasena: req.body.contrasena,
        }
        conectar.almacenarUsuario(datos, () => {
            res.send('usuario Registrado')
        })


    })
    
    .post('/verificarUsuario', (req, res) => {
        var datos = {
            cc: req.body.cedula,
            contrasena: req.body.contrasena
        }
        var respuesta;
        conectar.verificarUsuario(datos, (usuario) => {
            if (usuario.length == 1) {
                respuesta = { mensaje: 'usuario si existe' }
                return res.send(respuesta);
            } else {
                respuesta = { mensaje: 'usuario no existe' }
                return res.send(respuesta)
            }
        })
    })
    .post('/CrearVuelos',(req,res)=> {
        var datos={
            origen:req.body.origen,
            destino:req.body.destino,
            hora:req.body.hora_salida,
            precio:req.body.precio,
            fecha:req.body.fecha
        }
        conectar.AlmacenarVuelo(datos, ()=> {
                res.send('Vuelo creado')
        })
    })
    .get('/ConsultarVuelos',(req,res)=>{
        conectar.ConsultarVuelos((listaVuelos)=>{
            res.send({vuelos:listaVuelos})
        })
    })
    .post('/CrearReserva',(req,res)=>{
        var datos={
            cedula:req.body.cedula,
            id_vuelo:req.body.id_vuelo
        }
        conectar.CrearReserva(datos,()=>{
            res.send('Reserva Creada')
        })
    })
    .delete('/CancelarReserva',(req,res)=>{
        var datos={
            id_reserva:req.body.id_reserva,
        }
        conectar.CancelarReserva(datos,()=>{
            res.send('Reserva Cancelada')
        })
    })
    .get('/ConsultarReservas/:cedula',(req,res)=>{
        var datos={
            cedula:req.params.cedula,
        }
        conectar.ConsultarReserva(datos,(respuesta)=>{
            res.send(respuesta)
        })
    })
    .put('/ModificarReserva',(req,res)=>{
        var datos={
            id_vuelo:req.body.id_vuelo,
            id_reserva:req.body.id_reserva
        }
        conectar.ModificarReserva(datos,()=>{
            res.send('Reserva Modificada')
        })

    })

module.exports = router