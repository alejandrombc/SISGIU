import request from 'superagent';

const host = 'http://localhost:8000/';

export const logout = () => {
	let jwt_token = localStorage.getItem('user_token');

	return request
	.post( host+'api/logout/' )
	.set('Content-Type', 'application/json')
	.set('Authorization', 'JWT ' + jwt_token)
	.then(function(res) {
		localStorage.removeItem('user_token');
		localStorage.removeItem('modulo');
		console.log(res.body);
		return {
			type: "LOGOUT_SUCCESS",
		}
	})
	.catch(function(err) { 
		console.log(err);
		return {
			type: "LOGOUT_ERROR"
		}
	});
}