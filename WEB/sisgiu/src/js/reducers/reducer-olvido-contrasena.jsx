const initialState = { correo_enviado: false, bad_input: false };

export default function (state = initialState, action) {
	var nuevo_estado = Object.assign({}, state);

	switch (action.type) {

		case "CORREO_ENVIADO":
			nuevo_estado['correo_enviado'] = true;
			nuevo_estado['bad_input'] = false;
			return nuevo_estado;

		case "CEDULA_ERROR":
			nuevo_estado['correo_enviado'] = false;
			nuevo_estado['bad_input'] = true;
			return nuevo_estado;

		case "URL_CORRECTO":
			nuevo_estado['check_url'] = true;
			nuevo_estado['is_init'] = true;
			return nuevo_estado;

		case "URL_INCORRECTO":
			nuevo_estado['check_url'] = false;
			nuevo_estado['is_init'] = true;
			return nuevo_estado;

		case "RECUPERACION_EXITOSA":
			nuevo_estado['recuperacion'] = true;
			nuevo_estado['is_init'] = false;
			nuevo_estado['check_url'] = true;
			return nuevo_estado;

		case "RECUPERACION_ERRONEA":
			nuevo_estado['recuperacion'] = false;
			nuevo_estado['is_init'] = false;
			nuevo_estado['check_url'] = true;
			return nuevo_estado;

		default:
			return state;
	}
}