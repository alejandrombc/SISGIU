// Dependencies
import React from 'react';
import {NavItem, NavLink, Nav } from 'reactstrap';
// Components

const NavBarAdministrador = () => (
  <Nav navbar >
                                
    <NavItem>
      <NavLink href="/#">Inicio</NavLink>
    </NavItem>

    <NavItem>
        <NavLink href="/#">Trámites</NavLink>
    </NavItem>

    <NavItem>
      <NavLink href="/#">Usuarios</NavLink>
    </NavItem>

    <NavItem>
      <NavLink href="/#">Asignaturas</NavLink>
    </NavItem>

    <NavItem>
      <NavLink href="/#">Periodos</NavLink>
    </NavItem>

    <NavItem>
      <NavLink href="/#">Perfil</NavLink>
    </NavItem>

  </Nav>
);

export default (NavBarAdministrador);

