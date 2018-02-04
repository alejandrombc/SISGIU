//Dependencies
import React,{Component} from 'react';

//Components
import InicioEstudiante from './inicioEstudiante';


class Content extends Component{

	render(){
		return (
		      <div className="col-md-9">
		              <div className="profile-content">
		                <InicioEstudiante />
		              </div>
		      </div>
		)
	}
}


export default (Content);




