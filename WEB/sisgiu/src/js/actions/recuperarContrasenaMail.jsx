import request from 'superagent';
import {host} from '../components/globalVariables';


export const recuperarContrasenaMail = (cedula) => {
	var url = host+'api/usuarios/'+cedula+'/recuperarContrasena/';
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