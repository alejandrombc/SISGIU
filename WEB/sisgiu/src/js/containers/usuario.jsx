// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {logout} from '../actions/logout.jsx';
import '../../css/usuario.css'; 
import { Link } from 'react-router-dom'
import { cambiarPestana } from '../actions/cambiarPestana';


// Components
//import CerrarSesion from './cerrarSesion';

class Usuario extends Component{

  constructor(props){
    super(props);
  }

  render(){
      var user = this.props.token['user'];
      var nombre = user.usuario.first_name + ' ' + user.usuario.last_name;
      var modulo = this.props.token['modulo'];
      if(modulo === "estudiantes"){
        modulo = "Módulo Estudiante";
      }else if(modulo === "docentes"){
        modulo = "Módulo Docente";
      }else if(modulo === "administrativo"){
        modulo = "Módulo Administrativo";
      }else if(modulo === "usuarios"){
        modulo = "Módulo Administrador";
      }

      return (
          <div className="col-md-3">
            <div className="profile-sidebar">
              <div className="profile-userpic">
                <center><img src={user['usuario']['foto']} className="img-responsive" alt="" /></center>
              </div>
              <div className="profile-usertitle">
                <div className="profile-usertitle-name">
                  {nombre}
                </div>
                <div className="profile-usertitle-job">
                  V-{user['usuario']['cedula']}
                </div>
                <div className="profile-usertitle-job">
                  {modulo}
                </div>
              </div>
              <div className="profile-userbuttons">
                <Link to="perfil"><button onClick={this.props.cambiarPestana} type="button" className="btn btn-success btn-sm">Perfil</button></Link>
                <button onClick={this.props.logout} type="button" className="btn btn-danger btn-sm">Cerrar Sesión</button>
              </div>
            </div>
          </div>
      )
  }
}


const mapStateToProps = (state)=> {
  return{
    token: state.activeUser
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({logout: logout, cambiarPestana: cambiarPestana}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(Usuario);


