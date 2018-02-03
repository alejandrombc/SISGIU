// Dependencies
import React from 'react';
import {NavItem, NavLink, Nav } from 'reactstrap';
// Components

const NavBarAdministrativo = () => (
  <Nav navbar >
                                
    <NavItem>
      <NavLink href="/#">Inicio</NavLink>
    </NavItem>

    <NavItem>
        <NavLink href="/#">Trámites</NavLink>
    </NavItem>

    <NavItem>
      <NavLink href="/#">Estudiantes</NavLink>
    </NavItem>

    <NavItem>
      <NavLink href="/#">Perfil</NavLink>
    </NavItem>

  </Nav>
);

export default (NavBarAdministrativo);

