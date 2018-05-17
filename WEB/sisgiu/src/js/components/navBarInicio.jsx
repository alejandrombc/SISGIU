// Dependencies
import React, { Component } from 'react';
import { NavItem, NavLink, Nav } from 'reactstrap';



class NavBarInicio extends Component {

  render() {

    return (
      <Nav className="ml-auto" navbar >
        <NavItem>
          <NavLink href="/creditos">Créditos</NavLink>
        </NavItem>

      </Nav>

    )

  }

}


export default (NavBarInicio);
