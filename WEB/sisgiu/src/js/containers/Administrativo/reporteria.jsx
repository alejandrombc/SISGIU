// Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';
import { Input, Button, FormGroup, Form, Label, Row, Col } from 'reactstrap';

// Components
import { cargado } from '../../actions/inicio';
import { get_tipo_postgrado } from '../../actions/moduloAsignaturas';

class Reporteria extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postgrado: '',
            periodo: '',
            todas_asignaturas: false,
            todos_docentes: false,
            todos_estudiantes: false,
            informacion_periodo: false,
            docentes_estudiantes: false,

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this); 
        this.get_tipo_postgrado = this.get_tipos_postgrados.bind(this);
    }

    componentDidMount() {
        this.props.get_tipo_postgrado()
            .then(() => this.props.cargado());
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleChangeCheck(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
          [name]: value
        });
    }


    handleSubmit(e){
        alert("submiteado");
    }

    get_tipos_postgrados() {

        if (this.props.docenteUser.lista_postgrados.length > 0) {
            return this.props.docenteUser.lista_postgrados.map((postgrado, index) =>
                <option key={index} value={postgrado.tipo} name='postgrado'> {postgrado.tipo}</option>
            );
        }

        return '';
    }

    render() {
        if (this.props.activeUser.cargado) {
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
                                <option value={''} name='periodo'> </option>
                                {this.get_tipos_postgrados()}
                            </Input>
                        </Col>
                    </FormGroup>
                    <br />
                    {this.state.postgrado !== '' &&
                            <div>
                                <Input
                                    bsSize="sm"
                                    defaultValue={this.state.periodo}
                                    onChange={this.handleChange}
                                    type="select"
                                    name="periodo"
                                    required>
                                    <option value={''} name='periodo'> </option>
                                    {/*this.get_periodos()*/}
                                    <option value="Periodo222" name='periodo'>Periodo222</option>
                                    <option value="Periodo111" name='periodo'>Periodo111</option>
                                </Input>
                                <br />
                                {this.state.periodo !== '' ?
                                    <Form onSubmit={() => this.handleSubmit()}>
                                        <Row>
                                            <Col md="4" className="text-center">
                                                <FormGroup >
                                                    <Label check>
                                                        <Input checked={this.state.todas_asignaturas} name="todas_asignaturas" onChange={this.handleChangeCheck} type="checkbox" />{' '}
                                                        Todas asignaturas 
                                                    </Label>                                        
                                                </FormGroup>
                                            </Col>
                                            <Col md="4" className="text-center">
                                                <FormGroup >
                                                    <Label check>
                                                        <Input checked={this.state.todos_docentes} name="todos_docentes" onChange={this.handleChangeCheck} type="checkbox" />{' '}
                                                        Todos los docentes 
                                                    </Label>                                        
                                                </FormGroup>
                                            </Col>
                                            <Col md="4" className="text-center">
                                                <FormGroup >
                                                    <Label check>
                                                        <Input checked={this.state.todos_estudiantes} name="todos_estudiantes" onChange={this.handleChangeCheck} type="checkbox" />{' '}
                                                        Todos los estudiantes 
                                                    </Label>                                        
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="6" className="text-center">
                                                <FormGroup >
                                                    <Label check>
                                                        <Input checked={this.state.informacion_periodo} name="informacion_periodo" onChange={this.handleChangeCheck} type="checkbox" />{' '}
                                                        Información del periodo
                                                    </Label>                                        
                                                </FormGroup>
                                            </Col>
                                            <Col md="6" className="text-center">
                                                <FormGroup >
                                                    <Label check>
                                                        <Input checked={this.state.docentes_estudiantes} name="informacion_periodo" onChange={this.handleChangeCheck} type="checkbox" />{' '}
                                                        Docentes con estudiantes
                                                    </Label>                                        
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" className="text-center">
                                                <Button color="primary">Generar</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                :
                                    <center><h6>Seleccione un periodo</h6></center>
                                }
                            </div>
                     }

                     {this.state.postgrado === '' &&
                        <div>
                           <center><h6>Seleccione un tipo de postgrado</h6></center>
                        </div>
                    }



                </div>
            )
        } else {
            return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>)
        }
    }
}

const mapStateToProps = (state) => {
    return {
        activeUser: state.activeUser,
        docenteUser: state.docenteUser,
        administrativoUser: state.administrativoUser,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        cargado: cargado,
        get_tipo_postgrado: get_tipo_postgrado,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Reporteria);




