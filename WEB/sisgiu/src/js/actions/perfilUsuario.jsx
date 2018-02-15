import request from 'superagent';
import {host} from '../components/globalVariables';
import mergeJSON from 'merge-json';

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
	console.log(foto);
	user.usuario.foto = foto;
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


