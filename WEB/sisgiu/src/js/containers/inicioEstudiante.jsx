// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';

class InicioEstudiante extends Component{

  render(){
      return(
          <div>
            <h4>
              Este es el inicio de estudiante
            </h4>
          </div>
      )
  }
}


const mapStateToProps = (state)=> {
  return{
    token: state.activeUser
  };
}

export default connect(mapStateToProps)(InicioEstudiante);


