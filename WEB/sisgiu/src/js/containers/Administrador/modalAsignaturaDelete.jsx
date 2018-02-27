import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../../css/moduloUsuarioAdministrador.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';

// Components
import { eliminar_asignatura } from '../../actions/moduloAsignaturas';


class ModalAsignaturaDelete extends React.Component {

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
    this.handleDelete = this.handleDelete.bind(this);

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


  handleDelete() {
    this.props.eliminar_asignatura(this.state);
  }

  render() {
      if (!this.state.loading) {
      return (
        <div>
          
          <Button color="danger" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Eliminar"><FontAwesomeIcon name="trash-alt"/></Button>
          
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}> 
                  Eliminar asignatura 
            </ModalHeader>
              <ModalBody>
                  ¿Está seguro de que desea eliminar la asignatura "{this.state.codigo}-{this.state.nombre}"?

              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={() => { this.handleDelete() }}>Eliminar</Button>{' '}      
                <Button color="secondary" onClick={this.toggle}>Salir</Button>
              </ModalFooter>
          </Modal>

        </div>
      );
    }else{
      return(
        <center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
      );
    }
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
    eliminar_asignatura: eliminar_asignatura,
    }, 
    dispatch 
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalAsignaturaDelete);
