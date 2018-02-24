// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Table, Row, Col } from 'reactstrap';
import SearchInput, {createFilter} from 'react-search-input';
import '../../css/moduloUsuarioAdministrador.css'; 
import {bindActionCreators} from 'redux';
// import { PulseLoader } from 'halogenium'; //Spinner

// Components
import ModalUsuarioEdit from './modalUsuarioEdit';
import ModalUsuarioNew from './modalUsuarioNew';
import {get_usuarios} from '../actions/moduloUsuarioAdministrador';

// const KEYS_TO_FILTERS = ['user', 'subject', 'dest', 'otro'];
const KEYS_TO_FILTERS = ['first_name', 'last_name', 'cedula'];



class ListaUsuarios extends Component{

  constructor(props) {
      super(props);
      this.state = {
        visible: true,
        searchTerm: '',
      }
      
      console.log(this.props);

      this.props.get_usuarios(this.props.tipo_usuario, false);
      this.onDismiss = this.onDismiss.bind(this);
      this.searchUpdated = this.searchUpdated.bind(this)
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  render(){


      let listItems = '';
      if(this.props.adminUser.lista_usuarios && this.props.adminUser.lista_usuarios.length > 0){
        let cant_usuarios = this.props.adminUser.lista_usuarios.length;
        let usuarios = [];

        for (var i = 0; i < cant_usuarios; i++) {
          usuarios.push(this.props.adminUser.lista_usuarios[i]);
        }

        const filteredUsuarios = usuarios.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        listItems = filteredUsuarios.map((usuario) =>
          <tr key={usuario['cedula']}>
            <td>{usuario['cedula']}</td>
            <td>{usuario['first_name']} {usuario['last_name']}</td>
            <td>  
              <ModalUsuarioEdit usuario={usuario} tipo_usuario={this.props.tipo_usuario}/>
            </td>
          </tr>
        );




        return(
    		<div>
              <br />
              {this.props.adminUser['edit'] &&
                <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                    Datos actualizados exitosamente
                </Alert> 
              }
              {this.props.adminUser['bad_input'] === true &&
                  <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                      Ha ocurrido un error
                  </Alert>
              }
              <Row>
                <Col md='4'>
                  <ModalUsuarioNew tipo_usuario={this.props.tipo_usuario}/>
                </Col>
                <Col md='8'>
                  <SearchInput className="searchBox" placeholder="Buscar usuario..." onChange={this.searchUpdated} />
                </Col>
              </Row>
              <br />
              <Col md='12' className='text-right'>
                
              </Col>
              <Table bordered hover responsive striped size="sm">
                <thead>
                  <tr>
                    <th>Cédula</th>
                    <th>Nombre</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody className="tabla_usuarios">
                  {listItems}


                  
                </tbody>
              </Table>

      	</div>
        )
    }else{
      return (
          <div>
            <br/>
            <Row>
              <Col md='12'>
                <center>
                <h4>No existe ningún usuario perteneciente a este módulo.</h4>
                </center>
              </Col>
            </Row>

            <Row>
              <Col md='12'>
                <ModalUsuarioNew tipo_usuario={this.props.tipo_usuario}/>
              </Col>
            </Row>

          </div>
        )
    }
  }
}


const mapStateToProps = (state)=> {
  return{
    token: state.activeUser,
    adminUser: state.adminUser,
  };
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({get_usuarios: get_usuarios}, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(ListaUsuarios);


