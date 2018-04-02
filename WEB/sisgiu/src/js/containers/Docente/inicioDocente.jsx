// Dependencies
import React, {Component} from 'react';
import { Row, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Button} from 'reactstrap';
import '../../../css/moduloUsuarioAdministrador.css'; 
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'; 
import { PulseLoader } from 'halogenium';

// Components
import { cargado } from '../../actions/inicio';
import {get_asignaturas_docente, } from '../../actions/inicioDocente';


class InicioDocente extends Component{

  constructor(props) {
    super(props);

    this.get_ListItems = this.get_ListItems.bind(this);
  }


  componentDidMount() {
    this.props.get_asignaturas_docente(this.props.activeUser['user'])
    .then( () => this.props.cargado() );
  }

  get_ListItems() 
  {
    var listItems = "";

    if (this.props.docenteUser.asignaturas.length > 0) 
    {
      listItems = this.props.docenteUser.asignaturas.map((valor, index) => {

        return (
          <ListGroupItem key={index}>
            <ListGroupItemHeading>({valor['codigo']}) {valor['nombre']}</ListGroupItemHeading>
            <ListGroupItemText>
                <Button className="float-right" color="secondary" size="sm">Descargar Planilla</Button>
            </ListGroupItemText>
          </ListGroupItem>
        )
      });

    } else 
    {
      listItems = <center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
    }

    return listItems;
  }

  render(){

      return(
        <div>

          <Row>
            <Col md='12' className="text-center">
              <h5>Asignaturas en Curso</h5>
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

        </div>
      )
  }
}

const mapStateToProps = (state)=> {
  return{
    activeUser: state.activeUser,
    docenteUser: state.docenteUser
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    get_asignaturas_docente: get_asignaturas_docente,
    cargado:cargado

  }, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(InicioDocente);


