//Dependencies
import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium'; 


class HistorialAcademico extends Component{

	constructor(props) {
   		super(props);
    }


	render(){

		return (
	        <div>
	          <h4>Historial Académico</h4>
	        </div>
		)
	}
}

const mapStateToProps = (state)=> {
	return{
		token: state.activeUser
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({ }, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(HistorialAcademico);




