// Dependencies
import React, {Component} from 'react';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import '../../../css/moduloUsuarioAdministrador.css'; 
import classnames from 'classnames';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'; 

// Components
import ListaEstudiantes from '../Docente/listaEstudiantes';
import { cargado } from '../../actions/inicio';
import { 
    get_asignaturas_docente, 
    } from '../../actions/inicioDocente';


class InicioDocente extends Component{

  constructor(props) {
      super(props);
      this.state = {
        activeTab: 0
      }

      this.toggle = this.toggle.bind(this);
  }


  componentDidMount() {
    this.props.get_asignaturas_docente(this.props.activeUser['user'])
    .then( () => this.props.cargado() );
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.props.pagination['pagina'] = 1; //Poner la pagina en 1 al cambiar de tab
      this.setState({
        activeTab: tab
      });
    }
  }


  generate_navs(){
    let listItems = this.props.docenteUser.asignaturas.map((asignatura, index) =>
        <NavItem key={asignatura.codigo + asignatura.tipo_postgrado}>
          <NavLink  className={classnames({ active: this.state.activeTab === index })} onClick={() => { this.toggle(index); }} >
            Codigo: {asignatura.codigo}
          </NavLink>
        </NavItem>
    );

    return listItems;
  }

  generate_tabs(){
    let listItems = this.props.docenteUser.asignaturas.map((asignatura, index) =>
            <TabPane key={asignatura.codigo + asignatura.tipo_postgrado} tabId={index}>
              <Row>
                <Col sm="12">
                { this.state.activeTab === index &&
                  <div>
                    <center>
                      <h6>{asignatura.nombre}</h6> 
                      <h6>{asignatura.tipo_postgrado}</h6> 
                    </center>
                    <ListaEstudiantes asignatura={asignatura.codigo} tipo_postgrado={asignatura.tipo_postgrado} />
                  </div>
                }
                </Col>
              </Row>
            </TabPane>
    );

    return listItems;
  }


  render(){

      return(
        <div>

          <Nav tabs classnames="TabsCursor">
            {this.generate_navs()}
          </Nav>
          <br />
          <TabContent activeTab={this.state.activeTab}>
            
            {this.generate_tabs()}

          </TabContent>

        </div>
      )
  }
}

const mapStateToProps = (state)=> {
  return{
    pagination: state.paginacion,
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


