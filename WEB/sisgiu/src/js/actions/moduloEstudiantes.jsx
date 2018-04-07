import request from 'superagent';
import {host} from '../components/globalVariables';

export const get_estudiantes_por_periodo = (periodo_id) =>{
	let token = localStorage.getItem('user_token');
		
	return request
	   .get(host+'api/periodoEstudiante/periodo/'+periodo_id+'/')
	   .set('Authorization', 'JWT '+token)
	   .set('Content-Type', 'application/json')
	   .then(function(res) {
	   	console.log(res.body);
			return {
				type: "GET_ESTUDIANTES_POR_PERIODO_EXITOSO",
				payload: {'lista_estudiantes': res.body}
			}
	   })
	   .catch(function(err) {
	      	return {
				type: "ERROR_CAMBIAR_ESTO"
			}
	   });
}


export const vaciar_lista_estudiantes = () =>{
	let token = localStorage.getItem('user_token');
		
	return {
		type: "GET_ESTUDIANTES_POR_PERIODO_EXITOSO",
		payload: {'lista_estudiantes': []}
	}
}