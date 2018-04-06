//Dependencies
import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium'; 

import Usuario from './usuario';
import Content from './content'; 
import {check_login} from '../actions/inicio.jsx';

class Inicio extends Component{

 	componentDidMount() {
    	this.props.check_login();
    }


	render(){

		if ( this.props.token['user'] && this.props.token['user'].usuario ) {
			return (
		        <div>
		          <div className="container">
		              <div className="row profile">
		                <Usuario />
		               
		                <Content pestana={this.props.pestana}/>
		            </div>
		          </div>
		        </div>
			)
	   	}else{
      		return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>)
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




