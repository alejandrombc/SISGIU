let user = localStorage.getItem('user_token');
let modulo = localStorage.getItem('modulo');

const initialState = (user && modulo) ? 
{ loggedIn: true, user, modulo, cargado: false} 
: 
{loggedIn: false, cargado: false};

export default function (state=initialState, action) {
	var nuevo_estado = Object.assign({}, state);

switch (action.type){

	case "LOGIN_EXITOSO":
		nuevo_estado['loggedIn'] = true;
		nuevo_estado['bad_input'] = false;
		nuevo_estado['bad_module'] = false;
		nuevo_estado['user'] = action.payload['user'];
		nuevo_estado['modulo'] = action.payload['modulo'];
		return nuevo_estado;

	case "LOGIN_ERROR":
		nuevo_estado['loggedIn'] = false;
		nuevo_estado['bad_input'] = true;
		nuevo_estado['bad_module'] = false;
		return nuevo_estado;

	case "LOGIN_ERROR_MODULE":
		nuevo_estado['loggedIn'] = false;
		nuevo_estado['bad_input'] = false;
		nuevo_estado['bad_module'] = true;
		return nuevo_estado;
		
	case "INIT_LOGIN_ERROR":
		nuevo_estado['loggedIn'] = false;
		return nuevo_estado;

	case "LOGOUT_SUCCESS":
		nuevo_estado['loggedIn'] = false;
		return nuevo_estado;

	case "LOGOUT_ERROR":
		nuevo_estado['loggedIn'] = true;
		return nuevo_estado;

	case "CARGADO":
		nuevo_estado['cargado'] = true;
		return nuevo_estado;

	case "CARGANDO":
		nuevo_estado['cargado'] = false;
		return nuevo_estado;

	default:
		return state;
	}
}