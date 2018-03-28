import request from 'superagent';
import {host} from '../components/globalVariables';


export function get_asignaturas_inscripcion (cedula) {
	let token = localStorage.getItem('user_token');

	return request
	   .get(host+'api/asignaturas_a_inscribir/estudiante/'+cedula+'/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
	   		return {
	   			type: 'GET_ASIGNATURAS_INSCRIPCION_EXITOSO',
	   			payload: {lista_asignaturas_inscripcion: res.body}
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


export function inscribir_asignaturas(data, cedula) {
	let token = localStorage.getItem('user_token');

	return request
	   .post(host+'api/estudianteAsignatura/inscribir/'+cedula+'/')
	   .set('Authorization', 'JWT '+token)
	   .send(data)
	   .then(function(res) {
	   		console.log(res.body);
	   		return {
	   			type: 'INSCRIPCION_EXITOSA',
	   		}
	   })
	   .catch(function(err) {
	      	return {
				type: "ERROR_INSCRIPCION"
			}
	   });

}