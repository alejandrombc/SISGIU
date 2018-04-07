const initialState = {
	lista_periodos : [],
	tiene_periodos_activos: true, 
	edit:false, 
	lista_estudiantes: [],
	pago_inscripcion_editado: false,
	error_pago_inscripcion: false,
};

export default function (state=initialState, action) {
	var nuevo_estado = Object.assign({}, state);

	switch (action.type){

		// case "EDIT_PERIODO_EXITOSO":
		// 	nuevo_estado['edit'] = true;
		// 	nuevo_estado['bad_input'] = false;
		// 	nuevo_estado['error_creando_periodo'] = false;
		// 	nuevo_estado['lista_periodos'] = action.payload['lista_periodos'];
		// 	return nuevo_estado;

		// case "PERIODO_ERROR":
		// 	nuevo_estado['lista_periodos'] = action.payload['lista_periodos'];
		// 	nuevo_estado['bad_input'] = true;
		// 	nuevo_estado['loading'] = false;
		// 	return nuevo_estado;

		// case "GET_PERIODOS_EXITOSO":
		// 	nuevo_estado['lista_periodos'] = action.payload['lista_periodos'];
		// 	nuevo_estado['edit'] = false;
		// 	return nuevo_estado;


		case "GET_PERIODOS_ACTIVOS_EXITOSO":
			nuevo_estado['lista_periodos'] = action.payload['periodos'];
			nuevo_estado['tiene_periodos_activos'] = true;
			nuevo_estado['edit'] = false;
			return nuevo_estado;

		case "SIN_PERIODOS_ACTIVOS":
			nuevo_estado['tiene_periodos_activos'] = false;
			nuevo_estado['lista_periodos'] = action.payload['periodos'];
			return nuevo_estado;

		case "ERROR":
			nuevo_estado['loggedIn'] = false;
			return nuevo_estado;

		case "GET_ESTUDIANTES_POR_PERIODO_EXITOSO":
			nuevo_estado['lista_estudiantes'] = action.payload['lista_estudiantes'];
			return nuevo_estado;

		case "PAGO_INSCRIPCION_ESTUDIANTES_EXITOSO":
			nuevo_estado['pago_inscripcion_editado'] = true;
			nuevo_estado['error_pago_inscripcion'] = false;
			return nuevo_estado;

		case "PAGO_INSCRIPCION_ESTUDIANTES_ERROR":
			nuevo_estado['pago_inscripcion_editado'] = false;
			nuevo_estado['error_pago_inscripcion'] = true;

			return nuevo_estado;
		

		default:
			return state;
	}
}