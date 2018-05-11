// Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';
import { InputGroup, Input, Button, Row, Col, Alert } from 'reactstrap';
import ConfirmButton from 'react-confirm-button';

// Components
import ModalUsuarioEdit from '../Administrador/modalUsuarioEdit';
import HistorialAcademico from '../Estudiante/historialAcademico';
import { cargado, get_info_usuario, cargando, retirar_periodo, estado_retiro_estudiante } from '../../actions/inicio';


class UsuariosAdministrativo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            cedula: '',
            tipo_documento: 'V',
        }
        this.handleChange = this.handleChange.bind(this);
        this.buscarEstudiante = this.buscarEstudiante.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
        this.retirar_periodo = this.retirar_periodo.bind(this);
    }

    onDismiss() {
        this.setState({ visible: false });
    }

    componentDidMount() {
        this.props.cargado();
    }

    componentWillReceiveProps(props) {
        this.setState({tipo_documento: 'V'});
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    buscarEstudiante() {
        this.props.cargando();
        this.props.estado_retiro_estudiante(this.state.tipo_documento + this.state.cedula)
                .then(() => this.props.cargado());

        this.props.get_info_usuario(this.state.tipo_documento + this.state.cedula);
    }

    retirar_periodo(cedula, id_periodo) {
        this.props.retirar_periodo(cedula, id_periodo).then(() => this.props.cargado() );
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
                        <Col md='2' sm='3' xs='2'>
                            <select name="tipo_documento" className="form-control" onChange={this.handleChange} >
                                <option value="V">V</option>
                                <option value="E">E</option>
                                <option value="P">P</option>
                            </select>
                        </Col>
                        <Col md='5' sm='7' xs='7'>
                            <InputGroup>
                                <Input placeholder="Cédula o Pasaporte" onChange={this.handleChange} name='cedula' />
                            </InputGroup>
                        </Col>
                        <Col md='5' sm='2' xs='3'>
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
                            {!this.props.administrativoUser.estudiante_retirado &&
                            <Row>
                                <Col md='12' className="text-center">
                                    <ConfirmButton
                                        disableAfterConfirmed
                                        onConfirm={() => this.retirar_periodo(this.props.administrativoUser.info_usuarios_administrativo.cedula, this.props.administrativoUser.info_usuarios_administrativo.id_periodo_actual)}
                                        text="Retirar"
                                        className="btn btn-danger btn-sm float-right"
                                        confirming={{
                                            text: '¿Está Seguro?',
                                            className: 'btn btn-danger btn-sm float-right',
                                        }}
                                        disabled={{
                                            text: 'Retirado',
                                            className: 'btn btn-danger btn-sm float-right',
                                        }}
                                        />
                                </Col>
                            </Row>
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
        administrativoUser: state.administrativoUser,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ 
        cargado: cargado,
        get_info_usuario: get_info_usuario,
        cargando: cargando,
        retirar_periodo: retirar_periodo,
        estado_retiro_estudiante: estado_retiro_estudiante,
     }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UsuariosAdministrativo);




