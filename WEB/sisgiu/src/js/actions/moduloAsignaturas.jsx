import request from 'superagent';
import jwt_decode from 'jwt-decode';
import {host} from '../components/globalVariables';

export function get_asignaturas (edit) {
	let token = localStorage.getItem('user_token');


	return request
	   .get(host+'api/asignaturas/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
	   		let lista_asignaturas = res.body;
	   			return request
				   .get(host+'api/asignaturas_necesarias/all/')
				   .set('Authorization', 'JWT '+token)
				   .then(function(res) {
				   		if(edit === 1){
				   			return {
								type: "EDIT_ASIGNATURA_EXITOSO",
								payload: {lista_prelacion: res.body, lista_asignaturas:lista_asignaturas}
							}
				   		}else if(edit === 2){
				   			return {
								type: "ASIGNATURAS_ERROR",
								payload: {lista_prelacion: res.body, lista_asignaturas:lista_asignaturas}
							}
				   		}
				   		else{
				   			return {
								type: "GET_ASIGNATURAS_EXITOSO",
								payload: {lista_prelacion: res.body, lista_asignaturas:lista_asignaturas}
							}
				   		}

				   })
				   .catch(function(err) {
				   		localStorage.removeItem('user_token');
				   		localStorage.removeItem('modulo');
				      	return {
							type: "ERROR"
						}
				   });

	   })
	   .catch(function(err) {
	   		localStorage.removeItem('user_token');
	   		localStorage.removeItem('modulo');
	      	return {
				type: "ERROR"
			}
	   });

}

export function get_tipo_postgrado () {
	let token = localStorage.getItem('user_token');


	return request
	   .get(host+'api/tipoPostgrado/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
			return {
				type: "GET_TIPO_POSTGRADO_EXITOSO",
				payload: {lista_postgrados: res.body}
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


export function get_tipo_asignatura () {
	let token = localStorage.getItem('user_token');

	return request
	   .get(host+'api/tipoAsignatura/')
	   .set('Authorization', 'JWT '+token)
	   .then(function(res) {
			return {
				type: "GET_TIPO_ASIGNATURA_EXITOSO",
				payload: {lista_tipoAsignaturas: res.body}
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


export function crear_asignatura (asignatura) {
	let token = localStorage.getItem('user_token');

	if (asignatura.prelaciones.length > 0) {
		asignatura.prelaciones = asignatura.prelaciones.split(',');
	} else {
		asignatura.prelaciones = [];
	}

	return request
	   .post(host+'api/asignaturas/')
	   .set('Authorization', 'JWT '+token)
	   .send(asignatura)
	   .then(function(res) {

	   		return request
			   .post(host+'api/asignaturas_necesarias/')
			   .set('Authorization', 'JWT '+token)
			   .send(asignatura)
			   .then(function(res) {

					return function (dispatch) {
					    dispatch(get_asignaturas(1));
					}
			   })
			   .catch(function(err) {
			      	return function (dispatch) {
					    dispatch(get_asignaturas(2));
					}
			   });
	   })
	   .catch(function(err) {
	      	return function (dispatch) {
			    dispatch(get_asignaturas(2));
			}
	   });

}


export const editar_asignatura = (asignatura) => {
	let token = localStorage.getItem('user_token');
	console.log(asignatura);
	if (asignatura.prelaciones.length > 0) {
		asignatura.prelaciones = asignatura.prelaciones.split(',');
	} else {
		asignatura.prelaciones = [];
	}

	return request
	   .put(host+'api/asignaturas/'+asignatura['codigo']+"/edit/")
	   .set('Authorization', 'JWT '+token)
	   .send(asignatura)
	   .then(function(res) {
			return request
				.post(host+'api/asignaturas_necesarias/')
				.set('Authorization', 'JWT '+token)
				.send(asignatura)
				.then(function(res) {

					return function (dispatch) {
					    dispatch(get_asignaturas(1));
					}
				})
				.catch(function(err) {
				  	return function (dispatch) {
					    dispatch(get_asignaturas(2));
					}
				});
	   })
	   .catch(function(err) {
	      	return function (dispatch) {
			    dispatch(get_asignaturas(2));
			}
	   });

}


export const eliminar_asignatura = (asignatura) => {
	let token = localStorage.getItem('user_token');

	return request
	   .delete(host+'api/asignaturas/'+asignatura['codigo']+"/delete/")
	   .set('Authorization', 'JWT '+token)
	   .send(asignatura)
	   .then(function(res) {
			return function (dispatch) {
			    dispatch(get_asignaturas(1));
			}
	   })
	   .catch(function(err) {
	      	return function (dispatch) {
			    dispatch(get_asignaturas(2));
			}
	   });
}



