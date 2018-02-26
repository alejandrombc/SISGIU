const initialState = {periodos: [], edit:false, tiene_periodos_activos: true, periodo_terminado_error: false, lista_usuarios: [], bad_input: false, lista_asignaturas: [], lista_postgrados: [], lista_tipoAsignaturas: []};

export default function (state=initialState, action) {

	switch (action.type){

		case "GET_PERIODOS_SUCCESS":
			return {
				periodos:action.payload['periodos'],
				tiene_periodos_activos: true,
				edit:false 
			};
		case "SIN_PERIODOS_ACTIVOS":
			return {
				tiene_periodos_activos: false,
			};
		case "ERROR":
			return {
				loggedIn: false, 
			};

		case "PERIODO_TERMINADO_SUCCESS":
			return {
				periodo_terminado_error: false, 
				tiene_periodos_activos: true,
			};

		case "PERIODO_TERMINADO_ERROR":
			return {
				periodo_terminado_error: true, 
			};

		case "GET_USUARIOS_EXITOSO":
			return {
				lista_usuarios: action.payload['lista_usuarios'],
			};

		case "EDIT_USER_INFO_SUCCESS":
			return {
				bad_input: false,
				edit: true,
				user:action.payload['user'],
				lista_usuarios: action.payload['lista_usuarios'],
			};

		case "EDIT_USER_INFO_ERROR":
			return {
				bad_input: true,
				lista_usuarios: action.payload['lista_usuarios'],
			};

		case "GET_ASIGNATURAS_EXITOSO":
			return {
				lista_asignaturas: action.payload['lista_asignaturas'],
				lista_postgrados: state.lista_postgrados,
				lista_tipoAsignaturas: state.lista_tipoAsignaturas,
				edit: action.payload['edit'],
			};

		case "GET_TIPO_POSTGRADO_EXITOSO":
			return {
				lista_postgrados: action.payload['lista_postgrados'],
				lista_asignaturas: state.lista_asignaturas
			};

		case "GET_TIPO_ASIGNATURA_EXITOSO":
			return {
				lista_postgrados: state.lista_postgrados,
				lista_asignaturas: state.lista_asignaturas,
				lista_tipoAsignaturas: action.payload['lista_tipoAsignaturas']
			};



		default:
			return state;
	}
}