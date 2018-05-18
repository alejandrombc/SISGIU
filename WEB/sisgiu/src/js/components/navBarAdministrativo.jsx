// Dependencies
import React, { Component } from 'react';
import { NavItem, NavLink, Nav } from 'reactstrap';
import { connect } from 'react-redux';

class NavBarAdministrativo extends Component {

  render() {

    return (
      <Nav navbar >

        <NavItem>
          <NavLink href="/inicio" disabled={!this.props.activeUser.cargado}>Inicio</NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/inscripciones" disabled={!this.props.activeUser.cargado}>Inscripciones</NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/usuarios" disabled={!this.props.activeUser.cargado}>Usuarios</NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/programacionAcademica" disabled={!this.props.activeUser.cargado}>Programación Académica</NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/reportes" disabled={!this.props.activeUser.cargado}>Reportes</NavLink>
        </NavItem>



      </Nav>

    )

  }

}



const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser,
  };
}



export default connect(mapStateToProps)(NavBarAdministrativo);
