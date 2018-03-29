// Dependencies
import React, {Component} from 'react';
import {NavItem, NavLink, Nav } from 'reactstrap';
import { connect } from 'react-redux';

// Components

class NavBarAdministrador extends Component{

  render() {
    
    let todo_cargado = (this.props.adminUser.cargado || (this.props.adminUser.cargado_estado_estudiante && this.props.adminUser.cargado_tipo_postgrado) );

      return (
        <Nav navbar >                
          <NavItem>
            <NavLink href="/inicio" disabled={!todo_cargado}>Inicio</NavLink>
          </NavItem>

          <NavItem>
              <NavLink href="/#" disabled={!todo_cargado}>Trámites</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/moduloUsuarioAdministrador" disabled={!todo_cargado}>Usuarios</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/moduloAsignaturas" disabled={!todo_cargado}>Asignaturas</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/moduloPeriodos" disabled={!todo_cargado}>Periodos</NavLink>
          </NavItem>
        </Nav>

      )

  }

}



const mapStateToProps = (state)=> {
  return{
    adminUser: state.adminUser,
  };
}



export default connect(mapStateToProps)(NavBarAdministrador);





