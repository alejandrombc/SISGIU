const initialState = {
	periodos: [], 
	edit:false, 
	tiene_periodos_activos: true, 
	periodo_terminado_error: false, 
	lista_usuarios: [], 
	bad_input: false, 
	lista_asignaturas: [], 
	lista_postgrados: [], 
	lista_tipoAsignaturas: [],
	lista_estadoEstudiante: [],
};

export default function (state=initialState, action) {
	var nuevo_estado = Object.assign({}, state);

	switch (action.type){

		case "GET_PERIODOS_SUCCESS":
			nuevo_estado['periodos'] = action.payload['periodos'];
			nuevo_estado['tiene_periodos_activos'] = true;
			nuevo_estado['edit'] = false;
			return nuevo_estado;

		case "SIN_PERIODOS_ACTIVOS":
			nuevo_estado['tiene_periodos_activos'] = false;
			return nuevo_estado;
			
		case "ERROR":
			nuevo_estado['loggedIn'] = false;
			return nuevo_estado;

		case "PERIODO_TERMINADO_SUCCESS":
			nuevo_estado['periodo_terminado_error'] = false;
			nuevo_estado['tiene_periodos_activos'] = true;
			return nuevo_estado;

		case "PERIODO_TERMINADO_ERROR":
			nuevo_estado['periodo_terminado_error'] = true;
			return nuevo_estado;

		case "GET_USUARIOS_EXITOSO":
			nuevo_estado['lista_usuarios'] = action.payload['lista_usuarios'];
			return nuevo_estado;

		case "GET_ESTADO_ESTUDIANTE_EXITOSO":
			nuevo_estado['lista_estadoEstudiante'] = action.payload['lista_estadoEstudiante'];
			return nuevo_estado;

		case "EDIT_USER_INFO_SUCCESS":
			nuevo_estado['bad_input'] = false;
			nuevo_estado['edit'] = true;
			nuevo_estado['lista_usuarios'] = action.payload['lista_usuarios'];
			return nuevo_estado;


		case "EDIT_USER_INFO_ERROR":
			nuevo_estado['bad_input'] = true;
			nuevo_estado['lista_usuarios'] = action.payload['lista_usuarios'];
			return nuevo_estado;

		case "GET_ASIGNATURAS_EXITOSO":
			nuevo_estado['lista_asignaturas'] = action.payload['lista_asignaturas'];
			nuevo_estado['edit'] = false;
			return nuevo_estado;

		case "GET_TIPO_POSTGRADO_EXITOSO":
			nuevo_estado['lista_postgrados'] = action.payload['lista_postgrados'];
			return nuevo_estado;

		case "GET_TIPO_ASIGNATURA_EXITOSO":
			nuevo_estado['lista_tipoAsignaturas'] = action.payload['lista_tipoAsignaturas'];
			return nuevo_estado;

		case "EDIT_ASIGNATURA_EXITOSO":
			nuevo_estado['edit'] = true;
			nuevo_estado['bad_input'] = false;
			nuevo_estado['lista_asignaturas'] = action.payload['lista_asignaturas'];
			return nuevo_estado;

		case "ASIGNATURAS_ERROR":
			nuevo_estado['lista_asignaturas'] = action.payload['lista_asignaturas'];
			nuevo_estado['bad_input'] = true;
			return nuevo_estado;

		default:
			return state;
	}
}