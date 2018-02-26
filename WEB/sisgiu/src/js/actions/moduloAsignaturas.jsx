import request from 'superagent';
import jwt_decode from 'jwt-decode';
import {host} from '../components/globalVariables';

export function get_asignaturas (edit) {
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
	   .get(host+'api/asignaturas/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
			return {
				type: "GET_ASIGNATURAS_EXITOSO",
				payload: {lista_asignaturas: res.body, edit: edit}
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

export function get_tipo_postgrado () {
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
	   .get(host+'api/tipoPostgrado/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
			return {
				type: "GET_TIPO_POSTGRADO_EXITOSO",
				payload: {lista_postgrados: res.body}
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


export function get_tipo_asignatura () {
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
	   .get(host+'api/tipoAsignatura/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
			return {
				type: "GET_TIPO_ASIGNATURA_EXITOSO",
				payload: {lista_tipoAsignaturas: res.body}
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


export function crear_asignatura (asignatura) {
	let token = localStorage.getItem('user_token');
	delete asignatura.modal;
	console.log(asignatura);
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
	   .post(host+'api/asignaturas/')
	   .set('Authorization', 'JWT '+token)
	   .send(asignatura)
	   .then(function(res) {
			return function (dispatch) {
			    dispatch(get_asignaturas(true));
			}
	   })
	   .catch(function(err) {
	   		localStorage.removeItem('user_token');
	   		localStorage.removeItem('modulo');
	   		console.log(err);
	      	return function (dispatch) {
			    dispatch(get_asignaturas(false));
			}
	   });

}