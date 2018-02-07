// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Input, Row, Col, Form, FormGroup, Label, Alert, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';


class InicioEstudiante extends Component{

  render(){
    var JSON_FALSO = [
          {
              "tipo_asignatura": "Electiva",
              "nombre": "Matematica 4",
              "codigo": "0004",
              "unidad_credito": 5,
              "id": 4,
              "docente": {
                  "horario_dia": [
                      "2"
                  ],
                  "horario_hora": [
                      "1:00 - 3:00"
                  ],
                  "first_name": "Gregorio",
                  "last_name": "Castro"
              },
              "tipo_postgrado": "Doctorado"
          },
          {
              "tipo_asignatura": "Electiva",
              "nombre": "Matematica 3",
              "codigo": "0003",
              "unidad_credito": 5,
              "id": 3,
              "docente": {
                  "horario_dia": [
                      "3"
                  ],
                  "horario_hora": [
                      "3:00 - 5:00"
                  ],
                  "first_name": "Gregorio",
                  "last_name": "Castro"
              },
              "tipo_postgrado": "Doctorado"
          },
          {
              "tipo_asignatura": "Electiva",
              "nombre": "Matematica 2",
              "codigo": "0002",
              "unidad_credito": 5,
              "id": 2,
              "docente": {
                  "horario_dia": [
                      "0",
                      "4"
                  ],
                  "horario_hora": [
                      "10:00 - 12:00",
                      "15:00 - 17:00"
                  ],
                  "first_name": "Gregorio",
                  "last_name": "Castro"
              },
              "tipo_postgrado": "Doctorado"
          },
          {
              "tipo_asignatura": "Electiva",
              "nombre": "Matematica 1",
              "codigo": "0001",
              "unidad_credito": 5,
              "id": 1,
              "docente": {
                  "horario_dia": [
                      "0"
                  ],
                  "horario_hora": [
                      "09:00 - 11:00"
                  ],
                  "first_name": "Gregorio",
                  "last_name": "Castro"
              },
              "tipo_postgrado": "Doctorado"
          }
      ];

    const dias = {
      "0":"Lunes",
      "1":"Martes",
      "2":"Miercoles",
      "3":"Jueves",
      "4":"Viernes",
      "5":"Sabado",
      "6":"Domingo",
    }

    const listItems = JSON_FALSO.map((valor) =>
        <ListGroupItem>
          <ListGroupItemHeading>({valor['codigo']}) {valor['nombre']}</ListGroupItemHeading>
          <ListGroupItemText>
              {dias[valor['docente']['horario_dia'][0]]} {valor['docente']['horario_hora'][0]}
              <br />
              Prof: {valor['docente']['first_name']} {valor['docente']['last_name']}
          </ListGroupItemText>
        </ListGroupItem>
      );
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
      )
  }
}


const mapStateToProps = (state)=> {
  return{
    token: state.activeUser
  };
}

export default connect(mapStateToProps)(InicioEstudiante);


