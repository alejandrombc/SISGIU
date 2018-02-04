// Dependencies
import React, {Component} from 'react';


class CerrarSesion extends Component {
  constructor(props) {
    super(props);
  }


  logout() {
    localStorage.removeItem('user_token');
    // DEBERIA CAMBIAR ESTO POR ALGO RELACIONADO A REACT-ROUTER-DOM
    window.location.reload();
  }

  render() {
  	return (
	  	<div>
	    	<a onClick={this.logout} href='#' >Cerrar Sesión</a>
	  	</div>

    );
  }
}

export default CerrarSesion;