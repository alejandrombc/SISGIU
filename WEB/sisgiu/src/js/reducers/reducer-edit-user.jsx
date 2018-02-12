const initialState = {bad_input:false, edit: false};

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

	default:
		return state;
}
}