import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../../css/moduloUsuarioAdministrador.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// Components
import { eliminarUsuario } from '../../actions/moduloUsuarioAdministrador';

class ModalUsuarioDelete extends React.Component {

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
    if(!this.state.modal) { this.props.onDismiss(); };
  }


  handleDelete() {
    this.props.triggerParentUpdate();
    this.props.eliminarUsuario(this.props.usuario.cedula, this.props.tipo_usuario);
    this.props.triggerParentUpdate();
  }

  render() {
    return (
      <div>
        
        <Button color="danger" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Eliminar"><FontAwesomeIcon name="trash-alt"/></Button>
        
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> 
                Eliminar usuario 
          </ModalHeader>
            <ModalBody>
                ¿Está seguro de que desea eliminar al usuario {this.props.usuario.first_name} {this.props.usuario.last_name}?. Se eliminarán <b>todos</b> los roles asociados a él.

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

const mapStateToProps = (state)=> {
  return{
    
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    eliminarUsuario: eliminarUsuario,
    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalUsuarioDelete);
