import request from 'superagent';

export const login = (cedula, password) => {
	return request
	.post('http://127.0.0.1:8000/api-auth/login/')
	.set('Content-Type', 'application/json')
	.send({ username: cedula, password: password })
	.then(function(res) {
	
		localStorage.setItem('user_token',res.body['token']); //Guardo en el local storage
		console.log(res.body)	
		return {
			type: "LOGIN_EXITOSO",
			payload: {user: res.body}
		}
	})
	.catch(function(err) { // err.message, err.response });
		return {
			type: "LOGIN_ERROR"
		}
	});

}