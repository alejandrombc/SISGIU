import request from 'superagent';
import {host} from '../components/globalVariables';


export const login = (cedula, password, modulo) => {
	return request
		.post(host+'api/login/')
		.set('Content-Type', 'application/json')
		.send({ username: cedula, password: password })
		.then(function(res) {
		
			localStorage.setItem('user_token',res.body['token']); //Guardo en el local storage
			localStorage.setItem('modulo',modulo); //Guardo en el local storage
			var url = host+'api/'+modulo+'/'+cedula+'/';
			return request
			   .get(url)
			   .set('Authorization', 'JWT '+localStorage.getItem('user_token'))
			   .then(function(response) {

			      return {
						type: "LOGIN_EXITOSO",
						payload: {user: response.body, modulo:modulo}
					}
			   })
			   .catch(function(err) {
			   		localStorage.removeItem('user_token');
			   		localStorage.removeItem('modulo');
			      	return {
						type: "LOGIN_ERROR_MODULE"
					}
			   });
		})
		.catch(function(err) { // err.message, err.response });
			return {
				type: "LOGIN_ERROR"
			}
		});
}