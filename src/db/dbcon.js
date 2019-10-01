const mongoose = require('mongoose');

const {database} = require('./keys')

mongoose.connect(database.URI, {
    useNewUrlParser: true //Puede que esto no sea cesesario despues, es solo bug de mongo
})
    .then(db => console.log('DB conectado'))
    .catch(err => console.log(err));