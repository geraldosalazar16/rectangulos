var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PuntosSchema = new Schema(
  {
    x: {type: Number, required: true, max: 1000},
    y: {type: Number, required: true, max: 1000},
    z: {type: Number, required: true, max: 1000},
  }
);

module.exports = mongoose.model('Puntos', PuntosSchema);
