import React, { Component } from 'react';
import request from 'superagent';
import Rect from 'react-konva';
import { Stage, Layer, Text } from 'react-konva';
import Konva from 'konva';

class App extends Component{

//Pinta el componente
  render(){
    return(
    <div>
      <Tabla></Tabla>
      </div>
    )
  }
}

class Header extends Component{
constructor(props){
  super(props)
}
  render(){
    let punto = this.props.punto;
    if(punto.x1 !== 'N'&&punto.x1 !== 'NO'){
      return(
        <h1>Punto calculado x: {punto.x1}, y: {punto.y1}</h1>
      )
    }
    else if(punto.x1 == 'NO'){
      return <h1>No existen puntos validos</h1>
    }
    else{
      return <h1>Punto sin calcular</h1>
    }
  }
}

class Canvas extends Component{
constructor(props){
  super(props);
  this.updateCanvas = this.updateCanvas.bind(this);
}
componentDidMount() {
      this.updateCanvas();
  }
  componentDidUpdate(){
    this.updateCanvas();
  }
  updateCanvas() {
    const ctx = this.refs.canvas_total.getContext('2d');
    var my_gradient=ctx.createLinearGradient(0,0,0,100);
    my_gradient.addColorStop(0,"blue");
    my_gradient.addColorStop(1,"blue");
    ctx.fillStyle=my_gradient;
    ctx.fillRect(0,0, 300, 300);

    ctx.fillStyle="#000000";
    ctx.fillRect(this.props.puntos[1].x,this.props.puntos[1].y, this.props.puntos[1].w, this.props.puntos[1].h);

    if(this.props.puntos[0].x !== 'NO')
    {
      ctx.fillStyle="#FF0000";
      ctx.fillRect(this.props.puntos[2].x,this.props.puntos[2].y, this.props.puntos[2].w, this.props.puntos[2].h);
    }
  }
  render() {
      return (
          <canvas ref="canvas_total" width={300} height={300}/>
      );
  }
}

class Tabla extends Component{
constructor(){
  super();
  this.state = {
    puntos: [
    {
    'x1':'N',
    'y1':'N'
    },
    {
      'x':'0',
      'y':'0',
      'w':'0',
      'h':'0'
    },
    {
      'x':'0',
      'y':'0',
      'w':'0',
      'h':'0'
    }
    ]
  }

  this.handleSubmit = this.handleSubmit.bind(this);
}

handleSubmit(event) {
/*
let x = parseInt(this.refs.valor_x.value);
let y = parseInt(this.refs.valor_y.value);
let z = parseInt(this.refs.valor_z.value);
*/
let x = this.refs.valor_x.value*300;
let y = this.refs.valor_y.value*300;
let z = this.refs.valor_z.value*300;

let currentComponent = this;
event.preventDefault();
   request
   .post('http://localhost:3000')
   .set('Content-Type', 'application/json')
   .send({x1:x})
   .send({y1:y})
   .send({z1:z})
   .then(function(res){
      let punto_inicial = res.body[0];
      let punto = res.body[1];
      let estado = [
      {
        'x1':punto.x1,
        'y1':punto.y1
      },
      {
        'x':punto_inicial.x1,
        'y':punto_inicial.y1,
        'w':punto_inicial.z1,
        'h':punto_inicial.z1
      },
      {
        'x':punto.x1,
        'y':punto.y1,
        'w':punto.z1,
        'h':punto.z1
      }];

      currentComponent.setState({
        puntos : estado
      });
   });
 }
  render(){
    return(
    <div id = "parent">
      <Header punto = {this.state.puntos[0]}/>
      <form onSubmit={this.handleSubmit}>
        <table class="table table-striped">
          <thead>
            <tr class="headings">
              <th class="column-title">Capturar valor x</th>
              <th class="column-title">Capturar valor y</th>
              <th class="column-title">Capturar valor z</th>
            </tr>
          </thead>

        <tbody id="tbodyServicios">
          <tr>
            <td>
              <input type="number" step="0.1" min="0" max="1" name="valor_x" ref="valor_x"/>
            </td>
            <td>
              <input type="number" step="0.1" min="0" max="1" name="valor_y" ref="valor_y"/>
            </td>
            <td>
              <input type="number" step="0.1" min="0" max="1" name="valor_z" ref="valor_z"/>
            </td>
          </tr>
        </tbody>
  	    <input type="submit" value="Calcular" class="btn btn-primary btn-xs " >
        </input>
      </table>
      </form>
      <Canvas puntos = {this.state.puntos}/>
      </div>
    )
  }
}

export default App;
