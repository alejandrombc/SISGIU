// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
// Components

class InicioEstudiante extends Component{

  constructor(props) {
      super(props);
    }

  render(){
    return (
      <div>
        <Row>
          <Col md='12'>
            <h6>Modulo Estudiante</h6>
          </Col>
        </Row>


        <Row>
          <Col md='3'>
            foto
            <br/>
            Nombre
            <br/>
            V-{ this.props.token['user']['cedula'] } 
            <br/>
            Postgrado
            <br/>

            Cerrar Sesión
          </Col>

          <Col md='9'>
          
            { this.props.token['user']['cedula'] } 
              
            {console.log( this.props.token['user']) }
          </Col>

        </Row>
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

}

export default connect(mapStateToProps, mapDispatchToProps)(InicioEstudiante);


