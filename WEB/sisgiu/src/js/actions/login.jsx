import request from 'superagent';

export const login = () => {

	var cedula = "jbjbj";
	var password = 'admin123456';
	console.log('hola')



	// Falta obtener los valores de los text inputs y luego hacer las validaciones de campos
	// en el formulario
	request
	.post('http://127.0.0.1:8000/api-auth/login/')
	.set('Content-Type', 'application/json')
	.send({ username: cedula, password: password })
	.then(function(res) {
		localStorage.setItem('user_token',res.body['token']); //Guardo en el local storage
		console.log(res.body)

		return {
			type: "LOGIN_EXITOSO"
		}
	}
	)
	.catch(function(err) { // err.message, err.response });
		alert(err.message);
		return {
			type: "LOGIN_ERROR"
		}
	});


	return {
		type: "LOGIN_ERROR"
	}

		
}
