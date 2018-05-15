// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Button, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { PulseLoader } from 'halogenium';
import Inscripcion from './inscripcion';


// Components
import {
  get_information,
  get_periodo_estudiante,
  get_periodos_tipo_postgrado,
  get_estado_estudiante,
  cargado,
  cargando,
  get_tipo_postgrado,
} from '../../actions/inicio';


class InicioEstudiante extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inscribiendo: false,
      visible: true
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.get_ListItems = this.get_ListItems.bind(this);
    this.actualizarInformacionInicio = this.actualizarInformacionInicio.bind(this);
    this.buscarInformacionAsignaturas = this.buscarInformacionAsignaturas.bind(this);
    this.get_titulo = this.get_titulo.bind(this);
    this.mostrar_descripcion_periodo = this.mostrar_descripcion_periodo.bind(this);

  }

  findElement(arr, propName, propValue) {
    for (var i = 0; i < arr.length; i++)
      if (arr[i][propName] === propValue)
        return arr[i];

  }

  componentDidMount() {
    this.props.get_information(this.props.activeUser['user'])
      .then(() => this.props.get_periodos_tipo_postgrado("en inscripcion", this.props.activeUser['user'].id_tipo_postgrado)
        .then(() => this.props.get_periodo_estudiante(this.props.activeUser['user'].usuario.cedula, "en inscripcion")
          .then(() => this.props.get_periodos_tipo_postgrado("activo", this.props.activeUser['user'].id_tipo_postgrado)
            .then(() => this.props.get_estado_estudiante(this.props.activeUser['user']['id_estado_estudiante'])
              .then(() => this.props.get_tipo_postgrado(this.props.activeUser['user']['id_tipo_postgrado'])
                .then(() => this.props.cargado())
              )))));

  }

  buscarInformacionAsignaturas() {
    this.props.get_information(this.props.activeUser['user']);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  get_ListItems(dias) {

    const pisos = ['Aula Digital', 'Piso 1', 'Piso 2', 'Piso 3', 'Piso 4'];
    var listItems = "";
    if (this.props.estudianteUser['materias'] && this.props.estudianteUser['materias'].length > 0) {
      listItems = this.props.estudianteUser['materias'].map((valor, index) => {
        var lista_docentes = [];
        for (var i = 0; i < valor['docente']['horario_dia'].length; i++) {

          lista_docentes[i] = <font key={i}> {dias[valor['docente']['horario_dia'][i]]} {valor['docente']['horario_hora'][i]} | {pisos[valor['docente']['piso'][i]]}<br /></font>
        }
        return (
          <ListGroupItem key={index}>
            <ListGroupItemHeading>({valor['codigo']}) {valor['nombre']}</ListGroupItemHeading>
            <ListGroupItemText>
              {lista_docentes}
              Prof: {valor['docente']['first_name']} {valor['docente']['last_name']}
            </ListGroupItemText>
          </ListGroupItem>
        )
      });
    } else {
      if (this.props.estudianteUser['tiene_asignaturas']) {
        listItems = <center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>
      }
    }

    return listItems;
  }


  actualizarInformacionInicio() {
    if (this.state.inscribiendo === false) {
      this.props.cargando();
      this.props.get_information(this.props.activeUser['user']).then(() => this.props.cargado());
    }
  }


  enInscripcion() {
    this.setState({ inscribiendo: !this.state.inscribiendo }, () => this.actualizarInformacionInicio());
  }

  get_titulo() {
    if (!this.props.estudianteUser['tiene_asignaturas'] && this.props.estudianteUser.lista_periodo_activo.length > 0) {
      return 'Usted no se encuentra inscrito en el periodo actual.';
    } else if (this.props.estudianteUser.lista_periodo_activo.length === 0 && this.props.estudianteUser.lista_periodos.length === 0) {
      return 'Actualmente no se encuentran periodos activos.';
    } else if (this.props.estudianteUser['tiene_asignaturas']) {
      if (this.props.estudianteUser.materias.length > 0 && !this.props.estudianteUser.materias[0].retirado) {
        return 'Asignaturas Inscritas';
      } else {
        return 'Periodo Retirado';
      }
    }
  }

  mostrar_descripcion_periodo() {
    let periodo;
    if (this.props.estudianteUser.lista_periodos.length > 0) {
      periodo = this.props.estudianteUser.lista_periodos[0];
    } else if (this.props.estudianteUser.lista_periodo_activo.length > 0) {
      periodo = this.props.estudianteUser.lista_periodo_activo[0];
    } else {
      return '';
    }
    return 'Periodo: ' + periodo.numero_periodo + ' (' + periodo.mes_inicio + ' ' + periodo.anio_inicio + ' - ' + periodo.mes_fin + ' ' + periodo.anio_fin + ')';
  }

  render() {
    const dias = {
      "0": "Lunes",
      "1": "Martes",
      "2": "Miercoles",
      "3": "Jueves",
      "4": "Viernes",
      "5": "Sabado",
      "6": "Domingo",
    }

    if (!this.props.activeUser.cargado) {
      return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>);
    } else {

      if (this.props.estudianteUser.estado_estudiante.estado === 'activo') {
        if (!this.state.inscribiendo) {
          return (
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
              <Row>
                <Col md='12' className="text-center">
                  <h5>{this.get_titulo()}</h5>
                </Col>
              </Row>

              {this.props.estudianteUser['tiene_asignaturas'] &&
                <div>
                  <h6 className="text-center">
                    {this.mostrar_descripcion_periodo()}
                  </h6>
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
        } else {
          return (
            <Inscripcion triggerBuscarInformacionAsignaturas={() => this.buscarInformacionAsignaturas()} triggerInscripcion={() => this.enInscripcion()} />
          );
        }
      } else {
        return (
          <div>
            <center><h5>Usted no es un estudiante activo</h5></center>
          </div>
        );
      }
    }


  }
}


const mapStateToProps = (state) => {
  return {
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
    cargando: cargando,
    get_tipo_postgrado: get_tipo_postgrado,

  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(InicioEstudiante);


