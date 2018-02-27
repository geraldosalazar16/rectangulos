const express = require('express');
const body_parser = require('body-parser');
const app = express();

//Conexion a la base de datos
/*
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "rectangulos"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
*/
app.use(body_parser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use( body_parser.json({ type: 'application/json' }) );

var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number, function(){
  console.log('servidor escuchando en puerto 3000');
});
//var calculo = require('./routes/calculo');
//app.use('/calculo',calculo);
app.post('/',function (req,res){
  /*
  var x = parseInt(req.body.x1||0);
    var y = parseInt(req.body.y1||0);
    var z = parseInt(req.body.z1||0);
*/
var x = req.body.x1||0;
  var y = req.body.y1||0;
  var z = req.body.z1||0;



    var puntos = new Array();

    var x_mas_z;
    var y_mas_z;

    if (x + z > 300) {
        x_mas_z = 300;
    }
    else {
        x_mas_z = x + z;
    }

    if (y + z > 300) {
        y_mas_z = 300;
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
        x1: 300 - z,
        y1: 0,
        x2: 300,
        y2: 300
    };
    //Este es el rectangulo lateral
    var rectangulo3 = {
        x1: 0,
        y1: 300 - z,
        x2: 300,
        y2: 300
    };
    var cont = 0;
    for (var i = 0; i < 300; i++) {
        for (var j = 0; j < 300; j++) {
            var punto = {
                x1: i,
                y1: j
            };

            var pos_rectangulo1 = punto_dentro_rectangulo(rectangulo1, punto);
            var pos_rectangulo2 = punto_dentro_rectangulo(rectangulo2, punto);
            var pos_rectangulo3 = punto_dentro_rectangulo(rectangulo3, punto);
            if (pos_rectangulo1 === false && pos_rectangulo2 === false && pos_rectangulo3 === false) {
                //Agrego el punto a la lista de posibles puntos
                puntos.push(punto);
            }
            cont++;
        }
    }

    //Si hay puntos validos
    if (puntos.length > 0 && puntos.length != 1) {
      var aleatoria = Math.random();
      console.log("aleatorio: "+aleatoria);
      aleatoria = aleatoria * puntos.length;
      console.log("longitud: "+puntos.length);
      var posicion = Math.floor(aleatoria);
      console.log("posicion: "+posicion);
        //Insertar en la base de datos
        /*
        var sql = "insert into puntos (X,Y) values("+puntos[posicion]["x1"]+","+puntos[posicion]["y1"]+")";
        
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("Result: " + result);
        });
        */
        res.json(
          [
            {
              'x1':x,
              'y1':y,
              'z1':z
            },
            {
              'x1':puntos[posicion]["x1"],
              'y1':puntos[posicion]["y1"],
              'z1':z
            }
          ]
        );
    }
    else if (puntos.length == 1) {
        res.json(
          [
            {
              'x1':x,
              'y1':y,
              'z1':z
            },
            {
              'x1':puntos[0]["x1"],
              'y1':puntos[0]["y1"],
              'z1':z
            }
          ]
          );
    }
    else {
        res.json(
          [
            {
              'x1':x,
              'y1':y,
              'z1':z
            },
            {
              'x1':'NO',
              'y1':'NO',
              'z1':'NO'
            }
          ]
          );
    }
});
function valida_valor(valor) {

}
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
