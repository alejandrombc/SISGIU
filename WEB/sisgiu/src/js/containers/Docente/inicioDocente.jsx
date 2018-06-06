// Dependencies
import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';
import '../../../css/moduloUsuarioAdministrador.css';
import { bindActionCreators } from 'redux';
import { host } from '../../components/globalVariables';
import request from 'superagent';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';
//import DiagramaFlujo  from '../../components/diagramas';



// Components
import { cargado } from '../../actions/inicio';
import { get_asignaturas_docente, } from '../../actions/inicioDocente';


class InicioDocente extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cargando: false,
    }
    this.get_ListItems = this.get_ListItems.bind(this);
    this.get_planillas = this.get_planillas.bind(this);

  }


  componentDidMount() {
    this.props.get_asignaturas_docente(this.props.activeUser['user'])
      .then(() => this.props.cargado());
  }

  get_file(codigo, cedula, token, postgrado) {
    return request
      .get(host + 'api/planillas/docente/' + cedula + '/' + codigo + '/' + postgrado + '/')
      .set('Authorization', 'JWT ' + token)
      .then(function (res) {
        var blob = new Blob([res.text]);
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "planilla_" + cedula + ".pdf";
        link.click();

      })
      .catch(function (err) {
        alert("Error al crear la planilla");

      });
  }

  // Planillas
  get_planillas(codigo, cedula, postgrado) {
    let token = localStorage.getItem('user_token');
    this.setState({ "cargando": true },
      () => this.get_file(codigo, cedula, token, postgrado)
        .then(
          () => {
            this.setState({ "cargando": false });
          }
        )
    );
  };

  get_ListItems() {
    var listItems = "";

    if (this.props.docenteUser.asignaturas.length > 0) {
      listItems = this.props.docenteUser.asignaturas.map((valor, index) => {

        return (
          <ListGroupItem key={index}>
            <ListGroupItemHeading>({valor['codigo']}) {valor['nombre']}</ListGroupItemHeading>
            <Row>
              <Col md='8'>
                <ListGroupItemText>
                  {valor['tipo_postgrado']}
                </ListGroupItemText>
              </Col>

              <Col md='4'>
                <ListGroupItemText>
                  <Button onClick={() => this.get_planillas(valor['codigo'], this.props.activeUser.user.usuario.cedula, valor['tipo_postgrado'])} className="float-right" color="secondary" size="sm">Descargar Planilla</Button>
                </ListGroupItemText>
              </Col>

            </Row>

          </ListGroupItem>
        )
      });

    }

    return listItems;
  }

  render() {

    if (this.props.docenteUser.asignaturas.length === 0) {
      return (
        <div>
          <center>
            <br />
            <h4>Actualmente no se encuentra impartiendo ninguna asignatura</h4>
          </center>
          {/*<Row>
            <Col md="12" className="text-center">
              <br /><hr /><br />
              <DiagramaFlujo />
            </Col>
          </Row>*/}
        </div>
      );
    } else {
      return (
        <div>

          {!this.props.activeUser.cargado &&
            <center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>
          }

          <Row>
            <Col md='12' className="text-center">
              <h5>Asignaturas en Curso</h5>
            </Col>
          </Row>
          {this.state.cargando &&
            <center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>
          }
          <br />

          <Row>
            <Col md='12'>
              <ListGroup>
                {this.get_ListItems()}
              </ListGroup>
            </Col>
          </Row>
	{/*
          <Row>
            <Col md="12" className="text-center">
              <br /><hr /><br />
              <DiagramaFlujo />
            </Col>
          </Row>
	*/}
        </div>
      )
    }


  }
}

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser,
    docenteUser: state.docenteUser
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    get_asignaturas_docente: get_asignaturas_docente,
    cargado: cargado

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InicioDocente);


