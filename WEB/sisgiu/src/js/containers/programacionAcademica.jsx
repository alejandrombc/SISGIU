// Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';
import { Alert, Input, FormGroup, Label, Row, Col, Button, Table } from 'reactstrap';
import { cargado } from '../actions/inicio';

// Components
import { get_programacion_academica } from '../actions/inicio';
import { get_tipo_postgrado } from '../actions/moduloAsignaturas';  


class ProgramacionAcademica extends Component {

    constructor(props) {
        super(props);
        this.state = {
          postgrado: '',
        }
        this.get_tipos_postgrados = this.get_tipos_postgrados.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.get_items = this.get_items.bind(this);

    }

    componentDidMount() {
        this.props.get_tipo_postgrado()
            .then( () => this.props.get_programacion_academica()
                .then(() => this.props.cargado() ));
    }


    get_items(postgrado){
        if(postgrado != '-1'){
            return postgrado;
        }
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    get_tipos_postgrados() {

        if ( this.props.docenteUser.lista_postgrados.length > 0) {
          return this.props.docenteUser.lista_postgrados.map((postgrado, index) =>
            <option key={index} value={postgrado.tipo} name='postgrado'> {postgrado.tipo}</option>
          ); 
        }

        return '';
    }


    render() {
        return (
        <div>
          <FormGroup row>
            <Label for="periodo" sm={5}>Seleccione un tipo de postgrado:</Label>
            <Col sm={7}>
              <Input 
                bsSize="sm" 
                defaultValue={this.state.postgrado} 
                onChange={this.handleChange} 
                type="select" 
                name="postgrado" 
                required>
                <option value={-1} name='periodo'> </option>
                {this.get_tipos_postgrados()}
              </Input>
            </Col>
          </FormGroup>

          {this.get_items(this.state.postgrado)}

        </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        docenteUser: state.docenteUser,
        activeUser: state.activeUser,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        cargado: cargado,
        get_tipo_postgrado: get_tipo_postgrado,
        get_programacion_academica: get_programacion_academica,
     }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramacionAcademica);




