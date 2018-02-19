import React from 'react';
import { Alert, Input, Form, FormGroup, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../css/moduloUsuarioAdministrador.css'; 

class ModalUsuarioEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChangeUsuario(e) {
        const { name, value } = e.target;
    var usuario = this.state.usuario;
    usuario[name] = value;
    this.setState({usuario})
  }
    handleSubmit(e) {
        e.preventDefault();

        alert("BIEN");
    }

  render() {
    return (
      <div>
        <Button color="success" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Editar"><FontAwesomeIcon name="edit"/></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> 
                Editar usuario 
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
                <img className="center-img" width="100px" height="100px" src={this.props.usuario['foto']} />
                <br />
                <div>
                  <br />
                    <Row>
                      <Col sm="12">
                          <FormGroup row>
                            <Label for="first_name" sm={2}>Cedula</Label>
                            <Col sm={10}>
                              <Input type="text" name="cedula" id="cedula" defaultValue={this.props.usuario['cedula']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="first_name" sm={2}>Primer Nombre</Label>
                            <Col sm={10}>
                              <Input type="text" name="first_name" id="first_name" defaultValue={this.props.usuario['first_name']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="first_name" sm={2}>Segundo Nombre</Label>
                            <Col sm={10}>
                              <Input type="text" name="first_name" id="first_name" defaultValue={this.props.usuario['segundo_nombre']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="first_name" sm={2}>Primer Apellido</Label>
                            <Col sm={10}>
                              <Input type="text" name="first_name" id="first_name" defaultValue={this.props.usuario['last_name']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="first_name" sm={2}>Segundo Apellido</Label>
                            <Col sm={10}>
                              <Input type="text" name="first_name" id="first_name" defaultValue={this.props.usuario['segundo_apellido']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="email" sm={2}>Correo</Label>
                            <Col sm={10}>
                              <Input type="email" name="email" id="email"  onChange={this.handleChangeUsuario} value={this.props.usuario['email']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="Celular" sm={2}>Celular</Label>
                            <Col sm={10}>
                              <Input type="number" name="celular" id="celular" onChange={this.handleChangeUsuario} value={this.props.usuario['celular']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="telefono_casa" sm={2}>Tlf. Casa</Label>
                            <Col sm={10}>
                              <Input type="number" name="telefono_casa" id="telefono_casa" onChange={this.handleChangeUsuario} value={this.props.usuario['telefono_casa']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="telefono_trabajo" sm={2}>Tlf. Trabajo</Label>
                            <Col sm={10}>
                              <Input type="number" name="telefono_trabajo" id="telefono_trabajo" onChange={this.handleChangeUsuario} value={this.props.usuario['telefono_trabajo']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="nacionalidad" sm={3}>Nacionalidad</Label>
                            <Col sm={9}>
                              <Input type="text" name="nacionalidad" id="nacionalidad" onChange={this.handleChangeUsuario} value={this.props.usuario['nacionalidad']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="sexo" sm={2}>Sexo</Label>
                            <Col sm={10}>
                              <Input value={this.state.value} defaultValue={this.props.usuario['sexo']} onChange={this.handleChangeUsuario} type="select" name="sexo" id="sexo">
                                <option value="M" name="M">M</option>
                                <option value="F" name="F">F</option>
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="estado_civil" sm={2}>Estado Civil</Label>
                            <Col sm={10}>
                              <Input value={this.state.value} defaultValue={this.props.usuario['estado_civil']} onChange={this.handleChangeUsuario} type="select" name="estado_civil" id="estado_civil">
                                <option value="Soltero" name="Soltero">Soltero</option>
                                <option value="Casado" name="Casado">Casado</option>
                                <option value="Viudo" name="Viudo">Viudo</option>
                                <option value="Divorciado" name="Divorciado">Divorciado</option>
                              </Input>
                            </Col>
                          </FormGroup>
                        
                      </Col>
                    </Row>
                </div>

            </ModalBody>
            <ModalFooter>
              <Button color="success" type="submit">Guardar</Button>{' '}
              <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
            </ModalFooter>
          </Form>
        </Modal>
        &nbsp;&nbsp; {/*Dummy Spaces*/}


        {/*Eliminar un usuario*/}
        <Button color="danger" size='sm' data-toggle="tooltip" title="Eliminar"><FontAwesomeIcon name="trash-alt"/></Button>
      </div>
    );
  }
}




export default ModalUsuarioEdit;