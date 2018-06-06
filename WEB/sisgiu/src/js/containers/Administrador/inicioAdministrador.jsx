// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Alert, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { PulseLoader } from 'halogenium'; //Spinner
//import DiagramaFlujo  from '../../components/diagramas'
import ConfirmButton from 'react-confirm-button';

// Components
import { cambiarEstadoPeriodo, get_periodos_actuales } from '../../actions/inicio';
import { get_estado_periodo } from '../../actions/moduloPeriodos';
import { cargando, cargado } from '../../actions/inicio';


class InicioAdministrador extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    }

    this.onDismiss = this.onDismiss.bind(this);
    this.cambiarEstadoPeriodo = this.cambiarEstadoPeriodo.bind(this);
    this.get_listItems = this.get_listItems.bind(this);
    this.mostrar_descripcion_periodo = this.mostrar_descripcion_periodo.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  componentDidMount() {
    this.props.get_periodos_actuales()
      .then(() => this.props.get_estado_periodo()
        .then(() => this.props.cargado())
      );

  }

  cambiarEstadoPeriodo(periodo) {
    this.props.cargando(); // Accion que cambia la variable 'cargando' en el store
    this.props.cambiarEstadoPeriodo(periodo).then(() => this.props.cargado());
  }

  mostrar_descripcion_periodo(periodo) {
    return 'Periodo: ' + periodo.numero_periodo + ' (' + periodo.mes_inicio + ' ' + periodo.anio_inicio + ' - ' + periodo.mes_fin + ' ' + periodo.anio_fin + ')';
  }


  get_listItems() {

    let listItems = '';
    if (this.props.adminUser['lista_periodos'] && this.props.adminUser['lista_periodos'].length > 0) {
      listItems = this.props.adminUser['lista_periodos'].map((valor, index) => {
        return (
          <ListGroupItem key={index * -1}>

            <Row>
              <Col md='7' sm='7'>
                <ListGroupItemHeading>{valor.tipo_postgrado}: </ListGroupItemHeading>
                <ListGroupItemText>{this.mostrar_descripcion_periodo(valor)}</ListGroupItemText>
              </Col>
              {valor.estado_periodo === 'activo' ?

                <Col md='5' sm='5' key={valor.id + 0.1}>
                  <ConfirmButton
                    onConfirm={() => this.cambiarEstadoPeriodo(valor)}
                    text="Finalizar Periodo"
                    className="btn btn-danger btn-sm"
                    style={{ float: 'right' }}
                    confirming={{
                      text: '¿Está seguro?',
                      className: 'btn btn-danger btn-sm',
                      style: { float: 'right' },
                    }}
                  />
                </Col>

                :

                <Col md='5' sm='5' key={valor.id + 0.2}>
                  <ConfirmButton
                    onConfirm={() => this.cambiarEstadoPeriodo(valor)}
                    text="Finalizar Inscripciones"
                    className="btn btn-primary btn-sm pull-right"
                    style={{ float: 'right' }}
                    confirming={{
                      text: '¿Está seguro?',
                      className: 'btn btn-primary btn-sm',
                      style: { float: 'right' },
                    }}
                  />
                </Col>
              }

            </Row>

          </ListGroupItem>
        )
      });
    } else {
      if (this.props.adminUser['tiene_periodos_activos']) {
        listItems = <center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>
      }
    }

    return listItems;
  }


  render() {

    if (!this.props.activeUser.cargado) {
      return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>);
    } else {
      let listItems = '';
      listItems = this.get_listItems();

      return (
        <div>
          <br />

          <Row>

            {/*ALERT DE ERROR*/}
            {this.props.adminUser['periodo_terminado_error'] &&
              <Col md='12' className="text-center">
                <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                  No se pudo terminar el periodo
                    </Alert>
              </Col>
            }

            <Col md='12' className="text-center">
              {this.props.adminUser['tiene_periodos_activos'] === true ? <h5>Periodos Actuales</h5>
                :
                <h5>No existe ningún periodo activo actualmente</h5>
              }
            </Col>

            {/* SPINNER */}
            {this.props.adminUser.cargando &&
              <Col md='12' className="text-center">
                <center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>
              </Col>
            }

          </Row>

          <br />

          <Row>
            <Col md='12'>
              <ListGroup>
                {listItems}
              </ListGroup>
            </Col>
          </Row>
	{/*
          <Row>
            <Col md="12" className="text-center">
              <br /><hr /><br />
              <DiagramaFlujo />
            </Col>
          </Row> */}
        </div>
      )
    }
  }
}


const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser,
    adminUser: state.adminUser
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    get_periodos_actuales: get_periodos_actuales,
    cambiarEstadoPeriodo: cambiarEstadoPeriodo,
    get_estado_periodo: get_estado_periodo,
    cargando: cargando,
    cargado: cargado
  }
    , dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(InicioAdministrador);


