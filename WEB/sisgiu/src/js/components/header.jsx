// Header de la pagina. Logos, Nombre de APP 

import React,{Component} from 'react';
import { Jumbotron, Row, Col} from 'reactstrap';
import '../../css/header.css'; 
import NavigationBar from '../containers/navbar';
import {host} from './globalVariables';

class Header extends Component{
	render(){
		return (
				<div>
					<Jumbotron>
						
					<Row>
						<Col lg='2' md='2' sm='4'>
							<a href='http://urbe.fau.ucv.ve/presentacion_gente_marcano-f.html'>
	        		  			{/* <img width="230px" height="120px" src={host + 'media/sisgiu/logo_iu_negro.png'} className="logo-header-iu" alt='fau-logo'/> */}
	        		  			<img width="230px" height="120px" src={host + 'media/sisgiu/logo_iu_blanco.png'} className="logo-header-iu" alt='fau-logo'/>
							</a>
						</Col>

						<Col lg='7' md='7' sm='5'>
							<center>
								<h1 className="display-3">SISGIU</h1>
        						<p className="lead">Sistema de Gestión del Instituto de Urbanismo</p>
        					</center>
						</Col>

						<Col lg='3' md='3' sm='3'>
							<a href='http://ucv.ve'>
	     						<img width="120px" height="120px" src="https://catedratesv.files.wordpress.com/2012/05/logo-ucv1.gif" className="logo-header-ucv" alt='ucv-logo'/>
							</a>
	          				<a href='https://www.fau.ucv.ve/'>
	          					<img width="200px" height="100px" src={host + 'media/sisgiu/logo_fau_blanco.png'} className="logo-header-fau" alt='instituto-urbanismo-logo'/>
          					</a>
						</Col>



					</Row>

				        <div>
					        <hr className="my-2 hr-header" />
						        <NavigationBar/>

						    <hr className="my-2" />
				        </div>
				    </Jumbotron>
				</div>
			)
	}
}

export default Header;