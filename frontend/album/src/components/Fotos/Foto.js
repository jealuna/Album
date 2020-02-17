import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import CardGroup from 'react-bootstrap/CardGroup';
import moment from 'moment';
import 'moment/locale/es';
import './Foto.css';
import config from '../../config';

const path = config.API_PATH + 'fotos/';
const pathAlbum = config.API_PATH + 'albumes/';

export default class Album extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fotos: [],
            form: {},
            idAlbum: '',
        }
        this.sendForm = this.sendForm.bind(this)
        this.deleteFoto = this.deleteFoto.bind(this)
    }

    handleErrors(response) {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response;
    }

    getfotos() {
        let pathFotos = pathAlbum + this.state.idAlbum + '/'
        fetch(pathFotos)
        .then(this.handleErrors)
        .then(res => res.json())
        .then(albumes => {
            this.setState({ fotos: albumes.fotos })
        })
        .catch(err => console.error(err))
    }

    sendForm(ev) {
        ev.preventDefault()
        const data = new FormData();
        this.state.form.IdAlbum = this.state.idAlbum
        data.append('Caption', this.state.form.Caption)
        data.append('imagen', this.state.form.imagen)
        data.append('IdAlbum', this.state.idAlbum)
        fetch(
            path, {
                method: 'POST',
            body: data
        })
            .then(res => res.json())
            .then(() => this.getfotos())
            .catch(err => console.log(err))
    }

    deleteFoto(ev) {
        ev.preventDefault()
        let id = ev.target.id
        let pathdelete = path + id + '/'
        fetch(
            pathdelete, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .then(() => this.getfotos())
        .catch(err => console.log(err));
    }

    componentDidMount() {
        const { handle } = this.props.match.params
        const { fotos } = this.props.location.state
        const { idAlbum } = this.props.location.state
        this.setState({fotos: fotos})
        this.setState({idAlbum: idAlbum})
        console.log(idAlbum);
    }

    render () {
        return(
            <Container>
                <CardGroup>
                    <Form id="PostFomr">
                        <Card 
                            className="m-1" 
                            style={{ width: '18rem', maxWidth: '18rem', minWidth: '18rem'}}>
                        <Card.Body>
                            <Card.Title>
                            <Form.Group>
                                <Form.Control 
                                type="text" 
                                placeholder="Ingrese el título de la imagen" 
                                id="title"
                                required
                                onChange={(ev) => { this.setState({ form: { ...this.state.form, Caption: ev.target.value } }) }}
                                />
                                <Form.Control 
                                    type="text" 
                                    value={this.state.idAlbum}
                                    id="album"
                                    hidden                    
                                    required
                                    readOnly
                                    onChange={(ev) => { this.setState({ form: { ...this.state.form, IdAlbum: ev.target.value } }) }}
                                />
                            </Form.Group>
                            </Card.Title>
                            <Card.Text>
                                <Form.Group>
                                <Form.Control 
                                    type="file" 
                                    id="album"            
                                    required
                                    onChange={(ev) => { this.setState({ form: { ...this.state.form, imagen: ev.target.files[0] } }) }}
                                />
                                </Form.Group>
                            </Card.Text>
                            <Button 
                                type="submit" 
                                className="btn btn-primary" 
                                onClick={this.sendForm}
                                >Agregar Imagen
                            </Button>
                        </Card.Body>
                        </Card>
                    </Form>
                {
                    this.state.fotos.map((foto) => (
                            <Card                             
                                className="m-1" 
                                style={{ width: '18rem', maxWidth: '18rem', minWidth: '18rem'}}>
                            <Card.Img variant="top" src={foto.imagen} style={{ width: '186', height:'107' }}/>
                            <Card.Body>
                            <Card.Title>{foto.Caption}</Card.Title>
                                <Card.Text>
                                    Fecha de creación {moment(foto.DateOfCreation).fromNow()}
                                </Card.Text>
                                <ButtonToolbar>
                                <a className="btn btn-primary btn-lg mr-1" 
                                    href={foto.imagen}
                                    target="_blank">Ver Foto
                                </a>
                                <Button 
                                    id={foto.id}
                                    type="submit" 
                                    className="btn btn-danger"
                                    onClick={this.deleteFoto}
                                >Eliminar Foto</Button>
                                </ButtonToolbar>
                            </Card.Body>
                            </Card>
                    ))
                }
                </CardGroup>
            </Container>
        )
    }
}