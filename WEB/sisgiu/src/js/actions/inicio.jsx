import request from 'superagent';
import jwt_decode from 'jwt-decode';
import {host} from '../components/globalVariables';




export function check_login () {
	let token = localStorage.getItem('user_token');
	let modulo = localStorage.getItem('modulo');
	if(token && modulo){
		try{
			var decoded = jwt_decode(token);
		}catch(e){
			localStorage.removeItem('user_token');
		   	localStorage.removeItem('modulo');
			return {
				type: "INIT_LOGIN_ERROR"
			}
		}
		return request
		   .get(host+'api/'+modulo+'/'+decoded['username'])
		   .set('Authorization', 'JWT '+token)
		   .then(function(res) {
		      return {
					type: "LOGIN_EXITOSO",
					payload: {user: res.body, modulo:modulo}
				}

		   })
		   .catch(function(err) {
		   		localStorage.removeItem('user_token');
		   		localStorage.removeItem('modulo');
		      	return {
					type: "INIT_LOGIN_ERROR"
				}
		   });
	}else{
		return {
			type: "INIT_LOGIN_ERROR"
		}	
	}

}


// InicioEstudiante
export const get_information = (user) => {
	let token = localStorage.getItem('user_token');
	return request
	   .get(host+'api/asignaturas/estudiante/'+user['usuario']['cedula']+'/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
	   	  	if(res.body.length > 0){
		      return {
					type: "GET_INFORMATION_SUCCESS",
					payload: {materias: res.body }
				}
			}else{
				return {
					type: "ESTUDIANTE_SIN_ASIGNATURA",
					payload: {materias: res.body }
				}
			}

	   })
	   .catch(function(err) {

	   		localStorage.removeItem('user_token');
	   		localStorage.removeItem('modulo');
	      	return {
				type: "GET_INFORMATION_ERROR"
			}
	   });
}

export function get_periodo_estudiante (cedula, filtro) {
	let token = localStorage.getItem('user_token');

	return request
	   .get(host+'api/periodoEstudiante/'+cedula+'/periodo/'+filtro+'/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
   			return {
				type: "GET_PERIODO_ESTUDIANTE",
				payload: {lista_periodo_estudiante: res.body}
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

export function get_periodos_tipo_postgrado (filtro, tipo_postgrado) {
	filtro = filtro.replace(" ", "%20");
	let token = localStorage.getItem('user_token');

	return request
	   .get(host+'api/periodo/'+filtro+'/tipo_postgrado/'+tipo_postgrado+'/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
   			return {
				type: "GET_PERIODOS_TIPO_POSTGRADO_EXITOSO",
				payload: {lista_periodos: res.body}
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


// InicioAdministrador
export const get_periodos_actuales = () => {
	let token = localStorage.getItem('user_token');
	return request
	   .get(host+'api/periodo/actuales/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
	   	  	if(res.body.length > 0){
		      return {
					type: "GET_PERIODOS_ACTIVOS_EXITOSO",
					payload: {periodos: res.body }
				}
			}else{
				return {
					type: "SIN_PERIODOS_ACTIVOS",
					payload: {periodos: [] }
				}
			}

	   })
	   .catch(function(err) {
	   		localStorage.removeItem('user_token');
	   		localStorage.removeItem('modulo');
	      	return {
				type: "GET_PERIODOS_ERROR"
			}
	   });

}


export const cambiarEstadoPeriodo = (periodo, lista_estadoPeriodo) =>{
	let token = localStorage.getItem('user_token');
		
	var filtro;

	if (periodo.estado_periodo === 'activo') {
		filtro = 'finalizado';
	} else {
		filtro = 'activo';
	}

	return request
	   .put(host+'api/periodo/'+periodo['id']+'/edit/filtro/'+filtro+'/')
	   .set('Authorization', 'JWT '+token)
	   .set('Content-Type', 'application/json')
	   .then(function(res) {
			return function (dispatch) {
			    dispatch(get_periodos_actuales());
			}
	   })
	   .catch(function(err) {
	      	return {
				type: "PERIODO_TERMINADO_ERROR"
			}
	   });
}
