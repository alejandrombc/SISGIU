// Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';
import { InputGroup, Input, Button, Row, Col, Table, Alert } from 'reactstrap';

// Components
import ModalUsuarioEdit from '../Administrador/modalUsuarioEdit';
import HistorialAcademico from '../Estudiante/historialAcademico';
import { cargado, get_info_usuario, cargando } from '../../actions/inicio';

class UsuariosAdministrativo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            cedula: '',   
        }
        this.handleChange = this.handleChange.bind(this);
        this.buscarEstudiante = this.buscarEstudiante.bind(this);
        this.get_listPeriodos = this.get_listPeriodos.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
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
                                <Input placeholder="Identificación" onChange={this.handleChange} name='cedula' />
                            </InputGroup>
                        </Col>
                        <Col md='6' sm='4' xs='4'>
                            <Button color="primary" onClick={this.buscarEstudiante}>Buscar</Button>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    { (this.props.administrativoUser.info_usuarios_administrativo.tipo_usuario === 'estudiantes' || this.props.administrativoUser.info_usuarios_administrativo.tipo_usuario === 'docentes') &&
                        <div>
                             <Row>
                                <Col className="text-center" md='12' sm='12' xs='12'>
                                    <ModalUsuarioEdit onDismiss={this.onDismiss} usuario={this.props.administrativoUser.info_usuarios_administrativo} is_disabled={true} tipo_usuario={this.props.administrativoUser.info_usuarios_administrativo.tipo_usuario} />
                                </Col>
                            </Row>
                        </div>
                    }

                    {  this.props.administrativoUser.info_usuarios_administrativo.tipo_usuario === 'estudiantes' &&
                        <div>
                            <hr />
                            <HistorialAcademico cedula={this.props.administrativoUser.info_usuarios_administrativo.cedula}/>
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




