const initialState = {materias: [], tiene_asignaturas: true};

export default function (state=initialState, action) {

	var nuevo_estado = Object.assign({}, state);
	switch (action.type){

		case "GET_INFORMATION_SUCCESS":
			nuevo_estado['materias'] = action.payload['materias'];
			nuevo_estado['tiene_asignaturas'] = true;
			return nuevo_estado;

		case "GET_INFORMATION_ERROR":
			nuevo_estado['loggedIn'] = false;
			return nuevo_estado;

		case "ESTUDIANTE_SIN_ASIGNATURA":
			nuevo_estado['tiene_asignaturas'] = false;
			nuevo_estado['materias'] = [];
			return nuevo_estado;

		default:
			return state;
	}
}