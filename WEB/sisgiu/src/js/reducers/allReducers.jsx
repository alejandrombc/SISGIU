import {combineReducers} from 'redux';
import ActiveUserReducer from './reducer-active-user'
import OlvidoContrasenaReducer from './reducer-olvido-contrasena'

/*
 * Combinamos todos los reducers en un solo objeto para enviar al store
 * Todos los estados de la aplicacion son los reducers que son retornados hacia la aplicacion
 * */


const allReducers = combineReducers({
	activeUser: ActiveUserReducer,
	olvidoContrasena : OlvidoContrasenaReducer,
});


export default allReducers