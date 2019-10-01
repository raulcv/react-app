const crtl = {};

const { Imagen } = require('../models');

//const barralateral = require('../helpers/barralateral');

crtl.index = async (req, res) => {
    const imagenes = await Imagen.find();
    console.log(imagenes);
    res.json(imagenes)

    /*const imgs = await Image.find().sort({fecha: -1});
    let vistaModelo = {imgs: []};
    vistaModelo.imgs = imgs;
    vistaModelo = await barralateral(vistaModelo); //Funcion asincrona que añade al modelo de imagenes los datos de barralateral
    //res.render('index', {imgs}); //antes de añadir las funciones de barra lateral
    //console.log(vistaModelo.barralateral.comentariosnovedosos[0].img);
    console.log(vistaModelo.barralateral);
    res.render('index', vistaModelo);*/
};

module.exports = crtl;