// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';


// Containers
import Login from '../containers/login';
import RecuperarContrasenaForm from '../containers/recuperarContrasenaForm';
import NuevaContrasenaForm from '../containers/nuevaContrasenaForm';
import Inicio from '../containers/inicio';
import Page404 from '../components/page404';
import PerfilUsuario from '../containers/perfilUsuario'



class RutasPrincipales extends React.Component {
	render() {
		return(
			<BrowserRouter>
					<Switch>
					   	<Route exact path="/" render={() => (
						  this.props.token['loggedIn'] ? (
						    <Redirect to="/inicio"/>
						  ) : (
						  	<Redirect to="/login"/>
						  )
						)}/>
					   	<Route exact path="/inicio" render={() => (
							  this.props.token['loggedIn'] ? (
							    <Inicio />
							  ) : (
							  	<Redirect to="/login"/>
							  )
						)}/>
					   	<Route exact path="/login" render={() => (
							  this.props.token['loggedIn'] ? (
							    <Redirect to="/inicio"/>
							  ) : (
							  	<Login />
							  )
						)}/>

					   	<Route exact path="/recuperarContraseña" render={() => (
							  this.props.token['loggedIn'] ? (
							    <Redirect to="/inicio"/>
							  ) : (
							  	<RecuperarContrasenaForm />
							  )
						)}/>

						<Route path="/recuperarContrasena/:cedula/:password" render={(props) => (
							  this.props.token['loggedIn'] ? (
							    <Redirect to="/inicio"/>
							  ) : (
							  	<NuevaContrasenaForm cedula={props.match.params.cedula} pathname={props.location.pathname}/>
							  )
						)}/>


						<Route path="/perfil" render={(props) => (
									  this.props.token['loggedIn'] ? (
									    <Redirect to="/inicio"/>
									  ) : (
									  	<Redirect to="/login"/>
									  )
						)}/>

					   	<Route component={Page404} ></Route>
					</Switch>
			</BrowserRouter>
		);
	}
};

const mapStateToProps = (state)=> {
	return{
		token: state.activeUser
	};
}


export default connect(mapStateToProps)(RutasPrincipales);