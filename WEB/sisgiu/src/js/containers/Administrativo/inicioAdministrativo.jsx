// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { } from 'reactstrap';
import { PulseLoader } from 'halogenium';
import { Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button } from 'reactstrap';


// Components
import { cargado } from '../../actions/inicio';
import { get_periodos_actuales } from '../../actions/inicio';
import { get_estado_periodo } from '../../actions/moduloPeriodos';

class InicioAdministrativo extends Component{

	constructor(props) {
    super(props);

    this.get_ListItems = this.get_ListItems.bind(this);
    
    // this.get_ListItems = this.get_ListItems.bind(this);
	}

  get_ListItems (){
    let listItems = '';
    if (this.props.administrativoUser['lista_periodos'] && this.props.administrativoUser['lista_periodos'].length > 0) {
      listItems = this.props.administrativoUser['lista_periodos'].map((valor, index) => {
        return (
          <ListGroupItem key={index * -1}>

            <Row>

              <Col md='7' sm='7'>
                <ListGroupItemHeading>{valor['tipo_postgrado']}</ListGroupItemHeading>
              </Col>

              <Col md='5' sm='5'>
                <ListGroupItemText>
                  <Button className="float-right" color="secondary" size="sm">Descargar Planilla</Button>
                </ListGroupItemText>
              </Col>

            </Row>

          </ListGroupItem>
        )
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
          
          <br/>
          <Row className='text-center'>
            <Col md='12'>
              {this.props.administrativoUser['lista_periodos'].length > 0 ?
                <h5>Periodos Actuales</h5>
                :
                <h5>Actualmente no se encuentra ningún periodo </h5>
              }
            </Col>
          </Row>
          

          <br/>
          <Row>
            <Col md='12'>
              <ListGroup>
                {this.get_ListItems()}
              </ListGroup>
            </Col>
          </Row>

        </div>
      )
    }
  }

}


const mapStateToProps = (state)=> {
  return{
    activeUser: state.activeUser,
    administrativoUser: state.administrativoUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    cargado: cargado,
    get_periodos_actuales: get_periodos_actuales,
    get_estado_periodo: get_estado_periodo,

  }, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(InicioAdministrativo);


