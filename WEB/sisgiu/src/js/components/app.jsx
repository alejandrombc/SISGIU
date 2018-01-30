import React from 'react';
import Header from './header'
import Login from './login'
import Footer from './footer'
// import UserList from '../containers/user-list';
// import UserDetails from '../containers/user-detail';
import { connect } from 'react-redux';
import {Route, Redirect, Switch } from 'react-router-dom';
require('../../css/App.css');


class App extends React.Component {
	render() {
		return(
			<div>

				


				<Header />
				<hr /> 
				{/*Esto va a representar todo lo variante de la pagina*/}
				{this.props.children}
				<hr/>
				<Footer />
			</div>
		);
	}
};

const mapStateToProps = (state)=> {
	return{
		token: state.activeUser
	};
}


export default connect(mapStateToProps)(App);