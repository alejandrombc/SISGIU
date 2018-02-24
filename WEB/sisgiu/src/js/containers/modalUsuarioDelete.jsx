import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../css/moduloUsuarioAdministrador.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';

// Components
import { eliminarUsuario } from '../actions/moduloUsuarioAdministrador';

class ModalUsuarioEdit extends React.Component {

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
  }


  handleDelete() {
    this.props.eliminarUsuario(this.props.usuario.cedula, this.props.tipo_usuario);
  }

  render() {
    if (!this.state.loading) {
    return (
      <div>
        
        <Button color="danger" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Eliminar"><FontAwesomeIcon name="trash-alt"/></Button>
        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> 
                Eliminar usuario 
          </ModalHeader>
            <ModalBody>
                ¿Está seguro de que desea eliminar al usuario {this.props.usuario.first_name} {this.props.usuario.last_name}?

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
    eliminarUsuario: eliminarUsuario,
    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUsuarioEdit);
