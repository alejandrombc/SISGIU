//Dependencies
import React,{Component} from 'react';
import { connect } from 'react-redux';


//Components
import InicioEstudiante from './Estudiante/inicioEstudiante';
import InicioAdministrador from './Administrador/inicioAdministrador';
import InicioDocente from './Docente/inicioDocente';
import InicioAdministrativo from './Administrativo/inicioAdministrativo';
import PerfilUsuario from '../components/perfilUsuario';
import ModuloUsuarioAdministrador from './Administrador/moduloUsuarioAdministrador';
import ModuloAsignaturas from './Administrador/moduloAsignaturas';
import ModuloPeriodos from './Administrador/moduloPeriodos';
import HistorialAcademico from './Estudiante/historialAcademico';
import CargarNotas from './Docente/cargarNotas';
import Estudiantes from './Administrativo/estudiantes';
import ProgramacionAcademica from './programacionAcademica';
import HistorialAcademicoAdministrativo from './Administrativo/historialAcademico';



class Content extends Component{
	
	render(){
		var modulo = localStorage.getItem('modulo');
		return (
		      <div className="col-md-9" >
		              <div className="profile-content">

		                
		                {this.props.pestana === "perfil" &&  
		                	<PerfilUsuario/>
		            	}

		            	{this.props.pestana === "inicio" && modulo === "estudiantes" &&
		                	<InicioEstudiante/>
		            	}

		            	{this.props.pestana === "inicio" && modulo === "docentes" &&
		                	<InicioDocente/>
		            	}


		            	{this.props.pestana === "inicio" && modulo === "administrativo" &&
		                	<InicioAdministrativo/>
		            	}


		            	{this.props.pestana === "inicio" && modulo === "administradores" &&
		                	<InicioAdministrador/>
		            	}

		            	{this.props.pestana === "moduloUsuarioAdministrador" && modulo === "administradores" &&
		                	<ModuloUsuarioAdministrador/>
		            	}

		            	{this.props.pestana === "moduloAsignaturas" && modulo === "administradores" &&
		                	<ModuloAsignaturas/>
		            	}

		            	{this.props.pestana === "moduloPeriodos" && modulo === "administradores" &&
		                	<ModuloPeriodos/>
		            	} 

		            	{this.props.pestana === "historial" && modulo === "estudiantes"&&
		                	<HistorialAcademico/>
		            	} 

						{this.props.pestana === "historial" && modulo === "administrativo" &&
							<HistorialAcademicoAdministrativo />
						}
						
						{this.props.pestana === "programacionAcademica" &&
		                	<ProgramacionAcademica/>
		            	} 

		            	{this.props.pestana === "cargarNotas" && modulo === "docentes"&&
		                	<CargarNotas/>
		            	}

		            	{this.props.pestana === "estudiantes" && modulo === "administrativo"&&
		                	<Estudiantes/>
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




