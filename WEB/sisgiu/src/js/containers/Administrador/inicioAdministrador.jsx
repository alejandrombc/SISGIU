// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Alert, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap';
import { PulseLoader } from 'halogenium'; //Spinner
import ConfirmButton from 'react-confirm-button';


// Components
import { get_periodos_actuales } from '../../actions/inicio';
import { cambiarEstadoPeriodo } from '../../actions/inicio';
import {get_estado_periodo} from '../../actions//moduloPeriodos';


class InicioAdministrador extends Component{

  constructor(props) {
      super(props);
      this.state = {
        visible: true,
        loading: false,
      }

      this.props.get_periodos_actuales();
      this.props.get_estado_periodo();
      this.onDismiss = this.onDismiss.bind(this);
      this.cambiarEstadoPeriodo = this.cambiarEstadoPeriodo.bind(this);
      this.updateLoading = this.updateLoading.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  updateLoading(){
    this.setState({"loading":!this.state.loading});
  }


  cambiarEstadoPeriodo(periodo) {

    // this.updateLoading();
    this.props.cambiarEstadoPeriodo(periodo, this.props.adminUser.lista_estadoPeriodo);
    // this.updateLoading();
  }


  render(){
      let listItems = '';
      if(this.props.adminUser['lista_periodos'] && this.props.adminUser['lista_periodos'].length > 0){
        listItems = this.props.adminUser['lista_periodos'].map((valor, index) =>{
            return (
              <ListGroupItem key={index*-1}>
                
                <Row>
                  <Col md='7' sm='7'>
                    <ListGroupItemHeading>{valor['tipo_postgrado']}</ListGroupItemHeading>
                  </Col>
                  { valor.estado_periodo === 'activo' ?
                    
                    <Col md='5' sm='5' key={valor.id + 0.1}>
                      <ConfirmButton
                        onConfirm={() => this.cambiarEstadoPeriodo(valor) }
                        text = "Terminar Periodo"
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
                        onConfirm={() => this.cambiarEstadoPeriodo( valor) }
                        text = "Finalizar Inscripciones"
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
      } else{
        if(this.props.adminUser['tiene_periodos_activos']){
          listItems = <center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
        }
      }





      return(
          <div>
            <br/>
            <Row>

            { this.state.loading &&
              <Col md='12' className="text-center">
                <center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
              </Col>
            }

            {this.props.adminUser['periodo_terminado_error'] &&
              <Col md='12' className="text-center">
                <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                  No se pudo terminar el periodo
                </Alert>
              </Col>
            }
            { this.props.adminUser['tiene_periodos_activos'] &&
              <Col md='12' className="text-center">
                <h5>Periodos Actuales</h5>
              </Col>
            }

            { !this.props.adminUser['tiene_periodos_activos'] &&
              <Col md='12' className="text-center">
                <h5>No hay ningun periodo activo actualmente</h5>
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

          </div>
      )
  }
}


const mapStateToProps = (state)=> {
  return{
    adminUser: state.adminUser
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    get_periodos_actuales: get_periodos_actuales, 
    cambiarEstadoPeriodo: cambiarEstadoPeriodo,
    get_estado_periodo: get_estado_periodo,
    }
    , dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(InicioAdministrador);


