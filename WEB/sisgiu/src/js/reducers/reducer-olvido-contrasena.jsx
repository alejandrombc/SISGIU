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

	case "URL_CORRECTO":
		return {
			check_url: true,
			is_init: true
		}

	case "URL_INCORRECTO":
		return {
			check_url: false,
			is_init: true
		}

	case "RECUPERACION_EXITOSA":
		return {
			recuperacion: true,
			is_init: false,
			check_url: true
		}

	case "RECUPERACION_ERRONEA":
		return {
			recuperacion: false,
			is_init: false,
			check_url: true
		}

	default:
		return state;
}
}