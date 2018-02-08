//Dependencies
import React,{Component} from 'react';
import { connect } from 'react-redux';

//Components
import InicioEstudiante from './inicioEstudiante';
import PerfilUsuario from '../containers/perfilUsuario';


class Content extends Component{

	render(){
		return (
		      <div className="col-md-9">
		              <div className="profile-content">

		                
		                {this.props.pestana == "perfil" &&
		                	<PerfilUsuario/>
		            	}

		            	{this.props.pestana == "inicio" &&
		                	<InicioEstudiante/>
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




