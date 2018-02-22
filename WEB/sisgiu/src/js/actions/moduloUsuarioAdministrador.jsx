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
	delete result.rif;
	delete result.curriculum;
	delete result.permiso_ingresos;
	console.log(result);
	return request
	   .put(host+'api/'+tipo_usuario+'/'+usuario['usuario']['cedula']+'/edit/')
	   .set('Authorization', 'JWT '+token)
	   .set('Content-Type', 'application/json')
	   .send(result)
	   .then(function(res) {
	   	console.log(res.body);
		   	  	return function (dispatch) {
				    dispatch(get_usuarios(tipo_usuario ,true));
				}

	   })
	   .catch(function(err) {
	   	console.log(err)
	      	return {
				type: "EDIT_USER_INFO_ERROR"
			}
	   });
}



export const editarRif = (rif, cedula) => {
    const formData = new FormData();
    formData.append('rif',rif);
    console.log(formData.values());
	// let modulo = localStorage.getItem('modulo');
	let token = localStorage.getItem('user_token');
	alert(cedula);
	return request
	   .post(host+'api/docentes/'+cedula+'/cambiarDocumento/rif/')
	   .set('Authorization', 'JWT '+token)
	   .field('username', cedula)
	   .field('rif', rif)
	   .then(function(res) {
		   	  	return function (dispatch) {
				    dispatch(get_usuarios("docentes" ,true));
				}
	   })
	   .catch(function(err) {
	   	console.log(err);
	      	return {
				type: "EDIT_USER_INFO_ERROR"
			}
	   });
}



export const crearUsuario = (user, tipo_usuario) => {
	// Aqui se crea un usuario y luego se crea el modulo al cual pertenece dicho usuario (estudiante/docente/administrativo)
	console.log(user);
	console.log(tipo_usuario);
}
