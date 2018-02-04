const initialState = {correo_enviado: false, bad_input: false};

export default function (state=initialState, action) {

switch (action.type){
	case "CORREO_ENVIADO":
		return {
			correo_enviado: true, 
			bad_input: false, 
		};

	case "CEDULA_ERROR":
		return {
			correo_enviado: false, 
			bad_input: true, 
		}; 


	default:
		return state;
}
}