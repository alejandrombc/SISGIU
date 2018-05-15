import request from 'superagent';
import { host } from '../components/globalVariables';


/* 
edit_create_or_error = 1 -> Editado Exitosamente
edit_create_or_error = 2 -> Error
edit_create_or_error = 3 -> Creado Exitosamente
*/

export function get_asignaturas(edit_create_or_error) {
	let token = localStorage.getItem('user_token');


	return request
		.get(host + 'api/asignaturas/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			let lista_asignaturas = res.body;
			return request
				.get(host + 'api/asignaturas_necesarias/all/')
				.set('Authorization', 'JWT ' + token)
				.then(function (res) {
					if (edit_create_or_error === 1) {
						return {
							type: "EDIT_ASIGNATURA_EXITOSO",
							payload: { lista_prelacion: res.body, lista_asignaturas: lista_asignaturas }
						}
					} else if (edit_create_or_error === 2) {
						return {
							type: "ASIGNATURAS_ERROR",
							payload: { lista_prelacion: res.body, lista_asignaturas: lista_asignaturas }
						}
					} else if (edit_create_or_error === 3) {
						return {
							type: "CREAR_ASIGNATURA_EXITOSO",
							payload: { lista_prelacion: res.body, lista_asignaturas: lista_asignaturas }
						}
					}
					else {
						return {
							type: "GET_ASIGNATURAS_EXITOSO",
							payload: { lista_prelacion: res.body, lista_asignaturas: lista_asignaturas }
						}
					}

				})
				.catch(function (err) {
					localStorage.removeItem('user_token');
					localStorage.removeItem('modulo');
					return {
						type: "ERROR"
					}
				});

		})
		.catch(function (err) {
			localStorage.removeItem('user_token');
			localStorage.removeItem('modulo');
			return {
				type: "ERROR"
			}
		});

}

export function get_tipo_asignatura() {
	let token = localStorage.getItem('user_token');

	return request
		.get(host + 'api/tipoAsignatura/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			return {
				type: "GET_TIPO_ASIGNATURA_EXITOSO",
				payload: { lista_tipoAsignaturas: res.body }
			}
		})
		.catch(function (err) {
			localStorage.removeItem('user_token');
			localStorage.removeItem('modulo');
			return {
				type: "ERROR"
			}
		});

}

export function get_tipo_postgrado() {
	let token = localStorage.getItem('user_token');
	return request
		.get(host + 'api/tipoPostgrado/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			return {
				type: "GET_TIPOS_POSTGRADO_EXITOSO",
				payload: { lista_postgrados: res.body }
			}
		})
		.catch(function (err) {
			localStorage.removeItem('user_token');
			localStorage.removeItem('modulo');
			return {
				type: "ERROR"
			}
		});
}


export function crear_asignatura(asignatura) {
	let token = localStorage.getItem('user_token');
	if (asignatura.prelaciones.length > 0) {
		asignatura.prelaciones = asignatura.prelaciones.split(',');
	} else {
		asignatura.prelaciones = [];
	}

	if (asignatura.tipos_postgrado.length > 0) {
		asignatura.tipos_postgrado = asignatura.tipos_postgrado.split(',');
	} else {
		asignatura.tipos_postgrado = [];
	}

	return request
		.post(host + 'api/asignaturas/')
		.set('Authorization', 'JWT ' + token)
		.send(asignatura)
		.then(function (res) {

			return request
				.post(host + 'api/asignaturas_necesarias/')
				.set('Authorization', 'JWT ' + token)
				.send(asignatura)
				.then(function (res) {
					return function (dispatch) {
						dispatch(get_asignaturas(3));
					}
				})
				.catch(function (err) {
					return function (dispatch) {
						dispatch(get_asignaturas(2));
					}
				});
		})
		.catch(function (err) {
			return function (dispatch) {
				dispatch(get_asignaturas(2));
			}
		});

}


export const editar_asignatura = (asignatura) => {
	let token = localStorage.getItem('user_token');

	if (typeof asignatura.prelaciones === 'string') {
		if (asignatura.prelaciones && asignatura.prelaciones.length > 0) {
			asignatura.prelaciones = asignatura.prelaciones.split(',');
		} else {
			asignatura.prelaciones = [];
		}
	} else {
		if (asignatura.prelaciones === undefined) {
			asignatura.prelaciones = [];
		}
	}

	if (typeof asignatura.tipos_postgrado === 'string') {
		if (asignatura.tipos_postgrado && asignatura.tipos_postgrado.length > 0) {
			asignatura.tipos_postgrado = asignatura.tipos_postgrado.split(',');
		} else {
			asignatura.tipos_postgrado = [];
		}
	} else {
		if (asignatura.tipos_postgrado === undefined) {
			asignatura.tipos_postgrado = [];
		}
	}

	return request
		.put(host + 'api/asignaturas/' + asignatura['codigo'] + "/edit/")
		.set('Authorization', 'JWT ' + token)
		.send(asignatura)
		.then(function (res) {
			return request
				.post(host + 'api/asignaturas_necesarias/')
				.set('Authorization', 'JWT ' + token)
				.send(asignatura)
				.then(function (res) {

					return function (dispatch) {
						dispatch(get_asignaturas(1));
					}
				})
				.catch(function (err) {
					return function (dispatch) {
						dispatch(get_asignaturas(2));
					}
				});
		})
		.catch(function (err) {
			return function (dispatch) {
				dispatch(get_asignaturas(2));
			}
		});

}


export const eliminar_asignatura = (asignatura) => {
	let token = localStorage.getItem('user_token');

	return request
		.delete(host + 'api/asignaturas/' + asignatura['codigo'] + "/delete/")
		.set('Authorization', 'JWT ' + token)
		.send(asignatura)
		.then(function (res) {
			return function (dispatch) {
				dispatch(get_asignaturas(1));
			}
		})
		.catch(function (err) {
			return function (dispatch) {
				dispatch(get_asignaturas(2));
			}
		});
}



