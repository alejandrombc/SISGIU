import React from 'react';
import { Input, Form, FormGroup, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../../css/moduloUsuarioAdministrador.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// Components
import { editar_asignatura } from '../../actions/moduloAsignaturas';

class ModalAsignaturaEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      codigo: this.props.asignatura['codigo'],
      nombre: this.props.asignatura['nombre'],
      unidad_credito: this.props.asignatura['unidad_credito'],
      tipo_asignatura: this.props.asignatura['tipo_asignatura'],
      tipo_postgrado: this.props.asignatura['tipo_postgrado'],
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

    
  toggle() {
    this.props.adminUser['edit'] = false;
    this.setState({
      modal: !this.state.modal
    });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault();
    
    this.toggle();
    this.props.editar_asignatura(this.state);

  }

  render() {
    let listPostgrados = '';
    let listTipoAsignaturas = '';
    
    if (this.props.adminUser.lista_postgrados && this.props.adminUser.lista_postgrados.length > 0) {
      listPostgrados = this.props.adminUser.lista_postgrados.map((tipo_postgrado) =>
        <option key={tipo_postgrado['id']} value={tipo_postgrado['id']} name={tipo_postgrado['tipo']}> {tipo_postgrado['tipo']} </option>
      ); 
    }

    if (this.props.adminUser.lista_tipoAsignaturas && this.props.adminUser.lista_tipoAsignaturas.length > 0) {
      listTipoAsignaturas = this.props.adminUser.lista_tipoAsignaturas.map((tipo_asignatura) =>
        <option key={tipo_asignatura['id']} value={tipo_asignatura['id']} name={tipo_asignatura['nombre']}> {tipo_asignatura['nombre']} </option>
      ); 
    }

    
    return (
      <div>
        <Button color="success" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Editar Asignatura"><FontAwesomeIcon name="edit"/></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> 
                Editar materia
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
                <div>
                  <br />
                    <Row>
                      <Col sm="12">
                          
                          <FormGroup row>
                            <Label for="codigo" sm={5}>Código</Label>
                            <Col sm={7}>
                              <Input bsSize="sm" type="number" name="codigo" id="codigo" onChange={this.handleChange} readOnly defaultValue={this.state['codigo']} required/>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Label for="nombre" sm={5}>Nombre</Label>
                            <Col sm={7}>
                              <Input bsSize="sm" type="text" name="nombre" id="nombre" onChange={this.handleChange} defaultValue={this.state['nombre']} required/>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Label for="unidad_credito" sm={5}>Unidades de Crédito</Label>
                            <Col sm={7}>
                              <Input bsSize="sm" type="number" name="unidad_credito" id="unidad_credito" onChange={this.handleChange} defaultValue={this.state['unidad_credito']} required/>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Label for="tipo_asignatura" sm={4}>Tipo</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" value={this.state.value} defaultValue={this.state['tipo_asignatura']} onChange={this.handleChange} type="select" name="tipo_asignatura" id="tipo_asignatura" required>
                                <option value={null} name={-1}> {' '} </option>
                                {listTipoAsignaturas}
                              </Input>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Label for="tipo_postgrado" sm={4}>Postgrado</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" value={this.state.value} defaultValue={this.state['tipo_postgrado']} onChange={this.handleChange} type="select" name="tipo_postgrado" id="tipo_postgrado" required>
                                <option value={null} name={-1}> {' '} </option>
                                {listPostgrados}
                              </Input>
                            </Col>
                          </FormGroup>


                          
                          
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
    editar_asignatura: editar_asignatura,
    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAsignaturaEdit);
