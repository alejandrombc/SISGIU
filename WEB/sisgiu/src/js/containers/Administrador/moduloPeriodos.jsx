// Dependencies
import React, { Component } from 'react';
import { Row, Col, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import '../../../css/moduloUsuarioAdministrador.css';
import classnames from 'classnames';

// Components
import ListaPeriodos from './listaPeriodos';


class ModuloPeriodos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1'
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {

    return (
      <div>

        <Nav tabs classnames="TabsCursor">
          <NavItem>
            <NavLink className={classnames({ active: this.state.activeTab === '1' })} onClick={() => { this.toggle('1'); }} >
              Periodos Guardados
              </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={this.state.activeTab}>

          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                {this.state.activeTab === '1' &&
                  <ListaPeriodos />
                }
              </Col>
            </Row>
          </TabPane>

        </TabContent>

      </div>
    )
  }
}




export default ModuloPeriodos;


