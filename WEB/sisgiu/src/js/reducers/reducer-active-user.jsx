let user = localStorage.getItem('user_token');
const initialState = user ? { loggedIn: true, user } : {};

export default function (state=initialState, action) {

switch (action.type){
	case "LOGIN_EXITOSO":
	
	return {
		loggedIn: true,
		bad_input: false,
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