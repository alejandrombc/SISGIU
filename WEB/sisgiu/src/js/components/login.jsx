// Login de la pagina

import React,{Component} from 'react';


class Login extends Component{
	render(){
		return (
				<div>
					<input type='text' placeholder="Cedula"/>
					<input type='password' placeholder="Contraseña"/>
				</div>
			)
	}
}
export default Login;