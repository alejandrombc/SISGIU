// Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';
import { Input, FormGroup, Label, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
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
        //Dias de la semana
        const dias = {
            "0": "Lunes",
            "1": "Martes",
            "2": "Miercoles",
            "3": "Jueves",
            "4": "Viernes",
            "5": "Sabado",
            "6": "Domingo",
        }
        if(postgrado !== '-1'){
            var listItems = "";
            //Validamos que exista el arreglo y sea mayor a cero
            if(this.props.activeUser['programacionAcademica'] && this.props.activeUser['programacionAcademica'].length > 0){
                let N = this.props.activeUser['programacionAcademica'].length;
                //Recorremos todos los periodos del arreglo
                for (var j = 0; j < N; j++) {
                    //Si el postgrado del periodo es el que se esta buscando, muestro su informacion
                    if (this.props.activeUser['programacionAcademica'][j].tipo_postgrado === this.state.postgrado) {
                        //Guardo el id del periodo
                        let periodo = this.props.activeUser['programacionAcademica'][j].periodo_id;
                        //Filtro el arreglo de ese id
                        listItems = this.props.activeUser['programacionAcademica'][j][periodo].map((valor, index) =>{
                            var lista_docentes = [];
                            var codigo_asignatura = valor.codigo; //Obtengo el codigo de la asignatura
                            //Parseo cada informacion de la asignatura (horario dia y horario hora)
                            for (var i = 0; i < valor[codigo_asignatura].length; i++) {
                                lista_docentes[i] = <font key={i}> {dias[valor[codigo_asignatura][i]['dia']]} {valor[codigo_asignatura][i]['hora']} | Aula: {valor[codigo_asignatura][i]['aula']} <br /></font>
                            }
                            //Creo la lista de retorno por cada asignatura
                            return (
                              <ListGroupItem key={index}>
                                <ListGroupItemHeading>({valor['codigo']}) {valor['nombre']}</ListGroupItemHeading>
                                <ListGroupItemText>
                                    {lista_docentes}
                                    Prof: {valor[codigo_asignatura][0]['first_name']} {valor[codigo_asignatura][0]['last_name']}
                                </ListGroupItemText>
                              </ListGroupItem>
                            )
                            });

                        return listItems;
                    } 
                }
                return (<center><h6>Este periodo no tiene asignaturas</h6></center>);
            }
        }
	return (<center><h6>Seleccione un tipo de postgrado</h6></center>);
    }
    


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
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
    
            
            
            {this.state.postgrado !== '' &&
                <div>
                    <br/>
                    <Row>
                        <Col md='12'>
                            <ListGroup>
                                {this.get_items(this.state.postgrado)}
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




