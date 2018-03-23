// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Alert, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading} from 'reactstrap';
import { PulseLoader } from 'halogenium'; //Spinner
import ConfirmButton from 'react-confirm-button';


// Components
import { get_periodos_actuales } from '../../actions/inicio';
import  ModalTerminarPeriodo  from './modalTerminarPeriodo';
import { terminarPeriodo } from '../../actions/inicio';


class InicioAdministrador extends Component{

  constructor(props) {
      super(props);
      this.state = {
        visible: true,
        loading: false,
      }

      this.props.get_periodos_actuales();
      this.onDismiss = this.onDismiss.bind(this);
      this.terminarPeriodo = this.terminarPeriodo.bind(this);
      this.updateLoading = this.updateLoading.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  updateLoading(){
    this.setState({"loading":!this.state.loading});
  }


  terminarPeriodo(periodo) {

    this.updateLoading();
    this.props.terminarPeriodo(periodo);
    this.updateLoading();
    

  }

  render(){

      let listItems = '';

      if(this.props.adminUser['periodos'] && this.props.adminUser['periodos'].length > 0){
        listItems = this.props.adminUser['periodos'].map((valor, index) =>{
            return (
              <ListGroupItem key={index}>
                <Row>
                  <Col md='7' sm='7'>
                    <ListGroupItemHeading>{valor['tipo_postgrado']}</ListGroupItemHeading>
                  </Col>

                  <Col md='5' sm='5'>
                    <ConfirmButton
                      onConfirm={() => this.terminarPeriodo(valor) }
                      text = 'Terminar Periodo'
                      className="btn btn-danger btn-sm"
                      confirming={{
                        text: '¿Está seguro?',
                        className: 'btn btn-danger btn-sm',
                      }}
                    />
                  </Col>

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
    terminarPeriodo: terminarPeriodo,
    }
    , dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(InicioAdministrador);


