// Dependencies
import React, {Component} from 'react';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import '../../../css/moduloUsuarioAdministrador.css'; 
import classnames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import ListaUsuarios from './listaUsuarios';
import { hide_alerts } from '../../actions/moduloUsuarioAdministrador';


class ModuloUsuarioAdministrador extends Component{

  constructor(props) {
      super(props);
      this.state = {
        activeTab: '1'
      }

      this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.props.pagination['pagina'] = 1; //Poner la pagina en 1 al cambiar de tab
      this.setState({
        activeTab: tab
      });
    }
    this.props.hide_alerts();
  }


  render(){

      return(
        <div>

          <Nav tabs classnames="TabsCursor">
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }} >
                Estudiantes
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '2' })} onClick={() => { this.toggle('2'); }} >
                Personal Docente
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '3' })} onClick={() => { this.toggle('3'); }} >
                Personal Administrativo
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className={classnames({ active: this.state.activeTab === '4' })} onClick={() => { this.toggle('4'); }} >
                Administradores
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={this.state.activeTab}>
            
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                { this.state.activeTab === '1' &&
                  <ListaUsuarios tipo_usuario='estudiantes'/>
                }
                </Col>
              </Row>
            </TabPane>

            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                { this.state.activeTab === '2' &&
                  <ListaUsuarios tipo_usuario='docentes'/>
                }
                </Col>
              </Row>
            </TabPane>

            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                { this.state.activeTab === '3' &&
                  <ListaUsuarios tipo_usuario='administrativo'/>
                }
                </Col>
              </Row>
            </TabPane>

            <TabPane tabId="4">
              <Row>
                <Col sm="12">
                { this.state.activeTab === '4' &&
                  <ListaUsuarios tipo_usuario='administradores'/>
                }
                </Col>
              </Row>
            </TabPane>

          </TabContent>

        </div>
      )
  }
}

const mapStateToProps = (state)=> {
  return{
    pagination: state.paginacion,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    hide_alerts: hide_alerts,
  }, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuloUsuarioAdministrador);


