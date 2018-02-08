const initialState = {pestana:"inicio"};

export default function (state=initialState, action) {

switch (action.type){

	case "CAMBIAR_PESTANA":
		return {
			pestana:action.payload['pestana']
		};

	default:
		return state;
}
}