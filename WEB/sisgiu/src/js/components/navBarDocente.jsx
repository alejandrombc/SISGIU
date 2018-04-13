// Dependencies
import React from 'react';
import {NavItem, NavLink, Nav } from 'reactstrap';
// Components

const NavBarDocente = () => (
  <Nav navbar >
                                
    <NavItem>
      <NavLink href="/inicio">Inicio</NavLink>
    </NavItem>

    <NavItem>
        <NavLink href="/cargarNotas">Cargar Notas</NavLink>
    </NavItem>

    <NavItem>
      <NavLink href="/programacionAcademica" disabled={!this.props.activeUser.cargado}>Programación Académica</NavLink>
    </NavItem>
    
    <NavItem>
      <NavLink href="/#">Constancias</NavLink>
    </NavItem>



  </Nav>
);

export default (NavBarDocente);

