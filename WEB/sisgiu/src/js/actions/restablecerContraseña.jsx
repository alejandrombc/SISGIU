import request from 'superagent';


export function check_url_olvido_contraseña (cedula, contraseña) {
	return request
	   .get('http://127.0.0.1:8000/api/usuarios/cedula_information/'+cedula+'/olvido/')
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



export function recuperar (nueva_contrasena, cedula, contraseña ) {
	return request
		.post('http://127.0.0.1:8000/api/usuarios/cedula_information/'+cedula+'/olvido/')
		.set('Content-Type', 'application/json')
		.send({ cedula: cedula, password: contraseña, nueva_contrasena: nueva_contrasena })
		.then(function(res) {
			return {
				type: "RECUPERACION_EXITOSA",
			} 
		})
		.catch(function(err) { // err.message, err.response });
			alert("test");
			return {
				type: "RECUPERACION_ERRONEA"
			}
		});
}