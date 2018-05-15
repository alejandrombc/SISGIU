import request from 'superagent';
import jwt_decode from 'jwt-decode';
import { host } from '../components/globalVariables';




export function check_login() {
	let token = localStorage.getItem('user_token');
	let modulo = localStorage.getItem('modulo');
	if (token && modulo) {
		try {
			var decoded = jwt_decode(token);
		} catch (e) {
			localStorage.removeItem('user_token');
			localStorage.removeItem('modulo');
			return {
				type: "INIT_LOGIN_ERROR"
			}
		}
		return request
			.get(host + 'api/' + modulo + '/' + decoded['username'])
			.set('Authorization', 'JWT ' + token)
			.then(function (res) {
				return {
					type: "LOGIN_EXITOSO",
					payload: { user: res.body, modulo: modulo }
				}

			})
			.catch(function (err) {
				localStorage.removeItem('user_token');
				localStorage.removeItem('modulo');
				return {
					type: "INIT_LOGIN_ERROR"
				}
			});
	} else {
		return {
			type: "INIT_LOGIN_ERROR"
		}
	}

}


// InicioEstudiante
export const get_information = (user) => {
	let token = localStorage.getItem('user_token');
	return request
		.get(host + 'api/asignaturas/estudiante/' + user['usuario']['cedula'] + '/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			if (res.body.length > 0) {
				return {
					type: "GET_INFORMATION_SUCCESS",
					payload: { materias: res.body }
				}
			} else {
				return {
					type: "ESTUDIANTE_SIN_ASIGNATURA",
					payload: { materias: res.body }
				}
			}

		})
		.catch(function (err) {

			localStorage.removeItem('user_token');
			localStorage.removeItem('modulo');
			return {
				type: "GET_INFORMATION_ERROR"
			}
		});
}


export function get_tipo_postgrado(periodo) {
	let token = localStorage.getItem('user_token');
	return request
		.get(host + 'api/tipoPostgrado/' + periodo + '/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			return {
				type: "GET_TIPO_POSTGRADO_EXITOSO",
				payload: { postgrado: res.body }
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



export const get_historial = (cedula) => {
	let token = localStorage.getItem('user_token');
	let modulo = localStorage.getItem('modulo');
	return request
		.get(host + 'api/estudianteAsignatura/' + cedula + '/historial/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			return {
				type: "GET_HISTORIAL_EXITOSO",
				payload: { historial_academico: res.body }
			}

		})
		.catch(function (err) {
			if (modulo === 'administrativo') {
				return {
					type: 'GET_HISTORIAL_ERROR'
				}
			} else {
				return {
					type: "ERROR"
				}
			}
		});

}


export const get_info_usuario = (cedula) => {
	let token = localStorage.getItem('user_token');

	return request
		.get(host + 'api/informacionUsuariosAdministrativo/' + cedula + '/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			return {
				type: "GET_INFO_USUARIOS_EXITOSO",
				payload: { info_usuarios_administrativo: res.body }
			}

		})
		.catch(function (err) {
			return {
				type: "GET_INFO_USUARIOS_ERROR"
			}
		});

}


export const retirar_periodo = (cedula, id_periodo) => {
	let token = localStorage.getItem('user_token');
	return request
		.post(host + 'api/retirar/estudiante/' + cedula + '/periodo/' + id_periodo + '/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			return function (dispatch) {
				dispatch(get_info_usuario(cedula));
			}
		})
		.catch(function (err) {
			return function (dispatch) {
				dispatch(get_info_usuario(cedula));
			}
		});
}




export function get_periodo_estudiante(cedula, filtro) {
	let token = localStorage.getItem('user_token');

	return request
		.get(host + 'api/periodoEstudiante/' + cedula + '/periodo/' + filtro + '/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			return {
				type: "GET_PERIODO_ESTUDIANTE",
				payload: { lista_periodo_estudiante: res.body }
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

export function get_periodos_tipo_postgrado(filtro, tipo_postgrado) {
	filtro = filtro.replace(" ", "%20");
	let token = localStorage.getItem('user_token');

	return request
		.get(host + 'api/periodo/' + filtro + '/tipo_postgrado/' + tipo_postgrado + '/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			if (filtro === "activo") {
				return {
					type: "GET_PERIODO_ACTIVO_TIPO_POSTGRADO",
					payload: { lista_periodo_activo: res.body }
				}
			} else {
				return {
					type: "GET_PERIODOS_TIPO_POSTGRADO_EXITOSO",
					payload: { lista_periodos: res.body }
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

}


// InicioAdministrador
export const get_periodos_actuales = () => {
	let token = localStorage.getItem('user_token');
	return request
		.get(host + 'api/periodo/actuales/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			if (res.body.length > 0) {
				return {
					type: "GET_PERIODOS_ACTIVOS_EXITOSO",
					payload: { periodos: res.body }
				}
			} else {
				return {
					type: "SIN_PERIODOS_ACTIVOS",
					payload: { periodos: [] }
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

}


export const cambiarEstadoPeriodo = (periodo) => {
	let token = localStorage.getItem('user_token');

	var filtro;

	if (periodo.estado_periodo === 'activo') {
		filtro = 'finalizado';
	} else {
		filtro = 'activo';
	}

	return request
		.put(host + 'api/periodo/' + periodo['id'] + '/edit/filtro/' + filtro + '/')
		.set('Authorization', 'JWT ' + token)
		.set('Content-Type', 'application/json')
		.then(function (res) {
			return function (dispatch) {
				dispatch(get_periodos_actuales());
			}
		})
		.catch(function (err) {
			return {
				type: "PERIODO_TERMINADO_ERROR"
			}
		});
}


export const get_estado_estudiante = (id_estado_estudiante) => {
	let token = localStorage.getItem('user_token');

	return request
		.get(host + 'api/estadoEstudiante/' + id_estado_estudiante + '/')
		.set('Authorization', 'JWT ' + token)
		.set('Content-Type', 'application/json')
		.then(function (res) {
			return {
				type: "GET_ESTADO_ESTUDIANTE_EXITOSO",
				payload: { 'estado_estudiante': res.body }
			}
		})
		.catch(function (err) {
			return {
				type: "ERROR"
			}
		});
}

// Funciona para que el navbar este deshabilitado mientras todos los reducers estan cargando
export const cargado = () => {
	return {
		type: "CARGADO"
	}
}

// Funciona para que aparezca el SPINNER
export const cargando = () => {
	return {
		type: "CARGANDO"
	}
}

// Programacion Academica (Generico para todos)
export const get_programacion_academica = () => {
	let token = localStorage.getItem('user_token');
	return request
		.get(host + 'api/programacionAcademica/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			return {
				type: "GET_PROGRAMACION_ACADEMICA",
				payload: { 'programacionAcademica': res.body }
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

// Funcion que evalua si un estudiante se encuentra retirado o no
export const estado_retiro_estudiante = (cedula) => {
	let token = localStorage.getItem('user_token');
	return request
		.get(host + 'api/estudiante/' + cedula + '/estado_retiro/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			return {
				type: "ESTADO_RETIRO_ESTUDIANTE_EXITOSO",
				payload: { 'estudiante_retirado': res.body }
			}

		})
		.catch(function (err) {
			return {
				type: "ESTADO_RETIRO_ESTUDIANTE_ERROR"
			}
		});

}