// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import { get_information } from '../actions/inicioEstudiante';

//Spinner
import { PulseLoader } from 'halogenium';

class InicioEstudiante extends Component{

  constructor(props) {
      super(props);
      this.props.get_information(this.props.token['user']);
  }


  render(){
     const dias = {
      "0":"Lunes",
      "1":"Martes",
      "2":"Miercoles",
      "3":"Jueves",
      "4":"Viernes",
      "5":"Sabado",
      "6":"Domingo",
    }

    var listItems = "";
      if(this.props.info_materias['materias'].length > 0){
        listItems = this.props.info_materias['materias'].map((valor, index) =>{
          var lista_docentes = [];
          for (var i = 0; i < valor['docente']['horario_dia'].length; i++) {

              lista_docentes[i] = <font key={i}> {dias[valor['docente']['horario_dia'][i]]} {valor['docente']['horario_hora'][i]} <br /></font>
          }
          return (
            <ListGroupItem key={index}>
              <ListGroupItemHeading>({valor['codigo']}) {valor['nombre']}</ListGroupItemHeading>
              <ListGroupItemText key={valor['codigo']}>
                  {lista_docentes}
                  Prof: {valor['docente']['first_name']} {valor['docente']['last_name']}
                  
              </ListGroupItemText>
          </ListGroupItem>
          )
        });
      }else{
        if(!this.props.info_materias['tiene_asignaturas']){
          listItems = <center><h3>Usted no esta inscrito el periodo actual. Maldito vago</h3></center>
        }else{
          listItems = <center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
        }
      }
      return(
          <div>
          <br />
            <Row>
              <Col md='12' className="text-center">
                <Button color="primary">
                  Inscribirse
                </Button>
              </Col>
            </Row>
            <br />
            <br />
            {!this.props.info_materias['tiene_asignaturas'] &&
              <Row>
                 <Col md='12' className="text-center">
                    <h5>Usted no se encuentra inscrito en el periodo actual</h5>
                </Col>
              </Row>
            }
            {this.props.info_materias['tiene_asignaturas'] &&
              <div>
                <Row>
                 <Col md='12' className="text-center">
                    <h5>Asignaturas Inscritas</h5>
                </Col>
                </Row>
                <br />
                <Row>
                  <Col md='12'>
                    <ListGroup>
                      {listItems}
                    </ListGroup>
                  </Col>
                </Row>
              </div>
            }
          </div>
      )
  }
}


const mapStateToProps = (state)=> {
  return{
    token: state.activeUser,
    info_materias: state.estudianteUser
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({get_information: get_information}, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(InicioEstudiante);


