// Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';
import { Input, Button, FormGroup, Form, Label, Row, Col } from 'reactstrap';

// Components
import { cargado } from '../../actions/inicio';
import { get_tipo_postgrado } from '../../actions/moduloAsignaturas';
import { get_lista_periodos, get_reporte } from '../../actions/reportes';

class Reporte extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postgrado: '',
            periodo: '',
            asignaturas_dictadas: false,
            docentes: false,
            estudiantes_inscritos: false,
            estudiantes_aprobados: false,
            estudiantes_reprobados: false,
            estudiantes_retirados: false,
            informacion_general: false,
            informacion_detallada: false,

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCheck = this.handleChangeCheck.bind(this);
        this.get_tipos_postgrado = this.get_tipos_postgrados.bind(this);
        this.get_periodos_por_tipo_postgrado = this.get_periodos_por_tipo_postgrado.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.props.get_tipo_postgrado()
            .then(() => this.props.get_lista_periodos()
                .then(() => this.props.cargado()));
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


    handleSubmit(e) {
        this.props.get_reporte(this.state);
        this.setState({
            asignaturas_dictadas: false,
            docentes: false,
            estudiantes_inscritos: false,
            estudiantes_aprobados: false,
            estudiantes_reprobados: false,
            estudiantes_retirados: false,
            informacion_general: false,
            informacion_detallada: false,
        });
    }

    get_tipos_postgrados() {

        if (this.props.docenteUser.lista_postgrados.length > 0) {
            return this.props.docenteUser.lista_postgrados.map((postgrado, index) =>
                <option key={index} value={postgrado.id} name='postgrado'> {postgrado.tipo}</option>
            );
        }

        return '';
    }

    get_periodos_por_tipo_postgrado() {

        let periodos = '';
        let lista_periodos = [];

        this.props.administrativoUser.lista_periodos.forEach(periodo => {
            if (parseInt(periodo.tipo_postgrado, 10) === parseInt(this.state.postgrado, 10))
                lista_periodos.push(periodo);
        });


        if (lista_periodos.length > 0) {
            return lista_periodos.map((periodo, index) =>
                <option key={index} value={periodo.id} name='periodo'> {'Periodo: ' + periodo.numero_periodo + ' (' + periodo.mes_inicio + ' ' + periodo.anio_inicio + ' - ' + periodo.mes_fin + ' ' + periodo.anio_fin + ')'}</option>
            );
        }

        return periodos;
    }

    render() {
        if (this.props.activeUser.cargado) {
            return (
                <div>
                    <h4><center>Reportes</center></h4><br />
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
                            <FormGroup row>
                                <Label for="periodo" sm={5}>Seleccione un periodo:</Label>
                                <Col sm={7}>
                                    <Input
                                        bsSize="sm"
                                        defaultValue={this.state.periodo}
                                        onChange={this.handleChange}
                                        type="select"
                                        name="periodo"
                                        required>
                                        <option value={''} name='periodo'> </option>
                                        {this.get_periodos_por_tipo_postgrado()}
                                    </Input>
                                </Col>
                            </FormGroup>

                            <br />
                            {this.state.periodo !== '' &&
                                <div>
                                    <h5><center>¿Qué desea visualizar en el reporte?</center></h5><br />
                                    <Form >
                                        <Row>
                                            <Col md="12" className="text-center">
                                                <FormGroup >
                                                    <Label check>
                                                        <Input checked={this.state.informacion_detallada} name="informacion_detallada" onChange={this.handleChangeCheck} type="checkbox" />{' '}
                                                        Datos en Detalle
                                                            </Label>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="4" className="text-center">
                                                <FormGroup >
                                                    <Label check>
                                                        <Input checked={this.state.asignaturas_dictadas} name="asignaturas_dictadas" onChange={this.handleChangeCheck} type="checkbox" />{' '}
                                                        Asignaturas Dictadas
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="4" className="text-center">
                                                <FormGroup >
                                                    <Label check>
                                                        <Input checked={this.state.docentes} name="docentes" onChange={this.handleChangeCheck} type="checkbox" />{' '}
                                                        Docentes
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="4" className="text-center">
                                                <FormGroup >
                                                    <Label check>
                                                        <Input checked={this.state.estudiantes_inscritos} name="estudiantes_inscritos" onChange={this.handleChangeCheck} type="checkbox" />{' '}
                                                        Estudiantes Inscritos
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="4" className="text-center">
                                                <FormGroup >
                                                    <Label check>
                                                        <Input checked={this.state.estudiantes_aprobados} name="estudiantes_aprobados" onChange={this.handleChangeCheck} type="checkbox" />{' '}
                                                        Estudiantes Aprobados
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="4" className="text-center">
                                                <FormGroup >
                                                    <Label check>
                                                        <Input checked={this.state.estudiantes_reprobados} name="estudiantes_reprobados" onChange={this.handleChangeCheck} type="checkbox" />{' '}
                                                        Estudiantes Reprobados
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                            <Col md="4" className="text-center">
                                                <FormGroup >
                                                    <Label check>
                                                        <Input checked={this.state.estudiantes_retirados} name="estudiantes_retirados" onChange={this.handleChangeCheck} type="checkbox" />{' '}
                                                        Estudiantes Retirados
                                                    </Label>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12" className="text-center">
                                                <Button color="primary" onClick={this.handleSubmit}>Generar</Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            }
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
        get_lista_periodos: get_lista_periodos,
        get_reporte: get_reporte,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Reporte);




