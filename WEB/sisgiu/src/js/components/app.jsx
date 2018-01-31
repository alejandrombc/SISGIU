// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// Components
import Header from './header'
import Login from './login'
import Footer from './footer'
import Page404 from './page404';
import Inicio from '../containers/inicio';


class App extends React.Component {
	render() {
		return(
			<BrowserRouter>
				<div>
					<Header />
					<hr /> 

					<Switch>
					   	<Route exact path="/" component={Inicio} ></Route>
					   	<Route exact path="/inicio" component={Inicio} ></Route>
					   	<Route exact path="/login" component={Login} ></Route>
					   	<Route component={Page404} ></Route>
					</Switch>

					{/*
					  {this.props.children}
					*/}

					<hr/>
					<Footer />
				</div>
			</BrowserRouter>
		);
	}
};

const mapStateToProps = (state)=> {
	return{
		token: state.activeUser
	};
}


export default connect(mapStateToProps)(App);