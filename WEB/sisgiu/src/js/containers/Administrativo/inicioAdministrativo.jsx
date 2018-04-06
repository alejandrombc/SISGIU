// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { } from 'reactstrap';
import { PulseLoader } from 'halogenium';


// Components
import { 
    cargado,
    } from '../../actions/inicio';


class InicioEstudiante extends Component{

	constructor(props) {
  		super(props);
		this.state = {
		visible: true
		}
		// this.onDismiss = this.onDismiss.bind(this);
	}

	componentDidMount() {
    	this.props.cargado();
	}


  // onDismiss() {
  //   this.setState({ visible: false });
  // }


  render(){
    

    if (!this.props.activeUser.cargado) {
      return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>);
    } else {
    	return (
    		<div>
    			<h1>Inicio Administrativo</h1>
    		</div>
    	);

    }


  }


}


const mapStateToProps = (state)=> {
  return{
    activeUser: state.activeUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    cargado: cargado,

  }, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(InicioEstudiante);


