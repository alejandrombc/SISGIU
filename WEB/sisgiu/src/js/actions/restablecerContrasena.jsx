import request from 'superagent';
import {host} from '../components/globalVariables';


export function check_url_recuperacion_contraseña (cedula, contraseña) {
	return request
	   .get(host + 'api/usuarios/'+cedula+'/cambiarContrasena/')
	   .then(function(res) {
	   		if ( res.body['password'] === contraseña ) {
		      	return {
					type: "URL_CORRECTO",
				} 
	   		} else {
				return {
				type: "URL_INCORRECTO",
				}
			}

	   })
	   .catch(function(err) {
	      	return {
				type: "URL_INCORRECTO",
			}
	   });
}



export function cambiar_contraseña (nueva_contrasena, cedula, contraseña ) {
	return request
		.post(host+'api/usuarios/'+cedula+'/cambiarContrasena/')
		.set('Content-Type', 'application/json')
		.send({ cedula: cedula, password: contraseña, nueva_contrasena: nueva_contrasena })
		.then(function(res) {
			return {
				type: "RECUPERACION_EXITOSA",
			} 
		})
		.catch(function(err) {
			alert("test");
			return {
				type: "RECUPERACION_ERRONEA"
			}
		});
}