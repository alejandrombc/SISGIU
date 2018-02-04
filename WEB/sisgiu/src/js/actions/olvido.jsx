import request from 'superagent';

export const recuperar = (cedula) => {
	var url = 'http://127.0.0.1:8000/api/usuarios/'+cedula+'/olvido/';
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