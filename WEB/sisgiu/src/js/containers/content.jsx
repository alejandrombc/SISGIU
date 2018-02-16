//Dependencies
import React,{Component} from 'react';
import { connect } from 'react-redux';

//Components
import InicioEstudiante from './inicioEstudiante';
import InicioAdministrador from './inicioAdministrador';
import PerfilUsuario from '../components/perfilUsuario';
import ModuloUsuarioAdministrador from '../containers/moduloUsuarioAdministrador';


class Content extends Component{
	
	render(){
		var modulo = localStorage.getItem('modulo');
		return (
		      <div className="col-md-9">
		              <div className="profile-content">

		                
		                {this.props.pestana === "perfil" &&  
		                	<PerfilUsuario/>
		            	}

		            	{this.props.pestana === "inicio" && modulo === "estudiantes" &&
		                	<InicioEstudiante/>
		            	}

		            	{this.props.pestana === "inicio" && modulo === "docentes" &&
		                	<InicioEstudiante/>
		            	}


		            	{this.props.pestana === "inicio" && modulo === "administrativo" &&
		                	<InicioEstudiante/>
		            	}


		            	{this.props.pestana === "inicio" && modulo === "administradores" &&
		                	<InicioAdministrador/>
		            	}

		            	{this.props.pestana === "moduloUsuarioAdministrador" &&
		                	<ModuloUsuarioAdministrador/>
		            	}



		              </div>
		      </div>
		)
	}
}

const mapStateToProps = (state)=> {
	return{
		
	};	
}



export default connect(mapStateToProps)(Content);




