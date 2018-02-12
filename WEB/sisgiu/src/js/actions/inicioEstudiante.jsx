import request from 'superagent';
import {host} from '../components/globalVariables';


export const get_information = (user) => {
	var token = localStorage.getItem('user_token');
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