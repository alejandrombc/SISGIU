let user = localStorage.getItem('user_token');
let modulo = localStorage.getItem('modulo');

const initialState = user ? { loggedIn: true, modulo: modulo, user } : {};

export default function (state=initialState, action) {

switch (action.type){
	case "LOGIN_EXITOSO":
	
	return {
		loggedIn: true,
		bad_input: false,
		modulo: modulo,
		user: action.user
	};

	case "LOGIN_ERROR":
	return {
		loggedIn: false, 
		bad_input: true
	}; 

	default:
	return state;
}
}