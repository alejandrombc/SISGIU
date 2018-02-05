import request from 'superagent';

const host_server = 'http://127.0.0.1:8000/'

export const recuperarContrasenaMail = (cedula) => {
	var url = host_server+'api/usuarios/'+cedula+'/recuperarContrasena/';
	return request
	   .get(url)
	   .then(function(response) {
	      return {
				type: "CORREO_ENVIADO",
				payload: {user: response.body}
			}
	   })
	   .catch(function(err) {
	      	return {
				type: "CEDULA_ERROR"
			}
	   });
}