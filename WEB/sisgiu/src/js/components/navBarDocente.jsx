// Dependencies
import React from 'react';
import {NavItem, NavLink, Nav } from 'reactstrap';
// Components

const NavBarDocente = () => (
  <Nav navbar >
                                
    <NavItem>
      <NavLink href="/#">Inicio</NavLink>
    </NavItem>

    <NavItem>
        <NavLink href="/#">Cargar Notas</NavLink>
    </NavItem>

    <NavItem>
      <NavLink href="/#">Constancias</NavLink>
    </NavItem>


  </Nav>
);

export default (NavBarDocente);

