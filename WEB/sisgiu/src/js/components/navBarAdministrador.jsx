// Dependencies
import React, {Component} from 'react';
import {NavItem, NavLink, Nav } from 'reactstrap';
import { connect } from 'react-redux';

// Components

class NavBarAdministrador extends Component{

  render() {
    
      return (
        <Nav navbar >                
          <NavItem>
            <NavLink href="/inicio" disabled={!this.props.activeUser.cargado}>Inicio</NavLink>
          </NavItem>
        {/*
          <NavItem>
              <NavLink href="/#" disabled={!this.props.activeUser.cargado}>Trámites</NavLink>
          </NavItem>
        */}
          <NavItem>
            <NavLink href="/moduloUsuarioAdministrador" disabled={!this.props.activeUser.cargado}>Usuarios</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/moduloAsignaturas" disabled={!this.props.activeUser.cargado}>Asignaturas</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/moduloPeriodos" disabled={!this.props.activeUser.cargado}>Periodos</NavLink>
          </NavItem>
        </Nav>

      )

  }

}



const mapStateToProps = (state)=> {
  return{
    activeUser: state.activeUser,
  };
}



export default connect(mapStateToProps)(NavBarAdministrador);





