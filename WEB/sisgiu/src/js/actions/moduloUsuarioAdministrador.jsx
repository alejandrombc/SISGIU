import request from 'superagent';
import jwt_decode from 'jwt-decode';
import {host} from '../components/globalVariables';
import mergeJSON from 'merge-json';


export function get_usuarios (tipo_usuario, edit) {
	let token = localStorage.getItem('user_token');

	try{
		jwt_decode(token);
	}catch(e){
		localStorage.removeItem('user_token');
		localStorage.removeItem('modulo');
		return {
			type: "ERROR"
		}
	}
	return request
	   .get(host+'api/usuarios/'+tipo_usuario+'/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
	   		if(edit){
	   			return {
					type: "EDIT_USER_INFO_SUCCESS",
					payload: {lista_usuarios: res.body}
				}
	   		}else{
	   			return {
					type: "GET_USUARIOS_EXITOSO",
					payload: {lista_usuarios: res.body}
				}
	   		}

	   })
	   .catch(function(err) {
	   		localStorage.removeItem('user_token');
	   		localStorage.removeItem('modulo');
	      	return {
				type: "ERROR"
			}
	   });

}


export const editarUsuario = (cambios, user, tipo_usuario) => {
	let token = localStorage.getItem('user_token');
	let usuario = {
		"usuario": user
	}

	var result = mergeJSON.merge(usuario, cambios);
	delete result.usuario.foto;

	console.log(result);
	return request
	   .put(host+'api/'+tipo_usuario+'/'+usuario['usuario']['cedula']+'/edit/')
	   .set('Authorization', 'JWT '+token)
	   .set('Content-Type', 'application/json')
	   .send(result)
	   .then(function(res) {
		   	  	return function (dispatch) {
				    dispatch(get_usuarios(tipo_usuario ,true));
				}

	   })
	   .catch(function(err) {
	   	alert("MAL NO SE CAMBIO");
	   	console.log(err)
	      	return {
				type: "EDIT_USER_INFO_ERROR"
			}
	   });
}