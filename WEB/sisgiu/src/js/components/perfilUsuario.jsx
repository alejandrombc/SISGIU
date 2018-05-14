// Dependencies
import React, {Component} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome'
import classnames from 'classnames';
import SeccionContrasena from '../containers/perfil_seccionContrasena';
import SeccionGeneral from '../containers/perfil_seccionGeneral';
import SeccionFoto from '../containers/perfil_seccionFoto';
import { hide_alerts } from '../actions/moduloUsuarioAdministrador';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class PerfilUsuario extends Component{

  constructor(props) {
      super(props);
      this.state = {
              activeTab: '1',
          };

      this.toggle = this.toggle.bind(this);
  }



  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
    this.props.hide_alerts();
  }

  render(){
      return(
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                <FontAwesomeIcon name="user"/>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                <FontAwesomeIcon name="key"/>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '3' })}
                onClick={() => { this.toggle('3'); }}
              >
                <FontAwesomeIcon name="camera"/>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
                <SeccionGeneral />
            </TabPane>
            <TabPane tabId="2">
                <SeccionContrasena />
            </TabPane>
            <TabPane tabId="3">
                <SeccionFoto />
            </TabPane>
          </TabContent>
        </div>
      )
  }
}



const mapStateToProps = (state) => {
  return {
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    hide_alerts: hide_alerts,
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PerfilUsuario);


