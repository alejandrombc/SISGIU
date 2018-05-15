// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import '../../css/global.css';

// Containers
import Login from '../containers/login';
import RecuperarContrasenaForm from '../containers/recuperarContrasenaForm';
import NuevaContrasenaForm from '../containers/nuevaContrasenaForm';
import Inicio from '../containers/inicio';
import Page404 from '../components/page404';




class RutasPrincipales extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={() => (
						this.props.token['loggedIn'] ? (
							<Redirect to="/inicio" />
						) : (
								<Redirect to="/login" />
							)
					)} />
					<Route exact path="/inicio" render={() => (
						this.props.token['loggedIn'] ? (
							<Inicio pestana="inicio" />
						) : (
								<Redirect to="/login" />
							)
					)} />
					<Route exact path="/login" render={() => (
						this.props.token['loggedIn'] ? (
							<Redirect to="/inicio" />
						) : (
								<Login />
							)
					)} />

					<Route exact path="/recuperarContraseña" render={() => (
						this.props.token['loggedIn'] ? (
							<Redirect to="/inicio" />
						) : (
								<RecuperarContrasenaForm />
							)
					)} />

					<Route path="/recuperarContrasena/:cedula/:password" render={(props) => (
						this.props.token['loggedIn'] ? (
							<Redirect to="/inicio" />
						) : (
								<NuevaContrasenaForm cedula={props.match.params.cedula} pathname={props.location.pathname} />
							)
					)} />


					<Route path="/perfil" render={(props) => (
						this.props.token['loggedIn'] ? (
							<Inicio pestana="perfil" />
						) : (
								<Redirect to="/login" />
							)
					)} />

					<Route path="/moduloUsuarioAdministrador" render={(props) => (
						this.props.token['loggedIn'] ? (
							<Inicio pestana="moduloUsuarioAdministrador" />
						) : (
								<Redirect to="/login" />
							)
					)} />

					<Route path="/moduloAsignaturas" render={(props) => (
						this.props.token['loggedIn'] ? (
							<Inicio pestana="moduloAsignaturas" />
						) : (
								<Redirect to="/login" />
							)
					)} />

					<Route path="/moduloPeriodos" render={(props) => (
						this.props.token['loggedIn'] ? (
							<Inicio pestana="moduloPeriodos" />
						) : (
								<Redirect to="/login" />
							)
					)} />

					<Route path="/historial" render={(props) => (
						this.props.token['loggedIn'] ? (
							<Inicio pestana="historial" />
						) : (
								<Redirect to="/login" />
							)
					)} />

					<Route path="/constancias" render={(props) => (
						this.props.token['loggedIn'] ? (
							<Inicio pestana="constancias" />
						) : (
								<Redirect to="/login" />
							)
					)} />

					<Route path="/programacionAcademica" render={(props) => (
						this.props.token['loggedIn'] ? (
							<Inicio pestana="programacionAcademica" />
						) : (
								<Redirect to="/login" />
							)
					)} />

					<Route path="/cargarNotas" render={(props) => (
						this.props.token['loggedIn'] ? (
							<Inicio pestana="cargarNotas" />
						) : (
								<Redirect to="/login" />
							)
					)} />

					<Route path="/inscripciones" render={(props) => (
						this.props.token['loggedIn'] ? (
							<Inicio pestana="inscripciones" />
						) : (
								<Redirect to="/login" />
							)
					)} />

					<Route path="/usuarios" render={(props) => (
						this.props.token['loggedIn'] ? (
							<Inicio pestana="usuarios" />
						) : (
								<Redirect to="/login" />
							)
					)} />


					<Route component={Page404} ></Route>
				</Switch>
			</BrowserRouter>
		);
	}
};

const mapStateToProps = (state) => {
	return {
		token: state.activeUser
	};
}


export default connect(mapStateToProps)(RutasPrincipales);