// Login de la pagina
import { Button, Input, Row, Col, Form, FormGroup, Label, Alert } from 'reactstrap';
import React, { Component } from 'react';
import { login } from '../actions/login.jsx';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../css/global.css';
//Spinner
import { PulseLoader } from 'halogenium';

class Login extends Component {

	constructor(props) {
		super(props);

		if (!this.props.token['loggedIn']) {
			this.state = {
				cedula: '',
				password: '',
				modulo: 'estudiantes',
				tipo_documento: 'V',
				loading: false,
				visible: true,
			};
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onDismiss = this.onDismiss.bind(this);
	}

	onDismiss() {
		this.setState({ visible: false });
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	handleSubmit(e) {
		e.preventDefault();

		let { cedula, password, modulo, tipo_documento } = this.state;

		cedula = tipo_documento + cedula;

		if (cedula && password && modulo) {
			this.props.token['bad_input'] = false;
			this.props.token['bad_module'] = false;
			this.setState({ loading: true });
			this.setState({ visible: true });
			this.props.login(cedula, password, modulo);
		}
	}

	render() {
		if (!this.props.token['loggedIn']) {
			const { cedula, password } = this.state;
			return (
				<div>
					<Row>
						<Col lg='4' md='4' sm='3' xs='2'></Col>
						<Col md='4' sm='6' xs='8' className="shadowBox">
							<Form onSubmit={this.handleSubmit}>
								<br />
								<h5>Sesión</h5>

								{!this.props.token['bad_input'] && !this.props.token['bad_module'] && this.state.loading &&
									<center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>
								}
								{this.props.token['bad_input'] &&
									<Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
										Credenciales erróneas
								      </Alert>
								}
								{this.props.recuperacion['recuperacion'] &&
									<Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
										Contraseña actualizada correctamente
								      </Alert>
								}
								{this.props.token['bad_module'] &&
									<Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
										Usted no pertenece a ese módulo
								      </Alert>
								}
								<hr />
								<FormGroup>
									<Label for="exampleSelect">Módulo</Label>
									<select name="modulo" className="form-control" value={this.state.value} onChange={this.handleChange} >
										<option value="estudiantes">Estudiante</option>
										<option value="docentes">Docente</option>
										<option value="administrativo">Administrativo</option>
										<option value="administradores">Administrador</option>
									</select>
								</FormGroup>
								<FormGroup>
									<Label>Cédula o Pasaporte</Label>
									<Row>
										<Col md='3'>
											<select name="tipo_documento" className="form-control" onChange={this.handleChange} >
												<option value="V">V</option>
												<option value="E">E</option>
												<option value="P">P</option>
											</select>

										</Col>
										<Col md='9'>
											<Input type="text" name="cedula" id="cedula" value={cedula} required onChange={this.handleChange} placeholder="Ej: 10987658" />
										</Col>
									</Row>
								</FormGroup>
								<FormGroup>
									<Label for="password">Contraseña</Label>
									<Input type="password" name="password" id="password" value={password} required onChange={this.handleChange} placeholder="Contraseña" />
								</FormGroup>
								<div className="text-center">
									<Button color="primary">Enviar</Button>
									<br />
									<a href='/recuperarContraseña'>Olvidé mi contraseña</a>
									<br /><br />
								</div>


							</Form>
						</Col>
						<Col lg='4' md='4' sm='3' xs='2'></Col>
					</Row>
				</div>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.activeUser,
		recuperacion: state.recuperarContrasena
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ login: login }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);