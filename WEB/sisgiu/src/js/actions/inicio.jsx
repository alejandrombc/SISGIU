import request from 'superagent';
import jwt_decode from 'jwt-decode';


export function check_login () {
	let user = localStorage.getItem('user_token');
	let modulo = localStorage.getItem('modulo');

	if(user && modulo){
		try{
			var decoded = jwt_decode(user);
		}catch(e){
			localStorage.removeItem('user_token');
		   	localStorage.removeItem('modulo');
			return {
				type: "INIT_LOGIN_ERROR"
			}
		}
		return request
		   .get('http://127.0.0.1:8000/api/'+modulo+'/'+decoded['username'])
		   .set('Authorization', 'JWT '+user)
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