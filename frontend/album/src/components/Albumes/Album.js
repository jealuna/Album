import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import CardGroup from 'react-bootstrap/CardGroup';
import moment from 'moment';
import 'moment/locale/es';
import './Album.css';
import config from '../../config';

const path = config.API_PATH + 'albumes/';

export default class Album extends Component {
    constructor(props) {
        super(props)

        this.state = {
            albumes: [],
            form: {},
            dropdowntitulo: "Seleccione el tipo de cubierta",
        }
        this.sendForm = this.sendForm.bind(this)
        this.deleteAlbum = this.deleteAlbum.bind(this)
    }
    
    getalbumes() {
        fetch(path)
        .then(res => res.json())
        .then(albumes => this.setState({ albumes }))
        .catch(err => console.error(err))
    }

    deleteAlbum(ev) {
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
        .then(() => this.getalbumes())
        .catch(err => console.log(err));
    }

    changeValue(ev) {
        ev.preventDefault()
        this.setState({dropdowntitulo: ev.target.textContent})
    }

    sendForm(ev) {
        ev.preventDefault()
        console.log(this.state.form)
        fetch(
            path, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify(this.state.form)
        })
            .then(res => res.json())
            .then(() => this.getalbumes())
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this.getalbumes()
    }


    render () {
        return(
            <Container>
            <CardGroup>
                    <Form>
                        <Card 
                            className="m-1" 
                            style={{ width: '18rem', maxWidth: '18rem', minWidth: '18rem'}}>
                        <Card.Body>
                            <Card.Title>
                            <Form.Group>
                                <Form.Control 
                                type="text" 
                                placeholder="Ingrese el título" 
                                id="title"
                                required
                                onChange={(ev) => { this.setState({ form: { ...this.state.form, Title: ev.target.value } }) }}
                                />
                            </Form.Group>
                            </Card.Title>
                            <Card.Text>
                                <Form.Group>
                                <DropdownButton
                                    alignRight
                                    title={this.state.dropdowntitulo}
                                    id="Cover"
                                >
                                <Dropdown.Item
                                    onClick={(ev) => {this.changeValue(ev); this.setState({ form: { ...this.state.form, Cover: ev.target.id } }) }} 
                                    id="S"
                                >Suave</Dropdown.Item>
                                <Dropdown.Item 
                                    onClick={(ev) => {this.changeValue(ev); this.setState({ form: { ...this.state.form, Cover: ev.target.id } }) }} 
                                    id="H"
                                >Dura</Dropdown.Item>
                                </DropdownButton>
                                </Form.Group>
                            </Card.Text>
                            <Button 
                                type="submit" 
                                className="btn btn-primary" 
                                onClick={this.sendForm}>Agregar Album
                            </Button>
                        </Card.Body>
                        </Card>
                    </Form>
                {
                    this.state.albumes.map((album) => (
                            <Card 
                                className="m-1" 
                                style={{ width: '18rem', maxWidth: '18rem', minWidth: '18rem'}}>
                            <Card.Body>
                            <Card.Title>{album.Title}</Card.Title>
                                <Card.Text>
                                    {album.fotos.length} Fotos<br />
                                    Fecha de creación {moment(album.DateOfCreation).fromNow()}
                                </Card.Text>
                                <ButtonToolbar>
                                <Button as={Link} to={{
                                            pathname: '/fotos',
                                            state: {
                                                fotos: album.fotos,
                                                idAlbum: album.id
                                            }}} 
                                            variant="primary" className="mr-1">Ver</Button>
                                <Button
                                    id={album.id}
                                    type="submit" 
                                    className="btn btn-danger"
                                    onClick={this.deleteAlbum}
                                >Eliminar</Button>
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