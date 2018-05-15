import request from 'superagent';
import { host } from '../components/globalVariables';


/* 
edit_create_or_error = 1 -> Editado Exitosamente
edit_create_or_error = 2 -> Error
edit_create_or_error = 3 -> Creado Exitosamente
*/

let periodo_en_inscripcion_repetido = false;

export function get_periodos(edit_create_or_error, filtro) {
	let token = localStorage.getItem('user_token');
	return request
		.get(host + 'api/periodo/' + filtro + '/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			if (edit_create_or_error === 1) {
				return {
					type: "EDIT_PERIODO_EXITOSO",
					payload: { lista_periodos: res.body }
				}
			} else if (edit_create_or_error === 2) {
				if (periodo_en_inscripcion_repetido) {
					return {
						type: "PERIODO_EN_INSCRIPCION_REPETIDO",
						payload: { lista_periodos: res.body }
					}
				}
				return {
					type: "PERIODO_ERROR",
					payload: { lista_periodos: res.body }
				}
			} else if (edit_create_or_error === 3) {
				return {
					type: "CREATE_PERIODO_EXITOSO",
					payload: { lista_periodos: res.body }
				}
			}
			else {
				return {
					type: "GET_PERIODOS_EXITOSO",
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

export function get_estado_periodo() {
	let token = localStorage.getItem('user_token');

	return request
		.get(host + 'api/estadoPeriodo/')
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			return {
				type: "GET_ESTADO_PERIODO_EXITOSO",
				payload: { lista_estadoPeriodo: res.body }
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



export function crear_periodo(periodo, id_estado_periodo, descripcion) {
	let token = localStorage.getItem('user_token');

	periodo['estado_periodo'] = id_estado_periodo;
	periodo.descripcion = descripcion;

	let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

	var date_inicio = new Date(periodo.fecha_inicio);
	var date_fin = new Date(periodo.fecha_fin);

	periodo.mes_inicio = meses[date_inicio.getUTCMonth()];
	periodo.mes_fin = meses[date_fin.getUTCMonth()];
	periodo.anio_inicio = date_inicio.getUTCFullYear();
	periodo.anio_fin = date_fin.getUTCFullYear();


	return request
		.post(host + 'api/periodo/')
		.set('Authorization', 'JWT ' + token)
		.send(periodo)
		.then(function (res) {
			return function (dispatch) {
				dispatch(get_periodos(3, 'no iniciado'));
			}
		})
		.catch(function (err) {
			return {
				type: "ERROR_CREANDO_PERIODO"
			}
		});

}


export function get_docente_asignatura(tipoPostgrado) {
	let token = localStorage.getItem('user_token');

	return request
		.get(host + 'api/docenteAsignatura/periodo/no iniciado/tipo/' + tipoPostgrado)
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			return {
				type: "GET_DOCENTE_ASIGNATURA_EXITOSO",
				payload: { lista_docente_asignatura: res.body }
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


export function guardar_docente_asignatura_periodo(docente_asignatura_info, periodo_id) {
	let token = localStorage.getItem('user_token');

	return request
		.post(host + 'api/docenteAsignatura/periodo/' + periodo_id + '/')
		.set('Authorization', 'JWT ' + token)
		.send(docente_asignatura_info)
		.then(function (res) {
			return {
				type: "CREAR_DOCENTE_ASIGNATURA_EXITOSO",
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


export const eliminar_periodo = (periodo_id) => {
	let token = localStorage.getItem('user_token');

	return request
		.delete(host + 'api/periodo/' + periodo_id + "/delete/")
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			return function (dispatch) {
				dispatch(get_periodos(1, 'no iniciado'));
			}
		})
		.catch(function (err) {
			return function (dispatch) {
				dispatch(get_periodos(2, 'no iniciado'));
			}
		});
}



export const activar_periodo = (periodo_id) => {
	let token = localStorage.getItem('user_token');

	return request
		.post(host + 'api/periodo/activar/' + periodo_id + "/")
		.set('Authorization', 'JWT ' + token)
		.then(function (res) {
			return function (dispatch) {
				dispatch(get_periodos(1, 'no iniciado'));
			}
		})
		.catch(function (err) {
			if (err.status === 409 && err.response.body.codigo === 1) {
				periodo_en_inscripcion_repetido = true;
			}
			return function (dispatch) {
				dispatch(get_periodos(2, 'no iniciado'));
			}
		});
}
