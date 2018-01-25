// Login de la pagina
import { Button } from 'reactstrap';
import React,{Component} from 'react';
import request from 'superagent';
import _ from 'lodash';


class Login extends Component{
	//Constructor del componente (set del state)
	constructor(props) {
    	super();
    	this.state = {};
  	}


  	sendLoginForm(){
  		// Falta obtener los valores de los text inputs y luego hacer las validaciones de campos
  		// en el formulario
  		request
			.post('http://127.0.0.1:8000/api-auth/login/')
			.set('Content-Type', 'application/json')
			.send({ username: 'admin', password: 'admin123456' })
			.then(function(res) {
				localStorage.setItem('user_token',res.body['token']); //Guardo en el local storage
			});		
  	}

	render(){
		// var crypto = _.map(this.state.crypto, (crypto) => {
		// 	return <li> {crypto.name} </li>;
		// });
		return (
				<div>
					<input type='text' placeholder="Cedula"/>
					<input type='password' placeholder="Contraseña"/>
					<Button color="primary" onClick={this.sendLoginForm}>Enviar</Button>
				</div>
			)
	}
}
export default Login;