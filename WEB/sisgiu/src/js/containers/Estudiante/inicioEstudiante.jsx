// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Alert, Button, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import { PulseLoader } from 'halogenium';
import Inscripcion from './inscripcion';
import ConfirmButton from 'react-confirm-button';


// Components
import { 
    get_information, 
    get_periodo_estudiante, 
    get_periodos_tipo_postgrado, 
    get_estado_estudiante, 
    cargado,
    retirar_estudiante,
    } from '../../actions/inicio';


class InicioEstudiante extends Component{

  constructor(props) {
      super(props);
      this.state = {
        inscribiendo: false,
        visible: true,
      }
      this.onDismiss = this.onDismiss.bind(this);
      this.get_ListItems = this.get_ListItems.bind(this);
  }

  componentDidMount() {
    this.props.get_information(this.props.activeUser['user'])
    .then( ()=> this.props.get_periodos_tipo_postgrado("en inscripcion", this.props.activeUser['user'].id_tipo_postgrado)
      .then( () => this.props.get_periodo_estudiante(this.props.activeUser['user'].usuario.cedula, "en inscripcion")
        .then( () => this.props.get_periodos_tipo_postgrado("activo",this.props.activeUser['user'].id_tipo_postgrado)
          .then( () => this.props.get_estado_estudiante(this.props.activeUser['user']['id_estado_estudiante'])
           .then( () => this.props.cargado() )
    ))));
    
    }


  onDismiss() {
    this.setState({ visible: false });
  }

  retirar_asignaturas(codigo, user, periodo){
    this.props.retirar_estudiante(codigo,user,periodo);
  }

  get_ListItems(dias) {
    var listItems = "";
    if(this.props.estudianteUser['materias'] && this.props.estudianteUser['materias'].length > 0){
      listItems = this.props.estudianteUser['materias'].map((valor, index) =>{
        var lista_docentes = [];
        for (var i = 0; i < valor['docente']['horario_dia'].length; i++) {

            lista_docentes[i] = <font key={i}> {dias[valor['docente']['horario_dia'][i]]} {valor['docente']['horario_hora'][i]} <br /></font>
        }
        return (
          <ListGroupItem key={index}>
            <ListGroupItemHeading>({valor['codigo']}) {valor['nombre']}</ListGroupItemHeading>
            <ListGroupItemText>
                {lista_docentes}
                Prof: {valor['docente']['first_name']} {valor['docente']['last_name']}
            </ListGroupItemText>
            {!valor['retirado'] ?
            <ConfirmButton
                  disableAfterConfirmed
                  onConfirm={() => this.retirar_asignaturas(valor['codigo'], this.props.activeUser.user, this.props.estudianteUser.lista_periodo_activo[0].id) }
                  text= "Retirar"
                  key={valor['codigo']}
                  className="btn btn-danger btn-sm float-right"
                  confirming={{
                    text: '¿Está Seguro?',
                    className: 'btn btn-danger btn-sm float-right',
                  }}
                  disabled={{
                    text: 'Usted ya esta retirado',
                    className: 'btn btn-danger btn-sm float-right',
                  }}
                />
              :
              <Button key={valor['codigo']} className="btn btn-danger btn-sm float-right" disabled>Usted ya esta retirado</Button>
            }
        </ListGroupItem>
        )
      });
    }else{
      if(this.props.estudianteUser['tiene_asignaturas']){
        listItems = <center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
      }
    }

    return listItems;
  }

  enInscripcion(){
    this.setState({inscribiendo: !this.state.inscribiendo});
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

      if (!this.props.activeUser.cargado) {
        return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>);
      } else {

        if (this.props.estudianteUser.estado_estudiante.estado === 'activo') 
        {
          if(!this.state.inscribiendo) {
            return(
                <div>
                {/*ALERT DE ERROR*/}
                {this.props.estudianteUser['error_inscripcion'] &&
                  <Col md='12' className="text-center">
                    <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                      Ha ocurrido un error en el proceso de inscripción
                    </Alert>
                  </Col>
                }

                {/*ALERT DE EXITO*/}
                {this.props.estudianteUser['inscripcion_exitosa'] &&
                  <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                      Inscripción realizada exitosamente.
                  </Alert> 
                }

                <br />
                {!this.props.estudianteUser['inscripcion_exitosa'] && this.props.estudianteUser.first_render && this.props.estudianteUser.lista_periodo_estudiante.length === 0 && this.props.estudianteUser.lista_periodos.length > 0 &&
                  <Row>
                    <Col md='12' className="text-center">
                      <Button onClick={() => this.enInscripcion()} color="primary">
                        Inscribirse
                      </Button>
                    </Col>
                  </Row>
                }
                  <br />
                  <br />
                  {!this.props.estudianteUser['tiene_asignaturas'] &&
                    <Row>
                       <Col md='12' className="text-center">
                          <h5>Usted no se encuentra inscrito en el periodo actual.</h5>
                      </Col>
                    </Row>
                  }
                  {this.props.estudianteUser['tiene_asignaturas'] &&
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
                            {this.get_ListItems(dias)}
                          </ListGroup>
                        </Col>
                      </Row>
                    </div>
                  }
                </div>
            );
          } else{
            return (
              <Inscripcion triggerInscripcion={()=> this.enInscripcion() }/>
            );
          }
        } else 
        {
          return (
            <div>
              <center><h5>Usted no es un estudiante activo</h5></center>
            </div>
          );
        }
      }


  }
}


const mapStateToProps = (state)=> {
  return{
    activeUser: state.activeUser,
    estudianteUser: state.estudianteUser
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    get_information: get_information,
    get_periodo_estudiante: get_periodo_estudiante,
    get_periodos_tipo_postgrado: get_periodos_tipo_postgrado,
    get_estado_estudiante: get_estado_estudiante,
    cargado: cargado,
    retirar_estudiante:retirar_estudiante,

  }, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(InicioEstudiante);


