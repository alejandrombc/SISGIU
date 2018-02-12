import request from 'superagent';

import {host} from '../components/globalVariables';

export const logout = () => {
	let jwt_token = localStorage.getItem('user_token');

	return request
	.post( host+'api/logout/' )
	.set('Content-Type', 'application/json')
	.set('Authorization', 'JWT ' + jwt_token)
	.then(function(res) {
		localStorage.removeItem('user_token');
		localStorage.removeItem('modulo');
		return {
			type: "LOGOUT_SUCCESS",
		}
	})
	.catch(function(err) { 
		return {
			type: "LOGOUT_ERROR"
		}
	});
}