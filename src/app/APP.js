import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = { titulo: '', nombre: '', vistas: 0, likes: 0, estado: true, fecha: Date.now, _id: '', imgs: [] }; //Estos son eventos de mi app

        this.addimg = this.addimg.bind(this);
        this.manejaCambio = this.manejaCambio.bind(this);

    };

    addimg(e) {
        e.preventDefault();
        if(this.state._id){
            fetch(`/api/imgs/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Imagen Editado'});
                this.setState({ titulo: '', nombre: '', vistas: 0, likes: 0, estado: true, fecha: Date.now, _id: '' });
                this.obtenerimg();
            });

        } else {
                    //Aqui tambien se `puede pasar la direcion exacta de mi servidor de api
        fetch('/api/imgs', {
            method: 'POST',
            body: JSON.stringify(this.state), //Puedo enviar tamien aqui un objeto, enviar estado en cencillo en este casp
            headers: {
                'Accept': 'application/json', //Incido que tipo de contenido es formato Json
                'Content-Type': 'application/json'
            } //este es un OJB
        }) //Enviando peticion al servidor 
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({ html: 'Imagen Subido' }); //Enviando mesaje con MaretialLice de forma cencilla
                this.setState({ titulo: '', nombre: '', vistas: 0, likes: 0, estado: true, fecha: Date.now });//Limpiando controles
                this.obtenerimg();
            })
            .catch(err => console.error(err));
        }
    }

    eliminarimg(id) {
        if (confirm('¿Estas seguro de Eliminar la Imagen?')) {
            fetch(`/api/imgs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }) //fetch('/api/imgs/'+ id) es lo mimso
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    M.toast({ html: 'Imagen Eliminado' });
                    this.obtenerimg();
                });
        }
    }

    editarimg(id) {
        fetch('/api/imgs/' + id)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({
                    titulo: data.titulo,
                    nombre: data.nombre,
                    _id: data._id
                });
            });
    }

    componentDidMount() {
        this.obtenerimg();
    } //Apenas mi app carga ejecuta esto.

    obtenerimg() {
        fetch('/api/imgs')
            .then(res => res.json())
            .then(data => {
                this.setState({ imgs: data });
                console.log(this.state.imgs);
            });
    }

    manejaCambio(e) {//Por no poner (e) me sabia error al tipear algo
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                {/* NAVEGACION-puedo reutilizar con react router */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Reactt RAULC IMGS</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addimg}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="titulo" onChange={this.manejaCambio} value={this.state.titulo} type="text" placeholder="Descripcion" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea className="materialize-textarea" name="nombre"
                                                    onChange={this.manejaCambio} value={this.state.nombre}
                                                    placeholder="Aqui la imagen"></textarea>
                                            </div>
                                        </div>
                                        <button className="btn btn-light-blue darken-4" type="submit">
                                            Subir ahora
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Imagen</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.imgs.map(img => {
                                            return (
                                                <tr key={img._id}>
                                                    <td>{img.titulo}</td>
                                                    <td>{img.nombre}</td>
                                                    <td>
                                                        <button onClick={() => this.eliminarimg(img._id)} className="btn light-blue darken-4">
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button onClick={() => this.editarimg(img._id)} className="btn light-blue darken-4" style={{ margin: '4px' }}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )//cada img le paso el _id
                                        })//recorriendo el arreglo de imagenes
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
} //Todo este sistaxis es JSX combina html y .js




export default App;