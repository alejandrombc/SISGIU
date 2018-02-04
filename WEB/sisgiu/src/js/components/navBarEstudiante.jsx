// Dependencies
import React from 'react';
import {NavItem, NavLink, Nav } from 'reactstrap';
// Components

const NavBarEstudiante = () => (
  <Nav navbar >
                                
    <NavItem>
      <NavLink href="/#">Inicio</NavLink>
    </NavItem>

    <NavItem>
        <NavLink href="/#">Historial Académico</NavLink>
    </NavItem>

    <NavItem>
      <NavLink href="/#">Constancias</NavLink>
    </NavItem>

    <NavItem>
      <NavLink href="/#">Trámites</NavLink>
    </NavItem>

  </Nav>
);

export default (NavBarEstudiante);

