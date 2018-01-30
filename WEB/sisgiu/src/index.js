import 'babel-polyfill';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import {createLogger} from 'redux-logger';
import allReducers from './js/reducers/allReducers.jsx';
import App from './js/components/app';
import registerServiceWorker from './js/registerServiceWorker';
import createBrowserHistory from 'history/createBrowserHistory'
import {BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './js/components/login';
import Page404 from './js/components/page404';
import Inicio from './js/containers/inicio';

const history = createBrowserHistory();

const logger = createLogger();
const store = createStore(
    allReducers,
    applyMiddleware(thunk, promise, logger)
);

ReactDOM.render(
    <Provider store={store}>
	   	<App>
	   		<BrowserRouter >
			   	{/*Aqui debemos poner un if de login (para que vaya a /login y /inicioSesion)*/}
			   	<Switch>
				   	{console.log(store.getState()  ) } 
				   	
				   	{/*<Route exact path="/" render={() => (
				  		this.props.token['loggedIn'] ? (
				    	<Redirect to="/inicio"/>
					  ) : (
					    <Redirect to="/login"/>
					  )
					)}/>
				*/}

				   	<Route exact path="/inicio" component={Inicio} ></Route>
				   	<Route exact path="/login" component={Login} ></Route>
				   	<Route component={Page404} ></Route>
				</Switch>
	   		</BrowserRouter>
	   	</App>
   </Provider>,
    document.getElementById('root')
);

registerServiceWorker();

