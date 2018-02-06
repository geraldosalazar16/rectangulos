// JavaScript source code
var express = require('express');
var router = express.Router();

// Require controller modules.
//var puntos_controller = require('../controllers/puntosController');

/// BOOK ROUTES ///

// GET catalog home page.
//router.get('/:id', puntos_controller.calculo);
router.post('/', function (req, res) {
    var x = req.body.valor_x * 100;
    var y = req.body.valor_y * 100;
    var z = req.body.valor_z * 100;

    var puntos = new Array();

    var x_mas_z;
    var y_mas_z;

    if (x + z > 100) {
        x_mas_z = 100;
    }
    else {
        x_mas_z = x + z;
    }

    if (y + z > 100) {
        y_mas_z = 100;
    }
    else {
        y_mas_z = x + z;
    }
    if (x - z < 0) {
        x_menos_z = 0;
    }
    else {
        x_menos_z = x - z;
    }
    if (y - z < 0) {
        y_menos_z = 0;
    }
    else {
        y_menos_z = y - z;
    }
    //este es el rectangulo que se crea con el punto
    var rectangulo1 = {
        x1: x_menos_z,
        y1: y_menos_z,
        x2: x_mas_z,
        y2: y_mas_z
    };
    //Este es el rectangulo inferior
    var rectangulo2 = {
        x1: 100 - z,
        y1: 0,
        x2: 100,
        y2: 100
    };
    //Este es el rectangulo lateral
    var rectangulo3 = {
        x1: 0,
        y1: 100 - z,
        x2: 100,
        y2: 100
    };
    var cont = 0;
    for (var i = 0; i < 99; i++) {
        for (var j = 0; j < 99; j++) {
            var punto = {
                x1: i,
                y1: j
            };
            if (j == 29 && i == 42) {
                var c = 0;
            }
            var pos_rectangulo1 = punto_dentro_rectangulo(rectangulo1, punto);
            var pos_rectangulo2 = punto_dentro_rectangulo(rectangulo2, punto);
            var pos_rectangulo3 = punto_dentro_rectangulo(rectangulo3, punto);
            if (pos_rectangulo1 === false && pos_rectangulo2 === false && pos_rectangulo3 === false) {
                //Agrego el punto a la lista de posibles puntos
                puntos[cont] = punto;
            }
        }
        cont++;
    }
    //Si hay puntos validos
    if (puntos.length > 0 && puntos.length != 1) {
        //var punto_seleccionadores.send('x :'+puntos[Math.random() * (puntos.length)]["x"]+', y: '+puntos[Math.random() * (puntos.length)]["y"]);
        var posicion = Math.floor(Math.random() * (puntos.length + 1));
        res.send("punto seleccionado: x: " + puntos[posicion]["x1"] + ", y: " + puntos[posicion]["y1"]);
    }
    else if (puntos.length == 1) {
        res.send('Un solo punto encontrado x :' + puntos[0]["x1"] + ', y: ' + puntos[0]["y1"]);
    }
    else {
        res.send('No hay puntos validos');
    }
});

function punto_dentro_rectangulo(rectangulo, punto) {
    var resultado;
    if (punto.x1 >= rectangulo.x1 && punto.x1 <= rectangulo.x2 && punto.y1 >= rectangulo.y1 && punto.y1 <= rectangulo.y2) {
        resultado = true;
    }
    else {
        resultado = false;
    }
    return resultado;
}
module.exports = router;
