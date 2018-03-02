import React from 'react';
import { Input, Form, FormGroup, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../../css/moduloUsuarioAdministrador.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';

// Components
import { editarUsuario, editarDocumento } from '../../actions/moduloUsuarioAdministrador';

class ModalUsuarioEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      usuario: {
        cedula: this.props.usuario['cedula'],
        first_name: this.props.usuario['first_name'],
        segundo_nombre: this.props.usuario['segundo_nombre'],
        last_name: this.props.usuario['last_name'],
        segundo_apellido: this.props.usuario['segundo_apellido'],
        email: this.props.usuario['email'],
        celular: this.props.usuario['celular'],
        telefono_casa: this.props.usuario['telefono_casa'],
        telefono_trabajo: this.props.usuario['telefono_trabajo'],
        nacionalidad: this.props.usuario['nacionalidad'],
        sexo: this.props.usuario['sexo'],
        estado_civil: this.props.usuario['estado_civil'],
        foto: this.props.usuario['foto'],
        fecha_nacimiento:this.props.usuario['fecha_nacimiento'],
        password: this.props.usuario['password']
      },
      direccion: this.props.usuario['direccion'],
      rif: this.props.usuario['rif'],
      curriculum: this.props.usuario['curriculum'],
      permiso_ingresos: this.props.usuario['permiso_ingresos'],
      coordinador: this.props.usuario['coordinador'],
      tipo_postgrado: this.props.usuario['tipo_postgrado'],
      id_tipo_postgrado: this.props.usuario['id_tipo_postgrado'],
      id_estado_estudiante: this.props.usuario['id_estado_estudiante'],
      estado_estudiante: this.props.usuario['estado_estudiante'],
      rif_file: undefined,
      curriculum_file:undefined,
      permiso_ingresos_file:undefined,
      visible: true
    };
    this.toggle = this.toggle.bind(this);
    this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
    this.handleChangeExtraData = this.handleChangeExtraData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.subirDocumento = this.subirDocumento.bind(this);
    this.handleChangeDocumento = this.handleChangeDocumento.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  componentWillReceiveProps(props) { 
      this.setState({"direccion":props.usuario.direccion});
      this.setState({"usuario":props.usuario});
      this.setState({"rif":props.usuario.rif});
      this.setState({"curriculum":props.usuario.curriculum});
      this.setState({"permiso_ingresos":props.usuario.permiso_ingresos});
      this.setState({"coordinador":props.usuario.coordinador});
      this.setState({"tipo_postgrado":props.usuario.tipo_postgrado});
      this.setState({"id_tipo_postgrado":props.usuario.id_tipo_postgrado});
      this.setState({"id_estado_estudiante":props.usuario.id_estado_estudiante});
  }

  handleChangeUsuario(e) {
    const { name, value } = e.target;
    var usuario = this.state.usuario;
    usuario[name] = value;
    this.setState({usuario})
  }

  handleChangeDocumento(e){
    let name = e.target.name + '_file';
    this.setState({ [name] :e.target.files[0]})
  }

  handleChangeExtraData(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });  
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.editarUsuario(this.state, this.props.usuario, this.props.tipo_usuario);
    this.toggle();
  }

  subirDocumento(tipo_documento){
    let documento;
    switch(tipo_documento) {
      
      case 'rif':
        documento = this.state.rif_file
        console.log(documento);
        break;

      case 'curriculum':
        documento = this.state.curriculum_file
        break;

      case 'permiso_ingresos':
        documento = this.state.permiso_ingresos_file
        break;

      default:
        break;
    }
    if (documento) {
      this.props.editarDocumento(tipo_documento, documento, this.state.usuario.cedula);
      this.toggle();
    } else {
      alert('No ha subido ningún archivo');
    }
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
        <Button color="success" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Editar"><FontAwesomeIcon name="edit"/></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> 
                Editar usuario 
          </ModalHeader>
          <Form id="Form1" onSubmit={this.handleSubmit}>
            <ModalBody>
                <img className="center-img" width="100px" height="100px" src={this.state.usuario['foto']} alt="foto_usuario" />
                <br />
                <div>
                  <br />
                    <Row>
                      <Col sm="12">
                          <FormGroup row>
                            <Label for="first_name" sm={4}>Cedula</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="cedula" id="cedula" defaultValue={this.state.usuario['cedula']} readOnly/>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="first_name" sm={4}>Primer Nombre</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="first_name" id="first_name" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['first_name']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="segundo_nombre" sm={4}>Segundo Nombre</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="segundo_nombre" id="segundo_nombre" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['segundo_nombre']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="last_name" sm={4}>Primer Apellido</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="last_name" id="last_name" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['last_name']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="segundo_apellido" sm={4}>Segundo Apellido</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="segundo_apellido" id="segundo_apellido" onChange={this.handleChangeUsuario} defaultValue={this.state.usuario['segundo_apellido']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="fecha_nacimiento" sm={4}>Nacimiento</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="date" name="fecha_nacimiento" id="fecha_nacimiento" onChange={this.handleChangeUsuario} readOnly defaultValue={this.state.usuario['fecha_nacimiento']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="email" sm={4}>Correo</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="email" name="email" id="email"  onChange={this.handleChangeUsuario} value={this.state.usuario['email']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="Celular" sm={4}>Celular</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="number" name="celular" id="celular" onChange={this.handleChangeUsuario} value={this.state.usuario['celular']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="telefono_casa" sm={4}>Tlf. Casa</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="number" name="telefono_casa" id="telefono_casa" onChange={this.handleChangeUsuario} value={this.state.usuario['telefono_casa']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="telefono_trabajo" sm={4}>Tlf. Trabajo</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="number" name="telefono_trabajo" id="telefono_trabajo" onChange={this.handleChangeUsuario} value={this.state.usuario['telefono_trabajo']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="nacionalidad" sm={4}>Nacionalidad</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="nacionalidad" id="nacionalidad" onChange={this.handleChangeUsuario} value={this.state.usuario['nacionalidad']} />
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="sexo" sm={4}>Sexo</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" value={this.state.value} defaultValue={this.state.usuario['sexo']} onChange={this.handleChangeUsuario} type="select" name="sexo" id="sexo">
                                <option value="M" name="M">M</option>
                                <option value="F" name="F">F</option>
                              </Input>
                            </Col>
                          </FormGroup>
                          <FormGroup row>
                            <Label for="estado_civil" sm={4}>Estado Civil</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" value={this.state.value} defaultValue={this.state.usuario['estado_civil']} onChange={this.handleChangeUsuario} type="select" name="estado_civil" id="estado_civil">
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
                                    <Input  bsSize="sm" type="textarea" name="direccion" id="direccion" onChange={this.handleChangeExtraData} value={this.state.direccion} />
                                  </Col>
                              </FormGroup>

                              <FormGroup row>
                                <Label for="id_tipo_postgrado" sm={4}>Postgrado</Label>
                                <Col sm={8}>
                                  <Input bsSize="sm" value={this.state.value} defaultValue={this.state['id_tipo_postgrado']} onChange={this.handleChangeExtraData} type="select" name="id_tipo_postgrado" id="id_tipo_postgrado" required>
                                    {listPostgrados}
                                  </Input>
                                </Col>
                              </FormGroup>

                              <FormGroup row>
                                <Label for="estado_estudiante" sm={4}>Estado</Label>
                                <Col sm={8}>
                                  <Input bsSize="sm" value={this.state.value} defaultValue={this.state['id_estado_estudiante']} onChange={this.handleChangeExtraData} type="select" name="id_estado_estudiante" id="id_estado_estudiante">
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
                                    <Input  bsSize="sm" type="textarea" name="direccion" id="direccion" onChange={this.handleChangeExtraData} value={this.state.direccion} />
                                  </Col>
                              </FormGroup>
                                <FormGroup row>
                                    <Label for="rif" sm={3}>RIF</Label>
                                    <Col sm={5}>
                                      <Input className="form-control" bsSize="sm" type="file" name="rif" id="rif" onChange={this.handleChangeDocumento} />                                    
                                    </Col>
                                    <Col sm={2}>
                                      <a href={this.state.rif} target='_blank' ><Button color="primary" size='sm' type='button'> Descargar </Button> </a>
                                    </Col>
                                    <Col sm={2}>
                                      <Button onClick={() => { this.subirDocumento('rif') }} color="primary" size='sm'> Subir </Button>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="curriculum" sm={3}>Curriculum</Label>
                                    <Col sm={5}>
                                      <Input className="form-control" bsSize="sm" type="file" name="curriculum" id="curriculum" onChange={this.handleChangeDocumento} />
                                    </Col>
                                    <Col sm={2}>
                                      <a href={this.state.curriculum} target='_blank'><Button color="primary" size='sm' type='button'> Descargar </Button> </a>
                                    </Col>
                                    <Col sm={2}>
                                      <Button onClick={() => { this.subirDocumento('curriculum') }} color="primary" size='sm'> Subir </Button>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label for="permiso_ingresos" sm={3}>Permisos</Label>
                                    <Col sm={5}>
                                      <Input className="form-control" bsSize="sm" type="file" name="permiso_ingresos" id="permiso_ingresos" onChange={this.handleChangeDocumento} />
                                    </Col>
                                    <Col sm={2}>
                                      <a href={this.state.permiso_ingresos} target='_blank'><Button color="primary" size='sm' type='button'> Descargar </Button> </a>
                                    </Col>
                                    <Col sm={2}>
                                      <Button onClick={() => { this.subirDocumento('permiso_ingresos') }} color="primary" size='sm'> Subir </Button>
                                    </Col>
                                </FormGroup>

                                <FormGroup check>
                                  <Label check>
                                    <Input  bsSize="sm" defaultChecked={this.state.coordinador} type="checkbox" name="coordinador" id="coordinador"  onChange={this.handleChangeExtraData} />{' '}
                                    Es coordinador
                                  </Label>
                                </FormGroup>

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
        
      </div>
    );

}
}

const mapStateToProps = (state)=> {
  return{
    adminUser: state.adminUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editarUsuario: editarUsuario,
    editarDocumento: editarDocumento,
    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUsuarioEdit);
