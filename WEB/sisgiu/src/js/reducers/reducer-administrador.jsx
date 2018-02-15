const initialState = {periodos: [], tiene_periodos_activos: true};

export default function (state=initialState, action) {

	switch (action.type){

		case "GET_PERIODOS_SUCCESS":
			return {
				periodos:action.payload['periodos'],
				tiene_periodos_activos: true 
			};
		case "SIN_PERIODOS_ACTIVOS":
			return {
				tiene_periodos_activos: false,
			};
		case "GET_PERIODOS_ERROR":
			return {
				loggedIn: false, 
			};


		default:
			return state;
	}
}