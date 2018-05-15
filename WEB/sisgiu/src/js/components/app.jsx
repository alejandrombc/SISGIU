// Dependencies
import React from 'react';
import '../../css/global.css';

// Components
import Header from './header'
import RutasPrincipales from '../routes/rutas-principales'
import Footer from './footer'

const App = () => (
	<div className="content_background">
		<Header />

		<RutasPrincipales />

		<Footer />
	</div>
);

export default (App);