import request from 'superagent';
import jwt_decode from 'jwt-decode';
import {host} from '../components/globalVariables';


export function get_usuarios (tipo_usuario) {
	let token = localStorage.getItem('user_token');

	try{
		jwt_decode(token);
	}catch(e){
		localStorage.removeItem('user_token');
		return {
			type: "GET_USUARIOS_ERROR"
		}
	}
	return request
	   .get(host+'api/usuarios/'+tipo_usuario+'/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
      		return {
				type: "GET_USUARIOS_EXITOSO",
				payload: {lista_usuarios: res.body}
			}
	   })
	   .catch(function(err) {
	   		localStorage.removeItem('user_token');
	      	return {
				type: "ERROR"
			}
	   });

}
