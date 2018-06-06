// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PulseLoader } from 'halogenium';
import { Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';
import { host } from '../../components/globalVariables';
import request from 'superagent';
//import DiagramaFlujo  from '../../components/diagramas'


// Components
import { cargado } from '../../actions/inicio';
import { get_periodos_actuales } from '../../actions/inicio';
import { get_estado_periodo } from '../../actions/moduloPeriodos';

class InicioAdministrativo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cargando: false,
    }

    this.get_planillas = this.get_planillas.bind(this);
    this.get_ListItems = this.get_ListItems.bind(this);
    this.periodos_activos = this.periodos_activos.bind(this);
    this.mostrar_descripcion_periodo = this.mostrar_descripcion_periodo.bind(this);
  }

  get_file(periodo, nombre, token) {
    return request
      .get(host + 'api/planillas/administrativo/' + periodo + '/')
      .set('Authorization', 'JWT ' + token)
      .then(function (res) {
        var blob = new Blob([res.text]);
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "planilla_" + nombre + ".pdf";
        link.click();

      })
      .catch(function (err) {
        alert("Error al crear la planilla");

      });
  }

  // Planillas
  get_planillas(periodo, nombre) {
    let token = localStorage.getItem('user_token');
    this.setState({ "cargando": true },
      () => this.get_file(periodo, nombre, token)
        .then(
          () => {
            this.setState({ "cargando": false });
          }
        )
    );
  };

  mostrar_descripcion_periodo(periodo) {
    return 'Periodo: ' + periodo.numero_periodo + ' (' + periodo.mes_inicio + ' ' + periodo.anio_inicio + ' - ' + periodo.mes_fin + ' ' + periodo.anio_fin + ')';
  }

  periodos_activos(){
    let hay_periodos = false;
    this.props.administrativoUser['lista_periodos'].forEach(function(entry) {
      if(entry.estado_periodo === "activo"){ hay_periodos = true; }
    });
    return hay_periodos;
  }

  get_ListItems() {
    let listItems = '';
    if (this.props.administrativoUser['lista_periodos'] && this.props.administrativoUser['lista_periodos'].length > 0) {
      listItems = this.props.administrativoUser['lista_periodos'].map((valor, index) => {
        if(valor.estado_periodo === "activo"){
          return (
            <ListGroupItem key={index * -1}>

              <Row>

                <Col md='7' sm='7'>
                  <ListGroupItemHeading>{valor['tipo_postgrado']}</ListGroupItemHeading>
                  <ListGroupItemText>{this.mostrar_descripcion_periodo(valor)}</ListGroupItemText>
                </Col>

                <Col md='5' sm='5'>
                  <ListGroupItemText>
                    <Button onClick={() => this.get_planillas(valor['id'], valor['tipo_postgrado'])} className="float-right" color="secondary" size="sm">Descargar Planilla</Button>
                  </ListGroupItemText>
                </Col>

              </Row>

            </ListGroupItem>
          )
        }else{
          return (<div key={index * -1} />)
        }
      });
    } else {
      if (this.props.administrativoUser['tiene_periodos_activos']) {
        listItems = <center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>
      }
    }

    return listItems;
  }

  componentDidMount() {
    this.props.get_periodos_actuales()
      .then(() => this.props.get_estado_periodo()
        .then(() => this.props.cargado())
      );
  }


  render() {

    if (!this.props.activeUser.cargado) {
      return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>);
    } else {


      return (
        <div>
          {this.state.cargando &&
            <center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>
          }
          <br />
          <Row className='text-center'>
            <Col md='12'>
              {this.periodos_activos() ?
                <h5>Periodos Actuales</h5>
                :
                <h5>Actualmente no se encuentra ningún periodo </h5>
              }
            </Col>
          </Row>


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
    administrativoUser: state.administrativoUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    cargado: cargado,
    get_periodos_actuales: get_periodos_actuales,
    get_estado_periodo: get_estado_periodo,

  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(InicioAdministrativo);


