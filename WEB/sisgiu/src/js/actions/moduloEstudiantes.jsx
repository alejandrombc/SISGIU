import request from 'superagent';
import {host} from '../components/globalVariables';

export const get_estudiantes_por_periodo = (periodo_id) =>{
	let token = localStorage.getItem('user_token');
		
	return request
	   .get(host+'api/periodoEstudiante/periodo/'+periodo_id+'/')
	   .set('Authorization', 'JWT '+token)
	   .set('Content-Type', 'application/json')
	   .then(function(res) {
			return {
				type: "GET_ESTUDIANTES_POR_PERIODO_EXITOSO",
				payload: {'lista_estudiantes': res.body}
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


export const vaciar_lista_estudiantes = () =>{
	return {
		type: "GET_ESTUDIANTES_POR_PERIODO_EXITOSO",
		payload: {'lista_estudiantes': []}
	}
}


export const pago_inscripcion_estudiantes = (estudiante_pagado, periodo_id) =>{
	let token = localStorage.getItem('user_token');

	return request
	   .post(host+'api/estudiantes/pagoInscripcion/periodo/'+periodo_id+'/')
	   .set('Authorization', 'JWT '+token)
	   .set('Content-Type', 'application/json')
	   .send(estudiante_pagado)
	   .then(function(res) {
			return {
				type: "PAGO_INSCRIPCION_ESTUDIANTES_EXITOSO",
			}
	   })
	   .catch(function(err) {
	      	return {
				type: "PAGO_INSCRIPCION_ESTUDIANTES_ERROR"
			}
	   });
}

export const get_estado_periodo = (periodo_id) =>{

	let token = localStorage.getItem('user_token');

	return request
	   .get(host+'api/periodo/'+periodo_id+'/estado/')
	   .set('Authorization', 'JWT '+token)
	   .set('Content-Type', 'application/json')
	   .then(function(res) {
			return {
				type: "GET_ESTADO_PERIODO_EXITOSO",
				payload: {'estado_periodo': res.body}
			}
	   })
	   .catch(function(err) {
	      	return {
				type: "GET_ESTADO_PERIODO_ERROR"
			}
	   });
}

export const get_asignaturas_totales = (periodo) =>{

	let token = localStorage.getItem('user_token');

	return request
	   .get(host+'api/asignaturas_actuales/periodo/'+periodo+'/')
	   .set('Authorization', 'JWT '+token)
	   .set('Content-Type', 'application/json')
	   .then(function(res) {
			return {
				type: "GET_ASIGNATURAS_PERIODO",
				payload: {'lista_asignatura_periodo': res.body}
			}
	   })
	   .catch(function(err) {
	      	return {
				type: "ERROR"
			}
	   });
}


export const get_asignaturas_estudiante = (cedula) =>{

	let token = localStorage.getItem('user_token');

	return request
	   .get(host+'api/asignaturas_actuales/estudiante/'+cedula+'/')
	   .set('Authorization', 'JWT '+token)
	   .set('Content-Type', 'application/json')
	   .then(function(res) {
			return {
				type: "GET_ASIGNATURAS_ESTUDIANTE",
				payload: {'lista_asignatura_estudiante': res.body}
			}
	   })
	   .catch(function(err) {
	      	return {
				type: "ERROR"
			}
	   });
}




