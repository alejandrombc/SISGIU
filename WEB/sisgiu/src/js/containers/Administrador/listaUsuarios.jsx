//listaUsuarios.jsx

// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Table, Row, Col } from 'reactstrap';
import SearchInput, {createFilter} from 'react-search-input';
import '../../../css/moduloUsuarioAdministrador.css'; 
import {bindActionCreators} from 'redux';
import { PulseLoader } from 'halogenium'; //Spinner

// Components
import ModalUsuarioEdit from './modalUsuarioEdit';
import ModalUsuarioDelete from './modalUsuarioDelete';
import ModalUsuarioNew from './modalUsuarioNew';
import {get_usuarios} from '../../actions/moduloUsuarioAdministrador';
import Paginacion from '../../components/pagination';

import { get_tipo_postgrado } from '../../actions/moduloAsignaturas';  
import { get_estado_estudiante } from '../../actions/moduloUsuarioAdministrador';
import { cargado } from '../../actions/inicio';


const KEYS_TO_FILTERS = ['first_name', 'last_name', 'cedula'];
const usuarios_por_pagina = 10;


class ListaUsuarios extends Component{

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      searchTerm: '',
      loading: false
    }
    
    this.updateLoading = this.updateLoading.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false, loading: false});
    this.props.adminUser['edit'] = false;
  }

  componentDidMount() {
    this.props.get_usuarios(this.props.tipo_usuario, false)
    .then( ()=> this.props.get_tipo_postgrado()
      .then( () => this.props.get_estado_estudiante()
        .then( () => this.props.cargado() )
    ));
    
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  componentWillReceiveProps(props) { 
    this.setState({"visible":true});
  }

  updateLoading(){
    this.setState({"loading":!this.state.loading});
  }



  render(){
    if (!this.props.activeUser.cargado) {
        return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>);
    } else {
      let listItems = '';
      if(this.props.adminUser.lista_usuarios && this.props.adminUser.lista_usuarios.length > 0){
        let cant_usuarios = this.props.adminUser.lista_usuarios.length;
        let usuarios = [];

        var init = this.props.pagination.pagina*usuarios_por_pagina-usuarios_por_pagina;
        var end = this.props.pagination.pagina*usuarios_por_pagina;

        //Si se esta realizando una busqueda uso toda la lista de usuario, sino no
        if(this.state.searchTerm === ''){
          
          for (var i = init; i < end; i++) {
            if (this.props.adminUser.lista_usuarios[i]) {
              usuarios.push(this.props.adminUser.lista_usuarios[i]);
              
            }
          }

        } else {
          for (i = 0; i < cant_usuarios; i++) {
              usuarios.push(this.props.adminUser.lista_usuarios[i]);
          }
        }




        const filteredUsuarios = usuarios.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        listItems = filteredUsuarios.map((usuario) =>
          <tr key={usuario['cedula']}>
            <td>{usuario['cedula']}</td>
            <td>{usuario['first_name']} {usuario['last_name']}</td>
            <td>  
              <Row >
                <Col md={{ size: 'auto', offset: 3 }} className='botones'>
                  <ModalUsuarioEdit onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading} usuario={usuario} is_disabled={false} tipo_usuario={this.props.tipo_usuario} />
                  <ModalUsuarioDelete onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading} usuario={usuario} tipo_usuario={this.props.tipo_usuario}/>
                </Col>
              </Row>
            </td>
          </tr>
        );


        return(
        <div>
              <br />
              {this.state.loading && !this.props.adminUser.edit && !this.props.adminUser.bad_input && !this.props.adminUser.create && !this.props.adminUser.error_docente_tipo_postgrado &&
                <center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
              }
              {this.props.adminUser.create &&
                <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                    Usuario creado exitosamente
                </Alert> 
              }
              {this.props.adminUser.edit &&
                <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                    Operación realizada exitosamente
                </Alert> 
              }
              {this.props.adminUser.bad_input === true &&
                  <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                      Ha ocurrido un error
                  </Alert>
              }
              {this.props.adminUser.error_docente_tipo_postgrado === true &&
                  <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                      Ya existe un coordinador del tipo de postgrado seleccionado
                  </Alert>
              }
              <Row>
                <Col md='4'>
                  <ModalUsuarioNew onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading} tipo_usuario={this.props.tipo_usuario} visible={this.state.visible}/>
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
                    <th>Cédula o Pasaporte</th>
                    <th>Nombre</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody className="tabla_usuarios">
                  {listItems}


                  
                </tbody>
              </Table>

              <Row >
                <Col lg='4' md='4' sm='3' xs='1'> </Col>
                <Col lg='4' md='4' sm='6' xs='10' className='Pagination'>
                  <br />
                  {this.state.searchTerm === '' &&
                    <Paginacion cant_items={cant_usuarios} item_por_pagina={usuarios_por_pagina}/>
                  }
                </Col>
                <Col lg='4' md='4' sm='3' xs='1'> </Col>
              </Row>
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
                  <ModalUsuarioNew onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading} tipo_usuario={this.props.tipo_usuario} visible={this.state.visible}/>
                </Col>
              </Row>

            </div>
          )
      }
    }
  }
}


const mapStateToProps = (state)=> {
  return{
    adminUser: state.adminUser,
    pagination: state.paginacion,
    activeUser: state.activeUser
  };
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    get_usuarios: get_usuarios,
    get_tipo_postgrado: get_tipo_postgrado,
    get_estado_estudiante: get_estado_estudiante,
    cargado: cargado,
  }, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(ListaUsuarios);


