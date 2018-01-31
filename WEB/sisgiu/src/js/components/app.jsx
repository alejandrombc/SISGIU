// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

// Components
import Header from './header'
import RutasPrincipales from '../routes/rutas-principales'
import Footer from './footer'

const App = () => (
		<div>
			<Header />
			<hr /> 
			<RutasPrincipales />
			<hr />
			<Footer />
		</div>
);

export default (App);