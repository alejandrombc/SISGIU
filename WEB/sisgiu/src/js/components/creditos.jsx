import React, { Component } from 'react';
import '../../css/global.css';
import { Row, Col, Label } from 'reactstrap';


class Creditos extends Component {

	render() {
		return (
			<div>
					<Row>
						<Col lg='4' md='4' sm='3' xs='2'></Col>
						<Col md='4' sm='6' xs='8' className="shadowBox">
							<br />
							<h5>Créditos</h5>
							<hr />
							<Label align="justify" for="exampleSelect">SISGIU fue desarrollada como Trabajo Especial de Grado de la 
							Escuela de Computación de la Universidad Central de Venezuela.
							</Label>
							<hr />
							<Label>
								<b>Desarrolladores:</b><br/>
								- Alejandro Barone <br/>
								- José Castro
							</Label>
							<hr />
							<Label>
								<b>Tutora: </b><br/>
								- Profa. Yosly Hernández (Escuela de Computación)
							</Label>
							<br />
							<center><a class=" login-detail-panel-button btn" href="/">
								<i class="fa fa-arrow-left"></i>
									Inicio
			                </a></center>
							<br />
						</Col>
						<Col lg='4' md='4' sm='3' xs='2'></Col>
					</Row>
				</div>
		)
	}
}

export default Creditos;





