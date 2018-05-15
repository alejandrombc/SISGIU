const initialState = {
	bad_input: false,
	edit: false,
	bad_input_password: false,
	edit_password: false,
	bad_photo_request: false,
	edit_photo: false,
};

export default function (state = initialState, action) {
	var nuevo_estado = Object.assign({}, state);

	switch (action.type) {

		// Global
		case "HIDE_ALERTS":
			nuevo_estado['edit'] = false;
			nuevo_estado['bad_input'] = false;
			nuevo_estado['bad_input_password'] = false;
			nuevo_estado['edit_password'] = false;
			nuevo_estado['bad_photo_request'] = false;
			nuevo_estado['edit_photo'] = false;
			return nuevo_estado;

		case "ERROR":
			nuevo_estado['loggedIn'] = false;
			return nuevo_estado;

		case "EDIT_USER_INFO_SUCCESS":
			nuevo_estado['user'] = action.payload['user'];
			nuevo_estado['bad_input'] = false;
			nuevo_estado['edit'] = true;
			return nuevo_estado;

		case "EDIT_USER_INFORMATION_ERROR":
			nuevo_estado['bad_input'] = true;
			return nuevo_estado;

		case "EDIT_USER_PASSWORD_SUCCESS":
			nuevo_estado['user'] = action.payload['user'];
			nuevo_estado['bad_input_password'] = false;
			nuevo_estado['edit_password'] = true;
			return nuevo_estado;

		case "EDIT_USER_PASSWORD_ERROR":
			nuevo_estado['bad_input_password'] = true;
			return nuevo_estado;

		case "EDIT_USER_PHOTO_ERROR":
			nuevo_estado['bad_photo_request'] = true;
			return nuevo_estado;


		default:
			return state;
	}
}