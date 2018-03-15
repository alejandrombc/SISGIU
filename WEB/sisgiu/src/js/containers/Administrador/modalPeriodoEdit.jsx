import React from 'react';
import { Input, Form, FormGroup, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../../css/moduloUsuarioAdministrador.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// Components
import { editar_asignatura } from '../../actions/moduloAsignaturas';
import DualList from './dualList';

class ModalPeriodoEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      paso: 1,
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

    
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    if(!this.state.modal) { this.props.onDismiss(); };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.triggerParentUpdate();
    this.props.editar_asignatura(this.state);
    this.props.triggerParentUpdate();
    this.toggle();

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
        <Button color="success" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Editar"><FontAwesomeIcon name="edit"/></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> 
                Editar Periodo
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <h6>Paso {this.state.paso}: Seleccionar Asignaturas</h6>
              <hr/>
              <DualList asignaturas={this.props.asignaturas}/>


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
    editar_asignatura: editar_asignatura,
    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPeriodoEdit);
