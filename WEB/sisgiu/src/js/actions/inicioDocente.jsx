import request from 'superagent';
import {host} from '../components/globalVariables';

export const get_asignaturas_docente = (user) => {
	let token = localStorage.getItem('user_token');
	return request
	   .get(host+'api/asignaturas/docente/'+user['usuario']['cedula']+'/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
		      return {
					type: "GET_ASIGNATURAS_DOCENTE",
					payload: {asignaturas: res.body }
				}

	   })
	   .catch(function(err) {

	   		localStorage.removeItem('user_token');
	   		localStorage.removeItem('modulo');
	      	return {
				type: "GET_ASIGNATURA_DOCENTE_ERROR"
			}
	   });
}

export const get_estudiantes = (asignatura, tipo_postgrado) =>{
	let token = localStorage.getItem('user_token');
	return request
	   .get(host+'api/asignaturas/'+asignatura+'/tipo_postgrado/'+tipo_postgrado+'/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
		      return {
					type: "GET_ESTUDIANTES",
					payload: {estudiantes: res.body }
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


export const cargar_notas = (estudiantes, cedula_docente, asignatura, tipo_postgrado) =>{
	let token = localStorage.getItem('user_token');

	let data = {};
	data['estudiantes'] = estudiantes;
	data['cedula_docente'] = cedula_docente;
	data['asignatura'] = asignatura;
	data['tipo_postgrado'] = tipo_postgrado;

	return request
	   .post(host+'api/estudianteAsignatura/cargarNotas/')
	   .set('Authorization', 'JWT '+token)
	   .send(data)
	   .then(function(res) {
	      	return {
				type: "CARGAR_NOTAS_EXITOSO",
			}

	   })
	   .catch(function(err) {
	      	return {
				type: "ERROR_CARGANDO_NOTAS"
			}
	   });
}
