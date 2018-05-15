const initialState = {
	pagina: 1,
};


export default function (state = initialState, action) {
	var nuevo_estado = Object.assign({}, state);

	switch (action.type) {

		case "SET_CURRENT":
			nuevo_estado['pagina'] = action.payload['pagina'];
			return nuevo_estado;

		default:
			return state;
	}
}