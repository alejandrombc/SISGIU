import React from 'react';
import { Input, Form, FormGroup, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../css/moduloUsuarioAdministrador.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// Components
import { crearUsuario } from '../actions/moduloUsuarioAdministrador';

class ModalUsuarioNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      usuario: {
        cedula: '',
        first_name: '',
        segundo_nombre: '',
        last_name: '',
        segundo_apellido: '',
        email: '',
        celular: '',
        telefono_casa:'',
        telefono_trabajo: '',
        nacionalidad: '',
        sexo: 'M',
        estado_civil: 'Soltero',
        password: '',
      },
      direccion: '',
      rif: '',
      curriculum: '',
      permiso_ingresos: '',
      coordinador: false,
      tipo_postgrado: 'doctorado',
      id_tipo_postgrado: '1',
      id_estado_estudiante: '1',
      estado_estudiante: '',

    };

    this.toggle = this.toggle.bind(this);
    this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
    this.handleChangeExtraData = this.handleChangeExtraData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleChangeExtraData(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });  
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log(this.state);
    this.props.crearUsuario(this.state, this.props.tipo_usuario);
  }


  render() {
    return (
      <div>
        <Button color="primary" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Nuevo usuario"><FontAwesomeIcon name="plus"/></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> 
                Agregar nuevo usuario 
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
                <div>
                  <br />
                    <Row>
                      <Col sm="12">
                          <FormGroup row>
                            <Label for="first_name" sm={4}>Cedula</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="text" name="cedula" id="cedula" defaultValue={this.state.usuario['cedula']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="first_name" sm={4}>Primer Nombre</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="text" name="first_name" id="first_name" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['first_name']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="segundo_nombre" sm={4}>Segundo Nombre</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="text" name="segundo_nombre" id="segundo_nombre" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['segundo_nombre']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="last_name" sm={4}>Primer Apellido</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="text" name="last_name" id="last_name" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['last_name']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="segundo_apellido" sm={4}>Segundo Apellido</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="text" name="segundo_apellido" id="segundo_apellido" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['segundo_apellido']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="email" sm={4}>Correo</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="email" name="email" id="email"  onChange={this.handleChangeUsuario} value={this.state.usuario['email']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="Celular" sm={4}>Celular</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="number" name="celular" id="celular" onChange={this.handleChangeUsuario} value={this.state.usuario['celular']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="telefono_casa" sm={4}>Tlf. Casa</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="number" name="telefono_casa" id="telefono_casa" onChange={this.handleChangeUsuario} value={this.state.usuario['telefono_casa']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="telefono_trabajo" sm={4}>Tlf. Trabajo</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="number" name="telefono_trabajo" id="telefono_trabajo" onChange={this.handleChangeUsuario} value={this.state.usuario['telefono_trabajo']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="nacionalidad" sm={4}>Nacionalidad</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="text" name="nacionalidad" id="nacionalidad" onChange={this.handleChangeUsuario} value={this.state.usuario['nacionalidad']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="sexo" sm={4}>Sexo</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" value={this.state.value} defaultValue={this.state.usuario['sexo']} onChange={this.handleChangeUsuario} type="select" name="sexo" id="sexo">
                                <option value="M" name="M">M</option>
                                <option value="F" name="F">F</option>
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="estado_civil" sm={4}>Estado Civil</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" value={this.state.value} defaultValue={this.state.usuario['estado_civil']} onChange={this.handleChangeUsuario} type="select" name="estado_civil" id="estado_civil">
                                <option value="Soltero" name="Soltero">Soltero</option>
                                <option value="Casado" name="Casado">Casado</option>
                                <option value="Viudo" name="Viudo">Viudo</option>
                                <option value="Divorciado" name="Divorciado">Divorciado</option>
                              </Input>
                            </Col>
                          </FormGroup>
                          
                          { this.props.tipo_usuario === 'estudiantes' &&
                            <div>
                              <FormGroup row>
                                  <Label for="direccion" sm={4}>Dirección</Label>
                                  <Col sm={8}>
                                    <Input bsSize="sm" type="textarea" name="direccion" id="direccion" onChange={this.handleChangeExtraData} value={this.state.direccion} />
                                  </Col>
                              </FormGroup>

                              <FormGroup row>
                                <Label for="tipo_postgrado" sm={4}>Tipo de Postgrado</Label>
                                <Col sm={8}>
                                  <Input bsSize="sm" value={this.state.value} defaultValue={this.state['tipo_postgrado']} onChange={this.handleChangeExtraData} type="select" name="id_tipo_postgrado" id="id_tipo_postgrado">
                                    <option value="1" name="doctorado">Doctorado</option>
                                    <option value="2" name="especializacion">Especialización</option>
                                    <option value="3" name="maestria">Maestría</option>
                                  </Input>
                                </Col>
                              </FormGroup>

                              <FormGroup row>
                                <Label for="estado_estudiante" sm={4}>Estado</Label>
                                <Col sm={8}>
                                  <Input bsSize="sm" value={this.state.value} defaultValue={this.state['estado_estudiante']} onChange={this.handleChangeExtraData} type="select" name="id_estado_estudiante" id="id_tipo_postgrado">
                                    <option value="1" name="activo">Activo</option>
                                    <option value="2" name="retirado">Retirado</option>
                                  </Input>
                                </Col>
                              </FormGroup>
                            </div>
                          }

                          { this.props.tipo_usuario === 'docentes' &&
                            <div>
                              <FormGroup row>
                                  <Label for="direccion" sm={4}>Dirección</Label>
                                  <Col sm={8}>
                                    <Input bsSize="sm" type="textarea" name="direccion" id="direccion" onChange={this.handleChangeExtraData} value={this.state.direccion} />
                                  </Col>
                              </FormGroup>

                              <FormGroup row>
                                  <Label for="rif" sm={4}>RIF</Label>
                                  <Col sm={5}>
                                    <Input bsSize="sm" type="file" name="rif" id="rif" onChange={this.handleChangeExtraData} />
                                  </Col>
                                  <Col sm={3}>
                                    <a href={this.state.rif} ><Button color="primary" size='sm'> Descargar </Button> </a>
                                  </Col>
                              </FormGroup>

                              <FormGroup row>
                                  <Label for="curriculum" sm={4}>Curriculum</Label>
                                  <Col sm={5}>
                                    <Input bsSize="sm" type="file" name="curriculum" id="curriculum" onChange={this.handleChangeExtraData} />
                                  </Col>
                                  <Col sm={3}>
                                    <a href={this.state.curriculum} ><Button color="primary" size='sm'> Descargar </Button> </a>
                                  </Col>
                              </FormGroup>

                              <FormGroup check>
                                <Label check>
                                  <Input bsSize="sm" defaultChecked={this.state.coordinador} type="checkbox" name="coordinador" id="coordinador"  onChange={this.handleChangeExtraData} />{' '}
                                  Es coordinador
                                </Label>
                              </FormGroup>


                            </div>
                          }
                        
                      </Col>
                    </Row>

                    {this.props.adminUser['edit'] &&
                      <Alert color="success">
                          Datos actualizados exitosamente
                      </Alert> 
                    }

                    {this.props.adminUser['bad_input'] === true &&
                      <Alert color="error">
                          Ha ocurrido un error
                      </Alert>
                    }

                </div>

            </ModalBody>
            <ModalFooter>
              <Button color="success" type="submit">Guardar</Button>{' '}              
              <Button color="secondary" onClick={this.toggle}>Salir</Button>
            </ModalFooter>
          </Form>
        </Modal>
        &nbsp;&nbsp; {/*Dummy Spaces*/}

      </div>
    );
  }
}

const mapStateToProps = (state)=> {
  return{
    token: state.activeUser,
    adminUser: state.adminUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    crearUsuario: crearUsuario
    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUsuarioNew);