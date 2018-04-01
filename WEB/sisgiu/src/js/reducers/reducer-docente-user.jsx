const initialState = {
	asignaturas: [], 
	// cargando: false,
	estudiantes: [],
	edit: false,
	error: false,
};

export default function (state=initialState, action) {

	var nuevo_estado = Object.assign({}, state);
	switch (action.type){

		case "GET_ASIGNATURAS_DOCENTE":
			nuevo_estado['asignaturas'] = action.payload['asignaturas'];
			return nuevo_estado;

		case "GET_ASIGNATURA_DOCENTE_ERROR":
			nuevo_estado['loggedIn'] = false;
			return nuevo_estado;

		case "GET_ESTUDIANTES":
			nuevo_estado['estudiantes'] = action.payload['estudiantes']
			return nuevo_estado;

		case "ERROR":
			nuevo_estado['loggedIn'] = false;
			// nuevo_estado['cargando'] = false;
			return nuevo_estado;
		
		case "CARGAR_NOTAS_EXITOSO":
			nuevo_estado['edit'] = true;
			nuevo_estado['error'] = false;
			return nuevo_estado;

		case "ERROR_CARGANDO_NOTAS":
			nuevo_estado['edit'] = false;
			nuevo_estado['error'] = true;
			return nuevo_estado;
		

		default:
			return state;
	}
}