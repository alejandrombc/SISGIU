import React from 'react';
import { Input, Form, FormGroup, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../css/moduloUsuarioAdministrador.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// Components
import { crearUsuario } from '../actions/moduloUsuarioAdministrador';
import { get_tipo_postgrado } from '../actions/moduloAsignaturas';  // Esto deberia ser de un action mas generico (se repite en modalAsignaturaNew)
import { get_estado_estudiante } from '../actions/moduloUsuarioAdministrador';  

class ModalUsuarioNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      usuario: {
        cedula: '',
        first_name: '',
        segundo_nombre: null,
        last_name: '',
        segundo_apellido: null,
        email: '',
        celular: '',
        fecha_nacimiento:'',
        telefono_casa:'',
        telefono_trabajo: '',
        nacionalidad: '',
        sexo: 'M',
        estado_civil: 'Soltero',
        password: '',
        username: '',
      },
      direccion: '',
      coordinador: false,
      id_tipo_postgrado: null,
      id_estado_estudiante: null,

    };

    this.toggle = this.toggle.bind(this);
    this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
    this.handleChangeExtraData = this.handleChangeExtraData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.props.get_tipo_postgrado();
    this.props.get_estado_estudiante();

    
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

    console.log(this.state.usuario['cedula']);
    this.props.crearUsuario(this.state, this.props.tipo_usuario);
    this.toggle();
    this.setState({
      usuario: {
        cedula: '',
        first_name: '',
        segundo_nombre: null,
        last_name: '',
        segundo_apellido: null,
        email: '',
        celular: '',
        fecha_nacimiento:'',
        telefono_casa:'',
        telefono_trabajo: '',
        nacionalidad: '',
        sexo: 'M',
        estado_civil: 'Soltero',
        password: '',
        username: '',
      },
      direccion: '',
      coordinador: false,
      id_tipo_postgrado: null,
      id_estado_estudiante: null,
    });

  }


  render() {

    let listPostgrados = '';
    let lista_estadoEstudiante = '';
    
    if (this.props.adminUser.lista_postgrados && this.props.adminUser.lista_postgrados.length > 0) {
      listPostgrados = this.props.adminUser.lista_postgrados.map((tipo_postgrado) =>
        <option key={tipo_postgrado['id']} value={tipo_postgrado['id']} name={tipo_postgrado['tipo']}> {tipo_postgrado['tipo']} </option>
      ); 
    }

    if (this.props.adminUser.lista_estadoEstudiante && this.props.adminUser.lista_estadoEstudiante.length > 0) {
      lista_estadoEstudiante = this.props.adminUser.lista_estadoEstudiante.map((estado_estudiante) =>
        <option key={estado_estudiante['id']} value={estado_estudiante['id']} name={estado_estudiante['estado']}> {estado_estudiante['estado']} </option>
      ); 
    }


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
                            <Label for="cedula" sm={4}>Cedula</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="text" name="cedula" id="cedula" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['cedula']} required/>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="first_name" sm={4}>Primer Nombre</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="text" name="first_name" id="first_name" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['first_name']} required/>
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
                              <Input bsSize="sm" type="text" name="last_name" id="last_name" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['last_name']} required/>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="segundo_apellido" sm={4}>Segundo Apellido</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="text" name="segundo_apellido" id="segundo_apellido" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['segundo_apellido']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="fecha_nacimiento" sm={4}>F. Nacimiento</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="date" name="fecha_nacimiento" id="fecha_nacimiento" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['fecha_nacimiento']} required/>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="email" sm={4}>Correo</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="email" name="email" id="email"  onChange={this.handleChangeUsuario} value={this.state.usuario['email']} required/>
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
                                <Label for="id_tipo_postgrado" sm={4}>Postgrado</Label>
                                <Col sm={8}>
                                  <Input bsSize="sm" value={this.state.value} defaultValue={this.state['id_tipo_postgrado']} onChange={this.handleChangeExtraData} type="select" name="id_tipo_postgrado" id="id_tipo_postgrado" required>
                                    <option value={null} name={-1}> {' '} </option>
                                    {listPostgrados}
                                  </Input>
                                </Col>
                              </FormGroup>

                              <FormGroup row>
                                <Label for="estado_estudiante" sm={4}>Estado</Label>
                                <Col sm={8}>
                                  <Input bsSize="sm" value={this.state.value} defaultValue={this.state['id_estado_estudiante']} onChange={this.handleChangeExtraData} type="select" name="id_estado_estudiante" id="id_estado_estudiante">
                                    <option value={null} name={-1}> {' '} </option>
                                    {lista_estadoEstudiante}
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

                              <FormGroup check>
                                <Label check>
                                  <Input bsSize="sm" defaultChecked={this.state.coordinador} type="checkbox" name="coordinador" id="coordinador"  onChange={this.handleChangeExtraData} />{' '}
                                  Es coordinador
                                </Label>
                              </FormGroup>
                              <br />
                              <font size="2">Para los archivos, por favor edite el usuario una vez este creado</font>
                            </div>
                          }
                        
                      </Col>
                    </Row>

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
    crearUsuario: crearUsuario,
    get_tipo_postgrado: get_tipo_postgrado,
    get_estado_estudiante: get_estado_estudiante,
    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUsuarioNew);
