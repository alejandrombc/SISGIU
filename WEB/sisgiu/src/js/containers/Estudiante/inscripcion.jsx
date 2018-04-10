//Dependencies
import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import SeleccionarAsignaturas from './seleccionarAsignaturas';
import { get_asignaturas_inscripcion } from '../../actions/inscripcion';

class Inscripcion extends Component{

	constructor(props) {
   		super(props);
   		this.get_asignaturas = this.get_asignaturas.bind(this);
    }

    componentDidMount() {
   		this.props.get_asignaturas_inscripcion(this.props.usuario_activo.user.usuario.cedula);
    }

    get_asignaturas() {

    	let aux = this.props.estudianteUser.lista_asignaturas_inscripcion;
    	let asignaturas = [];
    	let N = aux.length;

    	for (var i = 0; i < N; i++) {
    		let asignatura = {};
    		asignatura['codigo'] = aux[i]['codigo'];
    		asignatura['nombre'] = aux[i]['nombre'];
    		asignatura['tipo_asignatura'] = aux[i]['tipo_asignatura_id'];
    		asignatura['unidad_credito'] = aux[i]['unidad_credito'];
    		asignatura['value'] = aux[i]['id'];
    		asignaturas.push(asignatura);
    	}

    	return asignaturas;
    }


	render(){

		return(
			<div>
				<h4 className="text-center">
					Seleccione las asignaturas
				</h4>
				<br />
				<SeleccionarAsignaturas triggerBuscarInformacionAsignaturas={()=>this.props.triggerBuscarInformacionAsignaturas()} asignaturas={this.get_asignaturas()} cedula={this.props.usuario_activo.user.usuario.cedula} triggerInscripcion={() => this.props.triggerInscripcion()}/>
			</div>
		);
	}
}

const mapStateToProps = (state)=> {
	return{
		usuario_activo: state.activeUser,
		estudianteUser: state.estudianteUser,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		get_asignaturas_inscripcion: get_asignaturas_inscripcion,

	}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(Inscripcion);




