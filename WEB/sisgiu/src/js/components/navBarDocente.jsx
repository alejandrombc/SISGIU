// Dependencies
import React, { Component } from 'react';
import {NavItem, NavLink, Nav } from 'reactstrap';
import { connect } from 'react-redux';



class NavBarDocente extends Component {

  render() {

    return (
      <Nav navbar >

        <NavItem>
          <NavLink href="/inicio" disabled={!this.props.activeUser.cargado} >Inicio</NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/cargarNotas" disabled={!this.props.activeUser.cargado} >Cargar Notas</NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/programacionAcademica" disabled={!this.props.activeUser.cargado}>Programación Académica</NavLink>
        </NavItem>

        <NavItem>
          <NavLink href="/#" disabled={!this.props.activeUser.cargado} >Constancias</NavLink>
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



export default connect(mapStateToProps)(NavBarDocente);
