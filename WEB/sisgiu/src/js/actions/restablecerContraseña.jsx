import request from 'superagent';
import jwt_decode from 'jwt-decode';


export function check_url_olvido_contraseña (cedula, contraseña) {
	return request
	   .get('http://127.0.0.1:8000/api/usuarios/cedula_information/'+cedula+'/olvido/')
	   .then(function(res) {

	   		console.log(res.body['password']);
	   		console.log(contraseña);

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