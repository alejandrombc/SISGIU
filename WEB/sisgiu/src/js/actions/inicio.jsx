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


// InicioAdministrador
export const get_periodos_actuales = () => {
	let token = localStorage.getItem('user_token');
	return request
	   .get(host+'api/periodo/activo/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
	   	  	if(res.body.length > 0){
		      return {
					type: "GET_PERIODOS_SUCCESS",
					payload: {periodos: res.body }
				}
			}else{
				return {
					type: "SIN_PERIODOS_ACTIVOS",
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


export const terminarPeriodo = (periodo, ) =>{
	let token = localStorage.getItem('user_token');
	var result ={
		"estado_periodo":3,
		"tipo_postgrado":periodo['tipo_postgrado_id']
	}
	return request
	   .put(host+'api/periodo/'+periodo['id']+'/edit/')
	   .set('Authorization', 'JWT '+token)
	   .set('Content-Type', 'application/json')
	   .send(result)
	   .then(function(res) {
			return request
			   .get(host+'api/periodo/activo/')
			   .set('Authorization', 'JWT '+token)
			   .then(function(res) {
			   	  	if(res.body.length > 0){
				      return {
							type: "GET_PERIODOS_SUCCESS",
							payload: {periodos: res.body }
						}
					}else{
						return {
							type: "SIN_PERIODOS_ACTIVOS",
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
	   })
	   .catch(function(err) {
	      	return {
				type: "PERIODO_TERMINADO_ERROR"
			}
	   });
}
