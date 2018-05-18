// Header de la pagina. Logos, Nombre de APP 

import React, { Component } from 'react';
import { Jumbotron, Row, Col } from 'reactstrap';
import '../../css/header.css';
import NavigationBar from '../containers/navbar';
import { host } from './globalVariables';

class Header extends Component {
	render() {
		return (
			<div>
				<Jumbotron>

					<Row>

						<Col lg='3' md='3' sm='3'>
							<a href='http://ucv.ve'>
								<img width="120px" height="120px" src={host + 'media/sisgiu/logo_ucv_blanco.png'} className="logo-header-ucv" alt='ucv-logo' />
							</a>
							<a href='https://www.fau.ucv.ve/'>
								<img width="200px" height="100px" src={host + 'media/sisgiu/logo_fau_blanco.png'} className="logo-header-fau" alt='instituto-urbanismo-logo' />
							</a>
						</Col>
						<Col lg='6' md='6' sm='4'>
							<center>
								<h1>SISGIU</h1>
								<p className="lead">
									Sistema de Gestión Académica-Administrativa 
									<br/> 
									del Departamento de Docencia del Instituto de Urbanismo
								</p>
							</center>
						</Col>
						<Col lg='3' md='3' sm='5'>
							<a href='http://urbe.fau.ucv.ve/presentacion_gente_marcano-f.html'>
								<img width="230px" height="120px" src={host + 'media/sisgiu/logo_iu_blanco.png'} className="logo-header-iu" alt='fau-logo' />
							</a>
						</Col>



					</Row>

					<div>
						<hr className="my-2 hr-header" />
						<NavigationBar />

						<hr className="my-2" />
					</div>
				</Jumbotron>
			</div>
		)
	}
}

export default Header;