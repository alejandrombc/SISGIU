// Dependencies
import React from 'react';
import {UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, NavItem, NavLink, Nav } from 'reactstrap';
// Components

const NavBarInicio = () => (

    <Nav className="ml-auto" navbar  >
      <UncontrolledDropdown nav>
        <DropdownToggle nav caret>
          Procesos
        </DropdownToggle>
        <DropdownMenu >
          <DropdownItem>
            Option 1
          </DropdownItem>
          <DropdownItem>
            Option 2
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            Reset
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
                      
                    
      <NavItem>
        <NavLink href="/información">Información</NavLink>
      </NavItem>
    </Nav>

);

export default (NavBarInicio);





