const initialState = {bad_input:false, edit: false, bad_input_password: false ,edit_password: false};

export default function (state=initialState, action) {

switch (action.type){

	case "EDIT_USER_INFO_SUCCESS":
		return {
			user:action.payload['user'],
			bad_input: false,
			edit: true, 
		};

	case "EDIT_USER_INFO_ERROR":
		return {
			bad_input: true 
		};

	case "EDIT_USER_PASSWORD_SUCCESS":
		return {
			user:action.payload['user'],
			bad_input_password: false,
			edit_password: true, 
		};

	case "EDIT_USER_PASSWORD_ERROR":
		return {
			bad_input_password: true 
		};

	default:
		return state;
}
}