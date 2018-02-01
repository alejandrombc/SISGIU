import React,{Component} from 'react';
import {check_login} from '../actions/inicio.jsx';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class Inicio extends Component{

	constructor(props) {
   		super(props);
    	this.props.check_login();
    }

	render(){
		return (
			<div>
				<h1>Bienvenido. SIIIIII</h1>
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
	return bindActionCreators({check_login: check_login}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);




