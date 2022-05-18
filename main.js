//SERVIDOR

//llamar paquetes
const express=require("express"),
    reload = require('reload'),
    rutas = require('./Rutas/rutas.js'),
    app=express(),
    puerto=3001

//Se pone al descubierto la carpeta publica
//app.use(express.static(__dirname+'/Public'))

app.use(express.json())

//Express usa las rutas creadas en el archivo rutas.js
app.use(rutas)


    //Se inicializa el servidor
app.listen(puerto,()=>{
    console.log("Servidor inicializado")
    })




