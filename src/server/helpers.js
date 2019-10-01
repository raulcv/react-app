const moment = require('moment');

const helpers = {};

helpers.tiempoatras = fecha => {
    return moment(fecha).startOf('minutes').fromNow();

};

module.exports = helpers;