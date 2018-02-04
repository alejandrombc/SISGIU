// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import '../../css/inicio.css'; 

// Components
import CerrarSesion from './cerrarSesion';

class InicioEstudiante extends Component{

  constructor(props) {
      super(props);
    }

  render(){
    let foto = "";
    let cedula = "";
    let nombre = "";
    if ( this.props.token['user'].usuario ) {

      let user = this.props.token['user'].usuario;

      foto = user.foto;
      cedula = user.cedula;

      user.first_name ? nombre += user.first_name + ' ' : '';
      user.segundo_nombre ? nombre +=user.segundo_nombre + ' ' : '';
      user.last_name ? nombre += user.last_name + ' ' : '';
      user.segundo_apellido ? nombre += user.segundo_apellido + ' ' : '';

      // nombre = user.first_name + ' ' + user.segundo_nombre + ' ' + user.last_name + ' ' + user.segundo_apellido ;

    }

    return (
      <div>
        {/*
        <Row>
          <Col md='12'>
          <h6>Modulo Estudiante</h6>
          </Col>
        </Row>
        */}


        <Row>
          <Col md='3' >
            <div className="inicio_estudiante_izquierda">
              <img width="100px" src={foto} className="img-responsive foto_estudiante" alt='foto_estudiante'/>
              <br/>
              <h6>Modulo Estudiante</h6>
              { nombre }
              <br/>
              V-{ cedula } 
              <br/>
              Postgrado
              <br/>

              <CerrarSesion />
            </div>
          </Col>



          <Col md='9'>

        {/* Aqui debe haberun IF de si el periodo de inscripcion esta abierto o no para mostrar este boton */}
            <div className='text-center'>
              <Button color="info">Incribirse</Button>
            </div>



            {console.log( this.props.token['user'].usuario ) }
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


