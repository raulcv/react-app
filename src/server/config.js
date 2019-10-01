const path = require('path'); //permite unir directorios

//const exphbs = require('express-handlebars');
const morgan = require('morgan');//se encuentra como logger en libros
//const multer = require('multer');
const express = require('express');
//const errorHandler = require('errorhandler');

const routes = require('../routes/index');

module.exports = app => {

    //Configuraciones
    app.set('port', process.env.PORT || 3000);
    //app.set('views', path.join(__dirname, '../views'));
   /* app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));
    app.set('view engine', '.hbs');*/

    //Midlewares
    app.use(morgan('dev'));
    //app.use(multer({dest: path.join(__dirname,'../public/upload/temp')}).single('image'))//le digo donde se subiran las imagenes
    app.use(express.urlencoded({extended: false})); //Para recibir datos de los formulario
    app.use(express.json()); //Para no recargar la web, recibir y envar datos en formato json entre servidor y cliente(React)

    //Rutas
    routes(app);
    
    //Archivos estaticos
    app.use(express.static(path.join(__dirname, '../public')));

    //Errorhandler
  /*  if('development' === app.get('env')){
        app.use(errorHandler)
    }*/

    return app;
}