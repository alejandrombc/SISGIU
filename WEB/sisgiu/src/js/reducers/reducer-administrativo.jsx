const initialState = {
	lista_periodos : [],
	tiene_periodos_activos: true, 
	edit:false, 
	lista_estudiantes: [],
	pago_inscripcion_editado: false,
	error: false,
	estado_periodo: '',
	lista_asignatura_periodo: [],
	lista_asignatura_estudiante: [],
	inscripcion_modificada: false,
	error_info_usuarios: false,
	info_usuarios_administrativo: {},
	estudiante_retirado: false,
};

export default function (state=initialState, action) {
	var nuevo_estado = Object.assign({}, state);

	switch (action.type){

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
			nuevo_estado['inscripcion_modificada'] = false;
			nuevo_estado['error'] = false;
			return nuevo_estado;

		case "PAGO_INSCRIPCION_ESTUDIANTES_ERROR":
			nuevo_estado['pago_inscripcion_editado'] = false;
			nuevo_estado['error'] = true;

			return nuevo_estado;

		case "GET_ASIGNATURAS_PERIODO":
			nuevo_estado['lista_asignatura_periodo'] = action.payload['lista_asignatura_periodo'];
			return nuevo_estado;

		case "GET_ASIGNATURAS_ESTUDIANTE":
			nuevo_estado['lista_asignatura_estudiante'] = action.payload['lista_asignatura_estudiante'];
			return nuevo_estado;

		case "GET_ESTADO_PERIODO_EXITOSO":
			nuevo_estado['estado_periodo'] = action.payload['estado_periodo'];
			return nuevo_estado;

		case "MODIFICAR_INSCRIPCION_EXITOSO":
			nuevo_estado['inscripcion_modificada'] = true;
			nuevo_estado['pago_inscripcion_editado'] = false;
			nuevo_estado['error'] = false;
			return nuevo_estado;

		case "MODIFICAR_INSCRIPCION_ERROR":
			nuevo_estado['error'] = true;
			nuevo_estado['inscripcion_modificada'] = false;
			nuevo_estado['pago_inscripcion_editado'] = false;
			return nuevo_estado;

		case "GET_INFO_USUARIOS_EXITOSO":
			nuevo_estado['info_usuarios_administrativo'] = action.payload['info_usuarios_administrativo'];
			nuevo_estado['error_info_usuarios'] = false;
			return nuevo_estado;
		
		case "GET_INFO_USUARIOS_ERROR":
			nuevo_estado['error_info_usuarios'] = true;
			nuevo_estado['info_usuarios_administrativo'] = {"tipo_usuario":"error"};
			return nuevo_estado;
		
		case "ESTADO_RETIRO_ESTUDIANTE_EXITOSO":
			nuevo_estado['estudiante_retirado'] = action.payload['estudiante_retirado']['retirado'];
			return nuevo_estado;
		
		case "ESTADO_RETIRO_ESTUDIANTE_ERROR":
			nuevo_estado['estudiante_retirado'] = false;
			return nuevo_estado;
			
			

		default:
			return state;
	}
}