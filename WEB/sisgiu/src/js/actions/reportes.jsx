import request from 'superagent';
import { host } from '../components/globalVariables';


export const get_lista_periodos = () => {
    let token = localStorage.getItem('user_token');
    return request
        .get(host + 'api/periodo/')
        .set('Authorization', 'JWT ' + token)
        .then(function (res) {
            return {
                type: "GET_LISTA_PERIODOS_EXITOSO",
                payload: { periodos: res.body }
            }

        })
        .catch(function (err) {
            console.log(err.response.body);
            return {
                type: "GET_LISTA_PERIODOS_ERROR",
                error: err.response.body
            }
        });

}