//Dependencies
import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium'; 
import SeleccionarAsignaturas from './seleccionarAsignaturas';
import { get_asignaturas } from '../../actions/moduloAsignaturas'

class Inscripcion extends Component{

	constructor(props) {
   		super(props);
   		this.props.get_asignaturas();
    }


	render(){
		const asignaturas = [
			{ 
				"codigo":"9999",
				"nombre": "test",
				"tipo_asignatura":"electiva",
				"unidad_credito":5,
				"value":1
			},
			{ 
				"codigo":"8888",
				"nombre": "test2",
				"tipo_asignatura":"obligatoria",
				"unidad_credito":4,
				"value":2
			},
			{ 
				"codigo":"7777",
				"nombre": "test3",
				"tipo_asignatura":"electiva",
				"unidad_credito":6,
				"value":3
			},
		]
		return(
			<div>
				<h4 className="text-center">
					Seleccione las asignaturas
				</h4>
				<br />
				<SeleccionarAsignaturas asignaturas={asignaturas}/>
			</div>
		);
	}
}

const mapStateToProps = (state)=> {
	return{
		token: state.activeUser
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		get_asignaturas:get_asignaturas
	}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(Inscripcion);




