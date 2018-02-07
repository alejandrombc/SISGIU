//Dependencies
import React,{Component} from 'react';
import {check_login} from '../actions/inicio.jsx';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import Usuario from './usuario';
import Content from './content'; 

//Spinner
import { PulseLoader } from 'halogenium';


class Inicio extends Component{

	constructor(props) {
   		super(props);
    	this.props.check_login();
    }


	render(){

		var JSON_FALSO = [{

		}]
		

		if ( this.props.token['user'].usuario ) {
			return (
		        <div>
		          <div className="container">
		              <div className="row profile">
		                <Usuario />
		               
		                <Content />
		            </div>
		          </div>
		        </div>
			)
	   	}else{
      		return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
)
    	}
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




