// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Input, Form, FormGroup, Label, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, Select } from 'reactstrap';
import { PulseLoader } from 'halogenium';


// Components
import { 
    cargado,
    get_periodos_actuales,
    } from '../../actions/inicio';

import { get_estudiantes_por_periodo } from '../../actions/moduloEstudiantes';


const KEYS_TO_FILTERS = ['first_name', 'last_name', 'cedula'];
const usuarios_por_pagina = 10;

class Estudiantes extends Component{

	constructor(props) {
		super(props);
	  this.state = {
	    visible: true,
      periodo: '',
      searchTerm: '',
    }
    // this.onDismiss = this.onDismiss.bind(this);
    this.get_periodos = this.get_periodos.bind(this);
		this.handleChange = this.handleChange.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
	}

	componentDidMount() {
      this.props.get_periodos_actuales()
      .then( () => this.props.cargado() );
    	
	}

  // onDismiss() {
  //   this.setState({ visible: false });
  // }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })

    // Busco la lista de estudiantes del perido seleccionado

    this.props.get_estudiantes_por_periodo(e.target.value);

  }

  get_periodos() {

    if ( this.props.administrativoUser.lista_periodos.length > 0) {
      return this.props.administrativoUser.lista_periodos.map((periodo, index) =>
        <option key={index} value={periodo.id} name='periodo'> {periodo.tipo_postgrado}: {periodo.descripcion} </option>
      ); 
    }

    return '';
  }


  render(){
      
    console.log(this.state.periodo);

    if (!this.props.activeUser.cargado) {
      return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>);
    } else {
    	return (
    		<div>

          <FormGroup row>
            <Label for="periodo" sm={5}>Seleccione un periodo</Label>
            <Col sm={7}>
              <Input 
                bsSize="sm" 
                value={this.state.value} 
                defaultValue={this.state.periodo} 
                onChange={this.handleChange} 
                type="select" 
                name="periodo" 
                required>
                {this.get_periodos()}
              </Input>
            </Col>
          </FormGroup>

    		</div>
    	);

    }


  }


}


const mapStateToProps = (state)=> {
  return{
    activeUser: state.activeUser,
    administrativoUser: state.administrativoUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    cargado: cargado,
    get_periodos_actuales: get_periodos_actuales,
    get_estudiantes_por_periodo: get_estudiantes_por_periodo,
  }, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(Estudiantes);


