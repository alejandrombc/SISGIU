const initialState = {correo_enviado: false, bad_input: false};

export default function (state=initialState, action) {

switch (action.type){
	case "CORREO_ENVIADO":
		return {
			correo_enviado: true, 
			bad_input: false, 
		};
	break;

	case "CEDULA_ERROR":
		return {
			correo_enviado: false, 
			bad_input: true, 
		}; 
	break;

	case "URL_CORRECTO":
		return {
			check_url: true
		}
	break;

	case "URL_INCORRECTO":
		return {
			check_url: false
		}
	break;


	default:
		return state;
}
}