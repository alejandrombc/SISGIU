import React from 'react';
import { Input, Form, FormGroup, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../../css/moduloUsuarioAdministrador.css';
import '../../../css/select.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';

// Components
import { crear_asignatura } from '../../actions/moduloAsignaturas';

class ModalAsignaturaNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      codigo: null,
      nombre: null,
      unidad_credito: null,
      tipo_asignatura: null,
      prelaciones: [],
      tipos_postgrado: [],
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectChangeTipoPostgrado = this.handleSelectChangeTipoPostgrado.bind(this);

  }


  handleSelectChange (prelaciones) {
    this.setState({ prelaciones });
  }

  handleSelectChangeTipoPostgrado(tipos_postgrado) {
    this.setState({ tipos_postgrado });
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
    
    this.props.triggerParentUpdate();
    this.props.crear_asignatura(this.state);
    
    this.setState({
      codigo: null,
      nombre: null,
      unidad_credito: null,
      tipo_asignatura: null,
      prelaciones:[],
      tipos_postgrado: [],
    });
    this.props.triggerParentUpdate();
    this.toggle();


  }


  render() {
    const { prelaciones, tipos_postgrado } = this.state;
    var options = JSON.parse(JSON.stringify(this.props.adminUser['lista_asignaturas']).split('"codigo":').join('"value":')); //Rename key 
    options = JSON.parse(JSON.stringify(options).split('"nombre":').join('"label":')); //Rename key 
    
    var options_tipo_postgrado = JSON.parse(JSON.stringify(this.props.adminUser['lista_postgrados']).split('"id":').join('"value":')); //Rename key 
    options_tipo_postgrado = JSON.parse(JSON.stringify(options_tipo_postgrado).split('"tipo":').join('"label":')); //Rename key 
    let listTipoAsignaturas = '';
    

    if (this.props.adminUser.lista_tipoAsignaturas && this.props.adminUser.lista_tipoAsignaturas.length > 0) {
      listTipoAsignaturas = this.props.adminUser.lista_tipoAsignaturas.map((tipo_asignatura) =>
        <option key={tipo_asignatura['id']} value={tipo_asignatura['id']} name={tipo_asignatura['nombre']}> {tipo_asignatura['nombre']} </option>
      ); 
    }

    
    return (
      <div>
        <Button color="primary" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Nueva Asignatura"><FontAwesomeIcon name="plus"/></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> 
                Agregar nueva asignatura
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
                <div>
                  <br />
                    <Row>
                      <Col sm="12">
                          
                          <FormGroup row>
                            <Label className="required" for="codigo" sm={5}>Código</Label>
                            <Col sm={7}>
                              <Input bsSize="sm" type="text" name="codigo" id="codigo" onChange={this.handleChange} defaultValue={this.state['codigo']} required/>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Label className="required" for="nombre" sm={5}>Nombre</Label>
                            <Col sm={7}>
                              <Input bsSize="sm" type="text" name="nombre" id="nombre" onChange={this.handleChange} defaultValue={this.state['nombre']} required/>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Label className="required" for="unidad_credito" sm={5}>Unidades de Crédito</Label>
                            <Col sm={7}>
                              <Input bsSize="sm" type="number" name="unidad_credito" id="unidad_credito" onChange={this.handleChange} defaultValue={this.state['unidad_credito']} required/>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Label className="required" for="tipo_asignatura" sm={5}>Tipo</Label>
                            <Col sm={7}>
                              <Input bsSize="sm" value={this.state.value} defaultValue={this.state['tipo_asignatura']} onChange={this.handleChange} type="select" name="tipo_asignatura" id="tipo_asignatura" required>
                                <option value={null} name={-1}> {' '} </option>
                                {listTipoAsignaturas}
                              </Input>
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Label for="asignaturas_necesarias" sm={5}>Asignaturas necesarias</Label>
                            <Col sm={7}>
                                  <Select
                                    closeOnSelect={true}
                                    disabled={false}
                                    multi
                                    onChange={this.handleSelectChange}
                                    options={options}
                                    placeholder="Seleccione alguna asignatura"
                                    removeSelected={true}
                                    rtl={false}
                                    simpleValue
                                    value={prelaciones}
                                  />
                            </Col>
                          </FormGroup>

                          <FormGroup row>
                            <Label className="required" for="tipos_postgrado" sm={5}>Tipo de Postgrado</Label>
                            <Col sm={7}>
                              <Select
                                closeOnSelect={true}
                                disabled={false}
                                multi
                                onChange={this.handleSelectChangeTipoPostgrado}
                                options={options_tipo_postgrado}
                                placeholder="Tipos de postgrado"
                                removeSelected={true}
                                rtl={false}
                                simpleValue
                                value={tipos_postgrado}
                                required
                              />
                            </Col>
                          </FormGroup>

                          <font size="2"><span className="required"></span> Campo requerido</font>
                          
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
    crear_asignatura: crear_asignatura,

    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalAsignaturaNew);
