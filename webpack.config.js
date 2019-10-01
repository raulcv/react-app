module.exports = {
    entry: './src/app/index.js', //De donde va salir los archivos que se van a convertir 
    output: {
        path: __dirname + '/src/public', //esto va publicar-colocar mi codigo en esta carpeta
        filename: 'bundle.js' //Codigo convertido 
    },
    module: {
        rules: [
            {
                use: 'babel-loader', //Gracias a esto webPack se comunica con  babel y traducir el codigo
                test: /\.js$/, //Indicando que tome todos los archivos JS que encuentre en mi Aplicacion. Es una expresion regular
                exclude: /node_modules/ //Indico que no tome los archivos que estan en mi carpeta node_modules
            }//objeto
        ]// propiedad llamada rules en que contiene varios objetos
    } //Esto es un Obtejo
};