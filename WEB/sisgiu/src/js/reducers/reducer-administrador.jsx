const initialState = {periodos: [], edit:false, tiene_periodos_activos: true, periodo_terminado_error: false, lista_usuarios: [], bad_input: false};

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
			};


		default:
			return state;
	}
}