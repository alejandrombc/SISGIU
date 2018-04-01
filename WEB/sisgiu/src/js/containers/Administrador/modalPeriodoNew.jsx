import React from 'react';
import { Input, Form, FormGroup, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../../css/moduloUsuarioAdministrador.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// Components
import { crear_periodo } from '../../actions/moduloPeriodos';
import { cargando, cargado } from '../../actions/inicio';

class ModalPeriodoNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      descripcion: null,
      tipo_postgrado: null
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
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault();
    
    this.props.cargando();

    var n = this.props.adminUser.lista_estadoPeriodo.length ;
    var id_estado_periodo;
    for (var i = 0; i<n ; i++){
      if ( this.props.adminUser.lista_estadoPeriodo[i]['estado'] === 'no iniciado' ) {
        id_estado_periodo = this.props.adminUser.lista_estadoPeriodo[i]['id'];
        break;
      }
    }

    this.props.crear_periodo(this.state, id_estado_periodo).then(()=> this.props.cargado());
    
    this.setState({
      descripcion: null,
      tipo_postgrado: null
    });
    this.toggle();


  }


  render() {


    
    
    let listPostgrados = '';
    
    if (this.props.adminUser.lista_postgrados && this.props.adminUser.lista_postgrados.length > 0) {
      listPostgrados = this.props.adminUser.lista_postgrados.map((tipo_postgrado) =>
        <option key={tipo_postgrado['id']} value={tipo_postgrado['id']} name={tipo_postgrado['tipo']}> {tipo_postgrado['tipo']} </option>
      ); 
    }
    
    return (
      <div>
        <Button color="primary" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Nueva Asignatura"><FontAwesomeIcon name="plus"/></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> 
                Agregar nuevo periodo
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
                <div>
                  <br />
                    <Row>
                      <Col sm="12">


                          <FormGroup row>
                            <Label for="tipo_postgrado" sm={4}>Postgrado</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" value={this.state.value} defaultValue={this.state['tipo_postgrado']} onChange={this.handleChange} type="select" name="tipo_postgrado" id="tipo_postgrado" required>
                                <option value={null} name={-1}> {' '} </option>
                                {listPostgrados}
                              </Input>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Label for="descripcion" sm={4}>Descripción</Label>
                            <Col sm={8}>
                              <Input bsSize="sm" type="text" name="descripcion" id="descripcion" onChange={this.handleChange} defaultValue={this.state['descripcion']} required/>
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
    crear_periodo: crear_periodo,
    cargando: cargando,
    cargado: cargado,
    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalPeriodoNew);
