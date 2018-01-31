// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';


// Containers
import Login from '../containers/login'
import Inicio from '../containers/inicio';
import Page404 from '../components/page404';


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