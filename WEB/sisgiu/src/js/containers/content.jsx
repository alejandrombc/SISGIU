//Dependencies
import React,{Component} from 'react';
import { connect } from 'react-redux';

//Components
import InicioEstudiante from './Estudiante/inicioEstudiante';
import InicioAdministrador from './Administrador/inicioAdministrador';
import PerfilUsuario from '../components/perfilUsuario';
import ModuloUsuarioAdministrador from './Administrador/moduloUsuarioAdministrador';
import ModuloAsignaturas from './Administrador/moduloAsignaturas';
import ModuloPeriodos from './Administrador/moduloPeriodos';
import HistorialAcademico from './Estudiante/historialAcademico';



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

		            	{this.props.pestana === "moduloAsignaturas" &&
		                	<ModuloAsignaturas/>
		            	}

		            	{this.props.pestana === "moduloPeriodos" &&
		                	<ModuloPeriodos/>
		            	} 

		            	{this.props.pestana === "historial" &&
		                	<HistorialAcademico/>
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




