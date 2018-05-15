//Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button, CardTitle, Row, Col } from 'reactstrap';
import { host } from '../../components/globalVariables';
import request from 'superagent';
import { bindActionCreators } from 'redux';
import { PulseLoader } from 'halogenium';


// Components
import {
	cargado,
} from '../../actions/inicio';


class ConstanciaEstudiante extends Component {

	constructor(props) {
		super(props);
		this.state = {
			cargando: false,
			error_constancia: false,
		}
		this.get_constancia = this.get_constancia.bind(this);
		this.get_file = this.get_file.bind(this);
	}


	componentDidMount() {
		this.props.cargado();
	}

	get_file(constancia, cedula, token) {
		return request
			.get(host + 'api/constancias/' + constancia + '/' + cedula + '/')
			.set('Authorization', 'JWT ' + token)
			.then(function (res) {
				var blob = new Blob([res.text]);
				var link = document.createElement('a');
				link.href = window.URL.createObjectURL(blob);
				link.download = "constancia_" + cedula + ".pdf";
				link.click();

			})
			.catch(function (err) {
				alert("Error al crear la constancia");
			});
	}

	// Constancias
	get_constancia(constancia, cedula) {
		let token = localStorage.getItem('user_token');
		this.setState({ "cargando": true },
			() => this.get_file(constancia, cedula, token)
				.then(
					() => {
						this.setState({ "cargando": false });
					}
				)
		);


	};


	render() {
		return (
			<div>
				<h4>Constancias</h4>
				<hr />
				{this.state.cargando &&
					<center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>
				}

				<Row>
					<Col sm="6">
						<Card body>
							<CardTitle className="text-center">Constancia de estudios</CardTitle>
							<Button onClick={() => this.get_constancia("estudio", this.props.activeUser.user.usuario.cedula)}>Descargar</Button>
						</Card>
					</Col>
					<Col sm="6">
						<Card body>
							<CardTitle className="text-center">Constancia de culminación</CardTitle>
							<a href={host + 'media/sisgiu/constancias/constancia_culminacion.pdf'} className="btn btn-secondary" target="_blank">Descargar</a>
						</Card>
					</Col>
				</Row>
				<br />
				<Row>
					<Col sm="6">
						<Card body>
							<CardTitle className="text-center">Constancia de Maestría Diseño Urbano</CardTitle>
							<a href={host + 'media/sisgiu/constancias/constancia_maestria_diseno_urbano.pdf'} className="btn btn-secondary" target="_blank">Descargar</a>
						</Card>
					</Col>
					<Col sm="6">
						<Card body>
							<CardTitle className="text-center">Constancia de Maestría en Planificación Urbana</CardTitle>
							<a href={host + 'media/sisgiu/constancias/constancia_maestria_planificacion_urbana.pdf'} className="btn btn-secondary" target="_blank">Descargar</a>
						</Card>
					</Col>
				</Row>
				<br />
				<Row>
					<Col sm="6">
						<Card body>
							<CardTitle className="text-center">Planilla de Curso de Extensión</CardTitle>
							<a href={host + 'media/sisgiu/constancias/planilla_curso_extension.pdf'} className="btn btn-secondary" target="_blank">Descargar</a>
						</Card>
					</Col>
					<Col sm="6">
						<Card body>
							<CardTitle className="text-center">Requisitos de Entrega de Proyecto</CardTitle>
							<a href={host + 'media/sisgiu/constancias/requisitos_entrega_proyecto.pdf'} className="btn btn-secondary" target="_blank">Descargar</a>
						</Card>
					</Col>
				</Row>
				<br />
				<Row>
					<Col sm="6">
						<Card body>
							<CardTitle className="text-center">Planilla de Inscripción de Postgrado</CardTitle>
							<a href={host + 'media/sisgiu/constancias/planilla_inscripcion_postgrado.pdf'} className="btn btn-secondary" target="_blank">Descargar</a>
						</Card>
					</Col>
					<Col sm="6">
						<Card body>
							<CardTitle className="text-center">Planilla de Inscripción de Proyecto</CardTitle>
							<a href={host + 'media/sisgiu/constancias/planilla_inscripcion_proyecto.pdf'} className="btn btn-secondary" target="_blank">Descargar</a>
						</Card>
					</Col>
				</Row>
				<br />
				<Row>
					<Col sm="6">
						<Card body>
							<CardTitle className="text-center">Recaudos Pre-Inscripción de Postgrado</CardTitle>
							<a href={host + 'media/sisgiu/constancias/recaudos_pre_postgrado.pdf'} className="btn btn-secondary" target="_blank">Descargar</a>
						</Card>
					</Col>
					<Col sm="6">
						<Card body>
							<CardTitle className="text-center">Planilla de Inscripción CAC</CardTitle>
							<a href={host + 'media/sisgiu/constancias/planilla_inscripcion_cac.pdf'} className="btn btn-secondary" target="_blank">Descargar</a>
						</Card>
					</Col>
				</Row>
				<br />
			</div>
		);
	}

}

const mapStateToProps = (state) => {
	return {
		activeUser: state.activeUser,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		cargado: cargado,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstanciaEstudiante);




