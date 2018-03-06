import request from 'superagent';
import jwt_decode from 'jwt-decode';
import {host} from '../components/globalVariables';

export function get_periodos (edit) {
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
	   .get(host+'api/periodo/noIniciado/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
	   		if(edit === 1){
	   			return {
					type: "EDIT_PERIODO_EXITOSO",
					payload: {lista_periodos: res.body}
				}
	   		}else if(edit === 2){
	   			return {
					type: "PERIODO_ERROR",
					payload: {lista_periodos: res.body}
				}
	   		}
	   		else{
	   			return {
					type: "GET_PERIODOS_EXITOSO",
					payload: {lista_periodos: res.body}
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
