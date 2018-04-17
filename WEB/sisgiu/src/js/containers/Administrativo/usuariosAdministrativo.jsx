// Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';
import { InputGroup, Input, Button, Row, Col, Table, Alert } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';

// Components
import { cargado, get_info_usuario, cargando } from '../../actions/inicio';

class UsuariosAdministrativo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            cedula: '',
            periodos: '',
            data:
                {
                    labels: [
                        'Aprobadas',
                        'Reprobadas',
                        'Retiradas',
                    ],
                    datasets: [{
                        data: [],
                        backgroundColor: [
                            '#2EFE2E',
                            '#FE2E2E',
                            '#FFCE56'
                        ],
                        hoverBackgroundColor: [
                            '#00FF00',
                            '#DF0101',
                            '#ffc73d'
                        ]
                    }]
                }     
        }
        this.handleChange = this.handleChange.bind(this);
        this.buscarEstudiante = this.buscarEstudiante.bind(this);
        this.get_listPeriodos = this.get_listPeriodos.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    componentDidMount() {
        this.props.cargado();
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    buscarEstudiante() {
        this.props.cargando();
        this.props.get_info_usuario(this.state.cedula).then(() => this.get_listPeriodos() );
    }

    get_listPeriodos() {
        if (this.props.administrativoUser.info_usuarios_administrativo.periodos && this.props.administrativoUser.info_usuarios_administrativo.periodos[0].length > 0) {
            let listItems = this.props.administrativoUser.info_usuarios_administrativo.periodos.map((historial, i) => {
                return (
                    <div key={i}>
                        <center><h6>Periodo: {historial[0].periodo}</h6></center>
                        <Table bordered hover responsive striped size="sm">
                            <thead>
                                <tr className="text-center">
                                    <th>Asignatura</th>
                                    <th>Tipo</th>
                                    <th>UC</th>
                                    <th>Nota</th>
                                </tr>
                            </thead>
                            <tbody className="tabla_usuarios">
                                {
                                    historial.map((periodo, index) => {
                                        return (
                                            <tr className="text-center" key={index}>
                                                <td className="text-left asignatura_td">({periodo.asignatura_codigo}) {periodo.asignatura_nombre}</td>
                                                <td className="tipo_asignatura_td">{periodo.tipo_asignatura}</td>
                                                <td className="unidad_credito_td">{periodo.unidad_credito}</td>
                                                <td className="nota_definitiva_td">{periodo.nota_definitiva}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                        <br />
                    </div>
                )
            })

            let data = this.state.data;

            data.datasets[0].data = [this.props.administrativoUser.info_usuarios_administrativo.asignaturas_aprobadas,
            this.props.administrativoUser.info_usuarios_administrativo.asignaturas_reprobadas,
            this.props.administrativoUser.info_usuarios_administrativo.asignaturas_retiradas,
            ];

            this.setState({ periodos: listItems, data: data });

        }
        this.props.cargado();

    }

    render() {
        if (this.props.activeUser.cargado) {
            return (
                <div>
                    {/* Alert de Error */}
                    {this.props.administrativoUser['error_info_usuarios'] &&
                        <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                            Ha ocurrido un error. Asegurese de que el número de cédula es válido
                        </Alert>
                    }

                    <Row>
                        <Col md='6' sm='8' xs='8'>
                            <InputGroup>
                                <Input placeholder="cédula" onChange={this.handleChange} name='cedula' />
                            </InputGroup>
                        </Col>
                        <Col md='6' sm='4' xs='4'>
                            <Button color="primary" onClick={this.buscarEstudiante}>Buscar</Button>
                        </Col>
                    </Row>
                    {  this.props.administrativoUser.info_usuarios_administrativo.tipo_usuario === 'estudiante' &&
                        <div>
                            <br/>
                            <h4>Historial Académico</h4>
                            <hr />
                            <br />
                            <p>Datos del Estudiante</p>
                            <Table bordered hover responsive striped size="sm" className="text-center">
                                <thead>
                                    <tr>
                                        <th>Promedio General</th>
                                        <th>Promedio Ponderado</th>
                                        <th>Aprobadas</th>
                                        <th>Retiradas</th>
                                        <th>Reprobadas</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>

                                <tbody className="tabla_usuarios">
                                    <tr key="1">
                                        <td>{this.props.administrativoUser.info_usuarios_administrativo.promedio_general}</td>
                                        <td>{this.props.administrativoUser.info_usuarios_administrativo.promedio_ponderado}</td>
                                        <td>{this.props.administrativoUser.info_usuarios_administrativo.asignaturas_aprobadas}</td>
                                        <td>{this.props.administrativoUser.info_usuarios_administrativo.asignaturas_retiradas}</td>
                                        <td>{this.props.administrativoUser.info_usuarios_administrativo.asignaturas_reprobadas}</td>
                                        <td>{this.props.administrativoUser.info_usuarios_administrativo.total_asignaturas}</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <hr />


                            <Row>

                                <Col md='2'>

                                </Col>


                                <Col md='8'>
                                    <Doughnut data={this.state.data} />

                                </Col>


                                <Col md='2'>

                                </Col>


                            </Row>

                            <hr />


                            <p>Datos por Periodo</p>
                            {this.state.periodos}
                        </div>
                    }

                    { this.props.administrativoUser.info_usuarios_administrativo.tipo_usuario === 'docente' &&
                        <div>
                            docente
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
        administrativoUser: state.administrativoUser,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ 
        cargado: cargado,
        get_info_usuario: get_info_usuario,
        cargando: cargando,
     }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UsuariosAdministrativo);




