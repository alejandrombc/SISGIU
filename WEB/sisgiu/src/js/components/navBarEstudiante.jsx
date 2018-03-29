// Dependencies
import React, {Component} from 'react';
import {NavItem, NavLink, Nav } from 'reactstrap';
import { connect } from 'react-redux';


class NavBarEstudiante extends Component{

  render() {
    
      return (
        <Nav navbar >
          <NavItem>
            <NavLink href="inicio" disabled={!this.props.estudianteUser.cargado}>Inicio</NavLink>
          </NavItem>

          <NavItem>
              <NavLink href="/historial" disabled={!this.props.estudianteUser.cargado}>Historial Académico</NavLink>
          </NavItem>

          <NavItem>
            <NavLink href="/#" disabled={!this.props.estudianteUser.cargado}>Constancias</NavLink>
          </NavItem>

        {/*
          <NavItem>
            <NavLink href="/#">Trámites</NavLink>
          </NavItem>
        */}

        </Nav>

      )

  }

}



const mapStateToProps = (state)=> {
  return{
    estudianteUser: state.estudianteUser,
  };
}



export default connect(mapStateToProps)(NavBarEstudiante);
