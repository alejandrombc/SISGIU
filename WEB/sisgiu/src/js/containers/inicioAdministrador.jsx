// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Button, Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText} from 'reactstrap';
import { get_periodos_actuales } from '../actions/inicio';

//Spinner
import { PulseLoader } from 'halogenium';

class InicioAdministrador extends Component{

  constructor(props) {
      super(props);
      this.props.get_periodos_actuales();
  }


  render(){

      let listItems = '';

      if(this.props.adminUser['periodos'] && this.props.adminUser['periodos'].length > 0){
        listItems = this.props.adminUser['periodos'].map((valor, index) =>{
            
            return (
              <ListGroupItem key={index}>
                <Row>
                  <Col md='9'>
                    <ListGroupItemHeading>{valor['tipo_postgrado']}</ListGroupItemHeading>
                  </Col>
                  <Col md='3'>
                    <ListGroupItemText key={index}>
                        <Button color="danger" size='sm' key={valor['tipo_postgrado_id']}>Terminar Perido</Button>
                    </ListGroupItemText>
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
            { this.props.adminUser['tiene_periodos_activos'] &&
              <Col md='12' className="text-center">
                <h5>Periodos Actuales</h5>
              </Col>
            }

            { !this.props.adminUser['tiene_periodos_activos'] &&
              <Col md='12' className="text-center">
                <h5>Usted no se encuentra inscrito en el periodo actual</h5>
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
    token: state.activeUser,
    adminUser: state.adminUser
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({get_periodos_actuales: get_periodos_actuales}, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(InicioAdministrador);


