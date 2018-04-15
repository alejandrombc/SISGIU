// Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';
import { Alert, Input, FormGroup, Label, Row, Col, Button, Table, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
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
        this.mostrar_programacion_academica = this.mostrar_programacion_academica.bind(this);
        this.get_ListItems = this.get_ListItems.bind(this);

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
        this.setState({ [name]: value }, () => this.mostrar_programacion_academica());
    }

    mostrar_programacion_academica() {
        console.log(this.state.postgrado);
        const dias = {
            "0": "Lunes",
            "1": "Martes",
            "2": "Miercoles",
            "3": "Jueves",
            "4": "Viernes",
            "5": "Sabado",
            "6": "Domingo",
        }
        this.get_ListItems(dias);
    }

    get_tipos_postgrados() {

        if ( this.props.docenteUser.lista_postgrados.length > 0) {
          return this.props.docenteUser.lista_postgrados.map((postgrado, index) =>
            <option key={index} value={postgrado.tipo} name='postgrado'> {postgrado.tipo}</option>
          ); 
        }

        return '';
    }

    get_ListItems(dias) {

        let listItems = "";
        if (this.props.activeUser['programacionAcademica'] && this.props.activeUser['programacionAcademica'].length > 0) {
            
            console.log(this.props.activeUser['programacionAcademica']);
            let N = this.props.activeUser['programacionAcademica'].length;
            let periodo = [];
            for (let i = 0; i < N; i++) {
                if (this.props.activeUser['programacionAcademica'][i].tipo_postgrado === this.state.postgrado) {
                    periodo = this.props.activeUser['programacionAcademica'][i];
                    i = N;
                } 
            }
            delete periodo['tipo_postgrado'];
            delete periodo['descripcion'];

            console.log(periodo);
            
            let periodo_id;
            for (var key in periodo) {
                periodo_id = key;
            }

            console.log(periodo[key]);


            listItems = periodo[key].map((valor, index) => {
                var lista_docentes = [];
                for (var i = 0; i < valor['docente']['horario_dia'].length; i++) {

                    lista_docentes[i] = <font key={i}> {dias[valor['dia'][i]]} {valor['docente']['horario_hora'][i]} <br /></font>
                }
                return (
                    ""
                    // <ListGroupItem key={index}>
                    //     <ListGroupItemHeading>({valor['codigo']}) {valor['nombre']}</ListGroupItemHeading>
                    //     <ListGroupItemText>
                    //         {lista_docentes}
                    //         Prof: {valor['docente']['first_name']} {valor['docente']['last_name']}
                    //     </ListGroupItemText>
                    // </ListGroupItem>
                )
            });
        } else {
            listItems = <center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>
        }

        return listItems;
    }


    render() {

        if (!this.props.activeUser.cargado) {
            return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>);
        } else {
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
            
            {this.state.postgrado !== '' &&
                <div>
                    <br/>
                    <Row>
                        <Col md='12'>
                            <ListGroup>
                                {/* {this.get_ListItems(dias)} */}
                                ""
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
            }

            </div>
            )

        }


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




