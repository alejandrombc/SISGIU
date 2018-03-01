// Header de la pagina. Logos, Nombre de APP 

import React,{Component} from 'react';
import { Jumbotron, Media, Row, Col} from 'reactstrap';
import '../../css/header.css'; 
import NavigationBar from '../containers/navbar';
import {logo_fau_negro} from '../../media/logo_fau_negro.png';

class Header extends Component{
	render(){
		return (
				<div>
					<Jumbotron>
						<Row>
				        	<Col sm="9">
				        		<Row>
				        			<Col sm="3" xs="12">
					        			<Media left href="#">
						        		  <center>
						        		  	<img width="100px" height="100px" src={logo_fau_negro} className="img-thumbnail logo-header" alt='instituto-urbanismo-logo'/>
						        		  </center>
								        </Media>
				        			</Col>
				        			<Col sm="9 titulo-app">
				        					<h1 className="display-3">SISGIU</h1>
				        					<p className="lead">Sistema de Gestión del Instituto de Urbanismo</p>
				        					{/*<p className="lead">Sistema de Gestión Académica|Administrativa del Instituto de Urbanismo</p>*/}
				        			</Col>
				        		</Row>
						    </Col>
				        	<Col sm="3">
				     			<Media  right href="#">
				     				<img width="120px" height="120px" src="https://catedratesv.files.wordpress.com/2012/05/logo-ucv1.gif" className="img-responsive logo-header" alt='ucv-logo'/>
						        </Media>

						        <Media className="spaceImage" left top href="#">
				          			<img width="120px" height="120px" src="https://cdch-ucv.net/wp-content/uploads/2011/10/logo_fau_ucv.jpg" className="img-responsive logo-header" alt='instituto-urbanismo-logo'/>
				        		</Media>
				        	</Col>
				        </Row>
				        <div>
					        <hr className="my-2 hr-header" />
					        {/*Aqui abajo podria ir el navbar, y hacemos todo lo del responsive del logo y eso con hamburguesa (asi lo tiene ucv.ve)*/}


						        <NavigationBar/>

						    <hr className="my-2" />
				        </div>
				    </Jumbotron>
				</div>
			)
	}
}

export default Header;