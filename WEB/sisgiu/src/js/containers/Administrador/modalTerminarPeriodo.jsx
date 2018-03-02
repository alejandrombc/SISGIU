import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../../css/moduloUsuarioAdministrador.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';

// Components
import { terminarPeriodo } from '../../actions/inicio';


class ModalTerminarPeriodo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      
    };

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }


  handleSubmit() {
    this.props.terminarPeriodo(this.props.periodo);
  }

  render() {
      return (
        <div>
          <Button color="danger" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Terminar Periodo">Terminar Periodo</Button>
          
          <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}> 
                  Terminar Periodo 
            </ModalHeader>
              <ModalBody>
                  ¿Está seguro de que desea terminar el periodo actual de {this.props.periodo.tipo_postgrado}?

              </ModalBody>
              <ModalFooter>
                <Button color="danger" onClick={() => { this.handleSubmit() }}>Terminar Periodo</Button>{' '}      
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
    terminarPeriodo: terminarPeriodo,
    }, 
    dispatch 
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalTerminarPeriodo);
