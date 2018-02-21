let user = localStorage.getItem('user_token');
let modulo = localStorage.getItem('modulo');

const initialState = (user && modulo) ? { loggedIn: true, user, modulo} : {loggedIn: false};

export default function (state=initialState, action) {

switch (action.type){
	case "LOGIN_EXITOSO":
		return {
			loggedIn: true,
			bad_input: false,
			bad_module: false,
			user: action.payload['user'],
			modulo: action.payload['modulo']
		};

	case "LOGIN_ERROR":
		return {
			loggedIn: false, 
			bad_input: true,
			bad_module: false
		}; 

	case "LOGIN_ERROR_MODULE":
		return {
			loggedIn: false, 
			bad_input: false,
			bad_module: true,

		}; 
		
	case "INIT_LOGIN_ERROR":
		return {
			loggedIn: false, 

		}; 

	case "LOGOUT_SUCCESS":
		return {
			loggedIn: false, 
		}; 

	case "LOGOUT_ERROR":
		return {
			loggedIn: true, 
		};

	default:
		return state;
	}
}