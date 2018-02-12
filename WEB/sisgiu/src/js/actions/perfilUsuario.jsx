import request from 'superagent';
import {host} from '../components/globalVariables';
import mergeJSON from 'merge-json';

export const editarUsuario = (cambios, user) => {
	var token = localStorage.getItem('user_token');
	var modulo = localStorage.getItem('modulo');
	var result = mergeJSON.merge(user, cambios);
	delete result.usuario.foto;
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