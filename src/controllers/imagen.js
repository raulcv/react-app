const path = require('path');
//const { randomNumber } = require('../helpers/libs');
const fs = require('fs-extra');
//const md5 = require('md5');

const { Imagen, Comentario } = require('../models');
//const barralateral = require('../helpers/barralateral');

const crtl = {};

//Esto carga las imagenes en la segunda pestaña
crtl.index = async (req, res) => {
    let vistaModelo = { imgobtenida: {}, comentarioobtenido: {} };
    const imgobtenida = await Image.findOne({ nombreimg: { $regex: req.params.image_id } });
    if (imgobtenida) {
        imgobtenida.vistas = imgobtenida.vistas + 1;
        vistaModelo.imgobtenida = imgobtenida;
        await imgobtenida.save();
        const comentarioobtenido = await Comentario.find({ id_img: imgobtenida._id });
        vistaModelo.comentarioobtenido = comentarioobtenido;
        vistaModelo = await barralateral(vistaModelo); //Añadiendo datos de estadisticas
        res.render('image', vistaModelo);
    } else {
        res.redirect('/')
    }
};

crtl.obtener = async (req, res) => {
    const imagen = await Imagen.findById(req.params.idimg);
    res.json(imagen);
};

crtl.add = async (req, res) => {
    const {titulo, nombre, vistas, likes, estado, fecha} = req.body;
    const img = new Imagen({titulo, nombre, vistas, likes, estado, fecha}) 
    await img.save();
    console.log(img); //body biene del formulario que nos envia el servidor en config. app.use(express(json))
    res.json({status: 'Imagen guardado'});
};

crtl.editar = async (req, res) => {
    const {titulo, nombre, vistas, likes, estado, fecha} = req.body;//body biene del formulario que nos envia el servidor en config. app.use(express(json))
    const nuevoImg = {titulo, nombre, vistas, likes, estado, fecha };
    await Imagen.findByIdAndUpdate(req.params.idimg, nuevoImg, {useFindAndModify: false});
    res.json({status: 'Imagen Modificado'});
};

crtl.eliminar = async (req, res) => {
    await Imagen.findByIdAndRemove(req.params.idimg, {useFindAndModify: false});
    res.json({status: 'Imagen Eliminado'});
};


crtl.create = (req, res) => {
    const guardarimg = async () => {
        const imgUrl = randomNumber();
        const imagenes = await Image.find({ nombreimg: imgUrl });
        if (imagenes.length > 0) {
            guardarimg();
        } else {
            const imageTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase(); //toLOwerCae()=Para que la extension .JPG lo convierta a minsucula
            const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`); //Aqui es para mover la imagen de temp a upload 
            if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
                await fs.rename(imageTempPath, targetPath);
                const nuevoImg = new Image({
                    titulo: req.body.titulo,
                    nombreimg: imgUrl + ext,
                    descripcion: req.body.descripcion,
                });
                const ImgGuardado = await nuevoImg.save();
                res.redirect('/images/' + imgUrl);
            } else {
                await fs.unlink(imageTempPath);
                res.status(500).json({ error: 'Solo estan permitidas las imagenes' })
            }
        }
    };
    guardarimg();
};

crtl.like = async (req, res) => {
    const imgobtenida = await Image.findOne({nombreimg: {$regex: req.params.image_id}})
    if ( imgobtenida ) {
        imgobtenida.likes = imgobtenida.likes + 1;
        await imgobtenida.save();
        res.json({likes: imgobtenida.likes});
    } else {
        res.status(500).json({error: 'Parece que esta imagen tiene problemas'})
    }
};

crtl.comment = async (req, res) => {
    const img = await Image.findOne({ nombreimg: { $regex: req.params.image_id } });
    if (img) {
        const nuevoComentario = new Comentario(req.body);
        nuevoComentario.gravatar = md5(nuevoComentario.email); //md5 para convertir e correo en un hash
        nuevoComentario.id_img = img._id;
        nuevoComentario.save();
        res.redirect('/images/' + img.uniqueId);
    } else {
        res.redirect('/');
    }
};
/*
crtl.eliminar = async (req, res) => {
    const img = await Image.findOne({nombreimg: {$regex: req.params.image_id}});
    if(img){
        await fs.unlink(path.resolve('./src/public/upload/' + img.nombreimg));
        await Comentario.deleteOne({id_img: img._id});
        await img.remove();
        res.json(true);
    }
};*/

module.exports = crtl;