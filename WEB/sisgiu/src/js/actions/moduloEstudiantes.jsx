import request from 'superagent';
import {host} from '../components/globalVariables';

export const get_estudiantes_por_periodo = (periodo_id) =>{
	let token = localStorage.getItem('user_token');
		
	return request
	   .get(host+'api/periodoEstudiante/'+periodo_id+'/')
	   .set('Authorization', 'JWT '+token)
	   .set('Content-Type', 'application/json')
	   .then(function(res) {
	   	console.log(res.body);
			return {
				type: "EXITO",
				// payload: {'estado_estudiante': res.body}
			}
	   })
	   .catch(function(err) {
	      	return {
				type: "ERROR_JKSNEFKDN"
			}
	   });
}