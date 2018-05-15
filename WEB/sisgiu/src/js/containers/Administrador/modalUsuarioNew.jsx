import React from 'react';
import { Input, Form, FormGroup, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../../css/moduloUsuarioAdministrador.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import { crearUsuario } from '../../actions/moduloUsuarioAdministrador';


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
        fecha_nacimiento: '',
        telefono_casa: '',
        telefono_trabajo: '',
        nacionalidad: '',
        sexo: 'M',
        estado_civil: 'Soltero',
        password: '',
        username: '',
        tipo_documento: 'V',
      },
      direccion: '',
      coordinador: false,
      id_tipo_postgrado: null,
      id_estado_estudiante: null,

    };

    this.toggle = this.toggle.bind(this);
    this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
    this.handleChangeExtraData = this.handleChangeExtraData.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.get_today = this.get_today.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    if (!this.state.modal) { this.props.onDismiss(); };
  }

  handleChangeUsuario(e) {
    const { name, value } = e.target;
    var usuario = this.state.usuario;
    usuario[name] = value;
    this.setState({ usuario })
  }

  handleChangeExtraData(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleChangeCheckbox(e) {
    const { name, checked } = e.target;
    this.setState({ [name]: checked });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.triggerParentUpdate();
    this.props.crearUsuario(this.state, this.props.tipo_usuario);

    this.setState({
      usuario: {
        cedula: '',
        first_name: '',
        segundo_nombre: null,
        last_name: '',
        segundo_apellido: null,
        email: '',
        celular: '',
        fecha_nacimiento: '',
        telefono_casa: '',
        telefono_trabajo: '',
        nacionalidad: '',
        sexo: 'M',
        estado_civil: 'Soltero',
        password: '',
        username: '',
        tipo_documento: 'V',
      },
      direccion: '',
      coordinador: false,
      id_tipo_postgrado: null,
      id_estado_estudiante: null,
    });

    this.props.triggerParentUpdate();
    this.toggle();
  }

  get_today() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd
    }
    if (mm < 10) {
      mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
  }


  render() {
    let listPostgrados = '';
    let lista_estadoEstudiante = '';

    let user_type = {
      "estudiantes": "Estudiantes",
      "docentes": "Personal Docente",
      "administrativo": "Personal Administrativo",
      "administradores": "Administradores"
    }
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
        <Button color="primary" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Nuevo usuario"><FontAwesomeIcon name="plus" /></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Agregar nuevo usuario: <span className="modulo_nombre">{user_type[this.props.tipo_usuario]}</span>
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <div>
                <br />
                <Row>
                  <Col sm="12">
                    <FormGroup row>
                      <Label className="required" for="identificacion" sm={3}>Identificación</Label>

                      <Col sm={2}>
                        <Input bsSize="sm" defaultValue={this.state.usuario.tipo_documento} onChange={this.handleChangeUsuario} type="select" name="tipo_documento" required>
                          <option value="V" name="V">V</option>
                          <option value="E" name="E">E</option>
                          <option value="P" name="P">P</option>
                        </Input>
                      </Col>

                      <Col sm={7}>
                        <Input maxLength={25} minLength={5} bsSize="sm" type="text" name="cedula" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['cedula']} required />
                      </Col>
                    </FormGroup>

                    <FormGroup row>
                      <Label className="required" for="first_name" sm={4}>Primer Nombre</Label>
                      <Col sm={8}>
                        <Input maxLength={50} bsSize="sm" type="text" name="first_name" id="first_name" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['first_name']} required />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="segundo_nombre" sm={4}>Segundo Nombre</Label>
                      <Col sm={8}>
                        <Input maxLength={50} bsSize="sm" type="text" name="segundo_nombre" id="segundo_nombre" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['segundo_nombre']} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="required" for="last_name" sm={4}>Primer Apellido</Label>
                      <Col sm={8}>
                        <Input maxLength={50} bsSize="sm" type="text" name="last_name" id="last_name" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['last_name']} required />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="required" for="segundo_apellido" sm={4}>Segundo Apellido</Label>
                      <Col sm={8}>
                        <Input maxLength={50} bsSize="sm" type="text" name="segundo_apellido" id="segundo_apellido" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['segundo_apellido']} required />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="required" for="fecha_nacimiento" sm={4}>F. Nacimiento</Label>
                      <Col sm={8}>
                        <Input max={this.get_today()} min="1930-01-01" bsSize="sm" type="date" name="fecha_nacimiento" id="fecha_nacimiento" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['fecha_nacimiento']} required />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="required" for="email" sm={4}>Correo</Label>
                      <Col sm={8}>
                        <Input bsSize="sm" type="email" name="email" id="email" onChange={this.handleChangeUsuario} value={this.state.usuario['email']} required />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="Celular" sm={4}>Celular</Label>
                      <Col sm={8}>
                        <Input min={1000000000} max={999999999999} bsSize="sm" type="number" name="celular" id="celular" onChange={this.handleChangeUsuario} value={this.state.usuario['celular']} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="telefono_casa" sm={4}>Tlf. Casa</Label>
                      <Col sm={8}>
                        <Input min={1000000000} max={999999999999} bsSize="sm" type="number" name="telefono_casa" id="telefono_casa" onChange={this.handleChangeUsuario} value={this.state.usuario['telefono_casa']} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="telefono_trabajo" sm={4}>Tlf. Trabajo</Label>
                      <Col sm={8}>
                        <Input min={1000000000} max={999999999999} bsSize="sm" type="number" name="telefono_trabajo" id="telefono_trabajo" onChange={this.handleChangeUsuario} value={this.state.usuario['telefono_trabajo']} />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="required" for="nacionalidad" sm={4}>Nacionalidad</Label>
                      <Col sm={8}>
                        <Input bsSize="sm" type="text" name="nacionalidad" id="nacionalidad" onChange={this.handleChangeUsuario} value={this.state.usuario['nacionalidad']} required />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="required" for="sexo" sm={4}>Sexo</Label>
                      <Col sm={8}>
                        <Input bsSize="sm" value={this.state.value} defaultValue={this.state.usuario['sexo']} onChange={this.handleChangeUsuario} type="select" name="sexo" id="sexo" required>
                          <option value="M" name="M">M</option>
                          <option value="F" name="F">F</option>
                        </Input>
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label className="required" for="estado_civil" sm={4}>Estado Civil</Label>
                      <Col sm={8}>
                        <Input bsSize="sm" value={this.state.value} defaultValue={this.state.usuario['estado_civil']} onChange={this.handleChangeUsuario} type="select" name="estado_civil" id="estado_civil" required>
                          <option value="Soltero" name="Soltero">Soltero</option>
                          <option value="Casado" name="Casado">Casado</option>
                          <option value="Viudo" name="Viudo">Viudo</option>
                          <option value="Divorciado" name="Divorciado">Divorciado</option>
                        </Input>
                      </Col>
                    </FormGroup>

                    {this.props.tipo_usuario === 'estudiantes' &&
                      <div>
                        <FormGroup row>
                          <Label for="direccion" sm={4}>Dirección</Label>
                          <Col sm={8}>
                            <Input bsSize="sm" type="textarea" name="direccion" id="direccion" onChange={this.handleChangeExtraData} value={this.state.direccion} />
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Label className="required" for="id_tipo_postgrado" sm={4}>Postgrado</Label>
                          <Col sm={8}>
                            <Input bsSize="sm" value={this.state.value} defaultValue={this.state['id_tipo_postgrado']} onChange={this.handleChangeExtraData} type="select" name="id_tipo_postgrado" id="id_tipo_postgrado" required>
                              <option value={null} name={-1}> {' '} </option>
                              {listPostgrados}
                            </Input>
                          </Col>
                        </FormGroup>

                        <FormGroup row>
                          <Label className="required" for="estado_estudiante" sm={4}>Estado</Label>
                          <Col sm={8}>
                            <Input bsSize="sm" value={this.state.value} defaultValue={this.state['id_estado_estudiante']} onChange={this.handleChangeExtraData} type="select" name="id_estado_estudiante" id="id_estado_estudiante" required>
                              <option value={null} name={-1}> {' '} </option>
                              {lista_estadoEstudiante}
                            </Input>
                          </Col>
                        </FormGroup>
                      </div>
                    }

                    {this.props.tipo_usuario === 'docentes' &&
                      <div>
                        <FormGroup row>
                          <Label for="direccion" sm={4}>Dirección</Label>
                          <Col sm={8}>
                            <Input bsSize="sm" type="textarea" name="direccion" id="direccion" onChange={this.handleChangeExtraData} value={this.state.direccion} />
                          </Col>
                        </FormGroup>

                        <FormGroup check>
                          <Label check>
                            <Input bsSize="sm" defaultChecked={this.state.coordinador} type="checkbox" name="coordinador" id="coordinador" onChange={this.handleChangeCheckbox} />{' '}
                            Es coordinador
                              </Label>
                        </FormGroup>

                        {this.state.coordinador &&
                          <FormGroup row>
                            <Label className="required" for="id_tipo_postgrado" sm={4}>Postgrado</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" value={this.state.value} defaultValue={this.state['id_tipo_postgrado']} onChange={this.handleChangeExtraData} type="select" name="id_tipo_postgrado" id="id_tipo_postgrado" required>
                                <option value={null} name={-1}> {' '} </option>
                                {listPostgrados}
                              </Input>
                            </Col>
                          </FormGroup>
                        }

                        <br />
                        <font size="2">Para los archivos, por favor edite el usuario una vez este creado</font>
                      </div>
                    }
                    <font size="2"><span className="required"></span> Campo requerido</font>

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

const mapStateToProps = (state) => {
  return {
    adminUser: state.adminUser,

  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    crearUsuario: crearUsuario,
  },
    dispatch
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUsuarioNew);
