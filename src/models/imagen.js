const mongoose = require('mongoose');

const { Schema } = mongoose;

const EsquemaImagen = new Schema({
    titulo: {type: String},
    nombre: {type: String},
    vistas: {type: Number},
    likes: {type: Number},
    estado: {type: Boolean, defaul: true},
    fecha: {type: Date, default: Date.now}
}); 


module.exports = mongoose.model('Imagen', EsquemaImagen);
