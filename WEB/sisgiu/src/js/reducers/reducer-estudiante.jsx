const initialState = {materias: [], tiene_asignaturas: true};

export default function (state=initialState, action) {

switch (action.type){

	case "GET_INFORMATION_SUCCESS":
		return {
			materias:action.payload['materias'],
			tiene_asignaturas: true 
		};

	case "GET_INFORMATION_ERROR":
		return {
			loggedIn: false, 
		};

	case "ESTUDIANTE_SIN_ASIGNATURA":
		return {
			tiene_asignaturas: false,
			materias:[]
		};

	default:
		return state;
}
}