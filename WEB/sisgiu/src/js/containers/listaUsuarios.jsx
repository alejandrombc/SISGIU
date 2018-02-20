// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
import FontAwesomeIcon from 'react-fontawesome';
import { Table, Button, Row, Col } from 'reactstrap';
import SearchInput, {createFilter} from 'react-search-input';
import '../../css/moduloUsuarioAdministrador.css'; 
import {bindActionCreators} from 'redux';

//Spinner
// import { PulseLoader } from 'halogenium';

// Components
import ModalUsuarioEdit from './modalUsuarioEdit';
import {get_usuarios} from '../actions/moduloUsuarioAdministrador';

// const KEYS_TO_FILTERS = ['user', 'subject', 'dest', 'otro'];
const KEYS_TO_FILTERS = ['first_name', 'last_name', 'cedula'];



class ListaUsuarios extends Component{

  constructor(props) {
      super(props);
      this.state = {
        searchTerm: '',
      }

      console.log(this.props);

      this.props.get_usuarios(this.props.tipo_usuario);

      this.searchUpdated = this.searchUpdated.bind(this)
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }


  render(){

      let listItems = '';

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
            {/*<Button color="success" size='sm' data-toggle="tooltip" title="Editar"><FontAwesomeIcon name="edit"/></Button>*/}
          </td>
        </tr>
      );


      return(
  		<div>
            <br />
            <Row>
              <Col md='4'>
                <Button color="primary" size='sm' data-toggle="tooltip" title="Nuevo usuario"><FontAwesomeIcon name="plus"/></Button>
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


