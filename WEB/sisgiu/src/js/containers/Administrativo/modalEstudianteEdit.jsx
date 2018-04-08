import React from 'react';
import { Input, Form, FormGroup, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../../css/moduloUsuarioAdministrador.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';

// Components
import CambiarAsignaturas from './cambiarAsignaturas';
import { get_asignaturas_totales, get_asignaturas_estudiante } from '../../actions/moduloEstudiantes';
import { get_estado_periodo } from '../../actions/moduloEstudiantes';

class ModalEstudianteEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      // visible: true,
      cargado: false,
      asignaturas: [],
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.buscar_asignaturas = this.buscar_asignaturas.bind(this);
    
  }


  componentDidMount() {

    // this.props.get_estado_periodo(this.props.periodo)
      // .then( () => this.buscar_asignaturas() );

  }

  buscar_asignaturas() {
    
    if (this.state.modal) {
      // if (this.props.administrativoUser.estado_periodo.estado === 'activo') {
      //   console.log('el periodo esta activo');  
      //   this.setState({boton_periodo:true});
      // } else if (this.props.administrativoUser.estado_periodo.estado === 'en inscripcion') {
      //   console.log('el periodo esta en inscripcion');
      //   this.props.get_asignaturas_inscripcion(this.props.data.estudiante.cedula);
      // }
      this.props.get_asignaturas_totales(this.props.periodo)
          .then( () => this.props.get_asignaturas_estudiante(this.props.data.estudiante.cedula) 
          .then( () => this.setState({cargado:true}) 
      )); 
    }else{
      this.setState({cargado:false});
    }

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    }, () => this.props.get_estado_periodo(this.props.periodo)
              .then( () => this.buscar_asignaturas()  ));

    // this.setState({
    //   modal: !this.state.modal
    // }, () => this.buscar_asignaturas() );
    if(!this.state.modal) { this.props.onDismiss(); };
  }

  handleSubmit() {

  }


  get_asignaturas(filtro) {

    let aux = [];
    filtro ? 
    aux = this.props.administrativoUser.lista_asignatura_periodo
    :
    aux = this.props.administrativoUser.lista_asignatura_estudiante;
    // console.log(aux);
    let asignaturas = [];
    let values = [];
    let N = aux.length;

    for (var i = 0; i < N; i++) {
      if(!values.includes(aux[i]['id'])){
        let asignatura = {};
        asignatura['codigo'] = aux[i]['codigo'];
        asignatura['nombre'] = aux[i]['nombre'];
        asignatura['tipo_asignatura'] = aux[i]['tipo_asignatura_id'];
        asignatura['unidad_credito'] = aux[i]['unidad_credito'];
        asignatura['value'] = aux[i]['id'];
        asignaturas.push(asignatura);
        values.push(aux[i]['id']);
      }
      
    }

    if(filtro){ 
      return asignaturas;
    }else{
      return values;
    }
  }

  render() {

    return (
      <div>
        <Button color="success" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Editar"><FontAwesomeIcon name="edit"/></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> 
                Editar estudiante 
          </ModalHeader>
          <Form id="Form" onSubmit={this.handleSubmit}>
            <ModalBody>
                <img className="center-img" width="100px" height="100px" src={this.props.data.estudiante.foto} alt="foto_usuario" />
                <br />
                {!this.state.cargado ?
                  <center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
                :
                <div>
                  <br />
                    <Row>
                      <Col sm="12">
                        <Row>
                          <Label for="cedula" sm={4}>Cedula</Label>
                          <Col sm={8}>
                            <Input  bsSize="sm" type="text" name="cedula" id="cedula" defaultValue={this.props.data.estudiante.cedula} readOnly/>
                          </Col>
                        </Row>
                        <Row>
                            <Label for="first_name" sm={4}>Primer Nombre</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="first_name" id="first_name" defaultValue={this.props.data.estudiante.first_name} readOnly />
                            </Col>
                        </Row>
                        <Row>
                            <Label for="segundo_nombre" sm={4}>Segundo Nombre</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="segundo_nombre" id="segundo_nombre" defaultValue={this.props.data.estudiante.segundo_nombre} readOnly />
                            </Col>
                        </Row>
                        <Row>
                            <Label for="last_name" sm={4}>Primer Apellido</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="last_name" id="last_name" defaultValue={this.props.data.estudiante.last_name} readOnly />
                            </Col>
                        </Row>
                        <Row>
                            <Label for="segundo_apellido" sm={4}>Segundo Apellido</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="segundo_apellido" id="segundo_apellido" defaultValue={this.props.data.estudiante.segundo_apellido} readOnly />
                            </Col>
                        </Row>
                        <Row>
                            <Label for="email" sm={4}>Correo</Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="email" id="email" defaultValue={this.props.data.estudiante.email} readOnly />
                            </Col>
                        </Row>
                        <Row>
                            <Label for="telefono_casa" sm={4}>Tlf Casa </Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="telefono_casa" id="telefono_casa" defaultValue={this.props.data.estudiante.telefono_casa} readOnly />
                            </Col>
                        </Row>
                        <Row>
                            <Label for="celular" sm={4}>Celular </Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="celular" id="celular" defaultValue={this.props.data.estudiante.celular} readOnly />
                            </Col>
                        </Row>
                        <Row>
                            <Label for="nacimiento" sm={4}>Nacimiento </Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="nacimiento" id="nacimiento" defaultValue={this.props.data.estudiante.fecha_nacimiento} readOnly />
                            </Col>
                        </Row>
                        <Row>
                            <Label for="sexo" sm={4}>Sexo </Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="sexo" id="sexo" defaultValue={this.props.data.estudiante.sexo} readOnly />
                            </Col>
                        </Row>
                        <Row>
                            <Label for="nacionalidad" sm={4}>Nacionalidad </Label>
                            <Col sm={8}>
                              <Input  bsSize="sm" type="text" name="nacionalidad" id="nacionalidad" defaultValue={this.props.data.estudiante.nacionalidad} readOnly />
                            </Col>
                        </Row>
                      </Col>
                    </Row>
                    <br />
                    <CambiarAsignaturas boton={this.props.administrativoUser.estado_periodo.estado !== 'en inscripcion'} asignaturas_inscritas={this.get_asignaturas(false)} asignaturas={this.get_asignaturas(true)} cedula={this.props.data.estudiante.cedula}/>   
                </div>
                }
            </ModalBody>
            <ModalFooter>
              {/*
              <Button color="success" type="submit">Guardar</Button>{' '}      
              <Button color="secondary" onClick={this.toggle}>Salir</Button>
              */}
            </ModalFooter>
          </Form>
        </Modal>
        
      </div>
    );

}
}

const mapStateToProps = (state)=> {
  return{
    administrativoUser: state.administrativoUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    get_asignaturas_totales: get_asignaturas_totales,
    get_asignaturas_estudiante: get_asignaturas_estudiante,
    get_estado_periodo: get_estado_periodo,
    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEstudianteEdit);
