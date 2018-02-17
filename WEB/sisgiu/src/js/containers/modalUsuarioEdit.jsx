import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';

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

  render() {
    return (
      <div>
        <Button color="success" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Editar"><FontAwesomeIcon name="edit"/></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Editar Usuario</ModalHeader>
          <ModalBody>
              
              aqui va la info del usuario

          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggle}>Guardar</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
        &nbsp;&nbsp; {/*Dummy Spaces*/}
        <Button color="danger" size='sm' data-toggle="tooltip" title="Eliminar"><FontAwesomeIcon name="trash-alt"/></Button>
      </div>
    );
  }
}

export default ModalUsuarioEdit;