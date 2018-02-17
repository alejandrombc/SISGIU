import request from 'superagent';
import {host} from '../components/globalVariables';
import mergeJSON from 'merge-json';
import {check_login} from './inicio'

let token = localStorage.getItem('user_token');
let modulo = localStorage.getItem('modulo');

export const editarUsuario = (cambios, user) => {
	var result = mergeJSON.merge(user, cambios);
	delete result.usuario.foto;

	console.log(result);
	return request
	   .put(host+'api/'+modulo+'/'+user['usuario']['cedula']+'/edit/')
	   .set('Authorization', 'JWT '+token)
	   .set('Content-Type', 'application/json')
	   .send(result)
	   .then(function(res) {
		      return {
					type: "EDIT_USER_INFO_SUCCESS",
					payload: {user: res.body }
				}

	   })
	   .catch(function(err) {
	      	return {
				type: "EDIT_USER_INFO_ERROR"
			}
	   });
}



export const cambiarContrasena = (password, user) => {
	user.usuario.password = password;
	delete user.usuario.foto;
	console.log(user);

	return request
	   .put(host+'api/'+modulo+'/'+user.usuario.cedula+'/edit/')
	   .set('Authorization', 'JWT '+token)
	   .set('Content-Type', 'application/json')
	   .send(user)
	   .then(function(res) {
	   	console.log(res.body);
		      return {
					type: "EDIT_USER_PASSWORD_SUCCESS",
					payload: {user: res.body }
				}

	   })
	   .catch(function(err) {
	   	console.log(err);
	      	return {
				type: "EDIT_USER_PASSWORD_ERROR"
			}
	   });
}


export const cambiarFoto = (foto, user) => {
    const formData = new FormData();
    formData.append('foto',foto)
    formData.append('username',user.usuario.cedula)
    console.log(formData.values());
	let modulo = localStorage.getItem('modulo');
	let token = localStorage.getItem('user_token');
	return request
	   .post(host+'api/usuarios/'+user.usuario.cedula+'/cambiarFoto/')
	   .set('Authorization', 'JWT '+token)
	   .field('username', user.usuario.cedula)
	   .field('foto', foto)
	   .then(function(res) {
		   	  	return function (dispatch) {
				    dispatch(check_login());
				}
	   })
	   .catch(function(err) {
	   	console.log(err);
	      	return {
				type: "EDIT_USER_PHOTO_ERROR"
			}
	   });

}


