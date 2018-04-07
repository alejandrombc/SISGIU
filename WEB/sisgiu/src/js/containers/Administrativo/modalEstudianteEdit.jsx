import React from 'react';
import { Input, Form, FormGroup, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../../css/moduloUsuarioAdministrador.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// Components

class ModalEstudianteEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      // visible: true,
      asignaturas: [],
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    if(!this.state.modal) { this.props.onDismiss(); };
  }

  handleSubmit() {

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
                {/*
                <img className="center-img" width="100px" height="100px" src={this.state.usuario['foto']} alt="foto_usuario" />
                */}
                <br />
                <div>
                  <br />
                    <Row>
                      <Col sm="12">

                        <Label for="first_name" sm={4}>Cedula</Label>
                        <Col sm={8}>
                          <p>{this.props.data.estudiante.cedula}</p>
                        </Col>
                       
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
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEstudianteEdit);
