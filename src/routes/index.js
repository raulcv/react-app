const express = require('express');
const router = express.Router();
const main = require('../controllers/main');//llamando funcionalidades de rutas
const imagen = require('../controllers/imagen');
module.exports = app => {
    
    router.get('/', main.index);
    router.post('/', imagen.add);
    router.put('/:idimg', imagen.editar);
    router.delete('/:idimg', imagen.eliminar);
    router.get('/:idimg', imagen.obtener);
    
    //router.get('/images/:image_id', image.index);
    //router.post('/images', image.create);
    //router.post('/images/:image_id/like', image.like);
    //router.post('/images/:image_id/comment', image.comment);
    //router.delete('/images/:image_id', image.eliminar);
    
    app.use('/api/imgs',router);
};