// Dependencies
import React, {Component} from 'react';
import {NavItem, NavLink, Nav } from 'reactstrap';
import { connect } from 'react-redux';

// Components

class NavBarAdministrador extends Component{

  render() {
    if (this.props.adminUser.cargado || (this.props.adminUser.cargado_estado_estudiante && this.props.adminUser.cargado_tipo_postgrado) ) {
      return (
        <Nav navbar >                
          <NavItem>
            <NavLink href="/inicio">Inicio</NavLink>
          </NavItem>

          <NavItem>
              <NavLink href="/#">Trámites</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/moduloUsuarioAdministrador">Usuarios</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/moduloAsignaturas">Asignaturas</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/moduloPeriodos">Periodos</NavLink>
          </NavItem>

        </Nav>
      )
    } else {
      return (
        <Nav navbar >                
          <NavItem>
            <NavLink href="/inicio" disabled>Inicio</NavLink>
          </NavItem>

          <NavItem>
              <NavLink href="/#" disabled>Trámites</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/moduloUsuarioAdministrador" disabled>Usuarios</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/moduloAsignaturas" disabled>Asignaturas</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/#" disabled>Periodos</NavLink>
          </NavItem>
        </Nav>

      )
    }



  }

}



const mapStateToProps = (state)=> {
  return{
    adminUser: state.adminUser,
  };
}



export default connect(mapStateToProps)(NavBarAdministrador);





