import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../../css/moduloUsuarioAdministrador.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import { eliminar_asignatura } from '../../actions/moduloAsignaturas';


class ModalAsignaturaDelete extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    if (!this.state.modal) { this.props.onDismiss(); };
  }


  handleDelete() {
    this.props.triggerParentUpdate();
    this.props.eliminar_asignatura(this.props.asignatura);
    this.props.triggerParentUpdate();
    this.toggle();
  }

  render() {
    return (
      <div>

        <Button color="danger" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Eliminar"><FontAwesomeIcon name="trash-alt" /></Button>

        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>
            Eliminar asignatura
            </ModalHeader>
          <ModalBody>
            ¿Está seguro de que desea eliminar la asignatura "{this.props.asignatura['codigo']}-{this.props.asignatura['nombre']}"?

              </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => { this.handleDelete() }}>Eliminar</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Salir</Button>
          </ModalFooter>
        </Modal>

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
    eliminar_asignatura: eliminar_asignatura,
  },
    dispatch
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalAsignaturaDelete);
