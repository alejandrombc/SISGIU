const initialState = {
	asignaturas: [], 
	estudiantes: [],
	edit: false,
	error: false,
	lista_postgrados: [],
};

export default function (state=initialState, action) {

	var nuevo_estado = Object.assign({}, state);
	switch (action.type){

		// Global
		case "HIDE_ALERTS":
			nuevo_estado['edit'] = false;
			nuevo_estado['error'] = false;
			return nuevo_estado;

		case "ERROR":
			nuevo_estado['loggedIn'] = false;
			return nuevo_estado;

		case "GET_ASIGNATURAS_DOCENTE":
			nuevo_estado['asignaturas'] = action.payload['asignaturas'];
			return nuevo_estado;

		case "GET_ASIGNATURA_DOCENTE_ERROR":
			nuevo_estado['loggedIn'] = false;
			return nuevo_estado;

		case "GET_ESTUDIANTES":
			nuevo_estado['estudiantes'] = action.payload['estudiantes']
			return nuevo_estado;
		
		case "CARGAR_NOTAS_EXITOSO":
			nuevo_estado['edit'] = true;
			nuevo_estado['error'] = false;
			return nuevo_estado;

		case "ERROR_CARGANDO_NOTAS":
			nuevo_estado['edit'] = false;
			nuevo_estado['error'] = true;
			return nuevo_estado;
		
		case "GET_TIPOS_POSTGRADO_EXITOSO":
			nuevo_estado['lista_postgrados'] = action.payload['lista_postgrados'];
			return nuevo_estado;

		default:
			return state;
	}
}