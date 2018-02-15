import {combineReducers} from 'redux';
import ActiveUserReducer from './reducer-active-user';
import RecuperarContrasena from './reducer-olvido-contrasena';
import EstudianteReducer from './reducer-estudiante';
import EditUserReducer from './reducer-edit-user';
import AdminReducer from './reducer-administrador';

/*
 * Combinamos todos los reducers en un solo objeto para enviar al store
 * Todos los estados de la aplicacion son los reducers que son retornados hacia la aplicacion
 * */


const allReducers = combineReducers({
	activeUser: ActiveUserReducer,
	estudianteUser: EstudianteReducer,
	recuperarContrasena : RecuperarContrasena,
	editUser: EditUserReducer,
	adminUser: AdminReducer,
});


export default allReducers