// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Table, Row, Col, PaginationLink ,PaginationItem,Pagination } from 'reactstrap';
import SearchInput, {createFilter} from 'react-search-input';
import '../../../css/moduloUsuarioAdministrador.css'; 
import {bindActionCreators} from 'redux';
import { PulseLoader } from 'halogenium'; //Spinner

// Components
import ModalUsuarioEdit from './modalUsuarioEdit';
import ModalUsuarioDelete from './modalUsuarioDelete';
import ModalUsuarioNew from './modalUsuarioNew';
import {get_usuarios} from '../../actions/moduloUsuarioAdministrador';

const KEYS_TO_FILTERS = ['first_name', 'last_name', 'cedula'];



class ListaUsuarios extends Component{

  constructor(props) {
      super(props);
      this.state = {
        visible: true,
        searchTerm: '',
        loading: false,
        activePage: 1,
        firstPage: true,
        lastPage: false
      }
      
      this.updateLoading = this.updateLoading.bind(this);
      this.props.get_usuarios(this.props.tipo_usuario, false);
      this.onDismiss = this.onDismiss.bind(this);
      this.searchUpdated = this.searchUpdated.bind(this);
      this.handlePage = this.handlePage.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false, loading: false});
    this.props.adminUser['edit'] = false;
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

  //Manejo de pagina
  handlePage(page, total){
    this.setState({activePage: page, firstPage: false, lastPage: false});
    if(page === 1){ this.setState({firstPage: true}); }
    if(page === total){ this.setState({lastPage: true}); }
    
  }

  render(){


      let listItems = '';
      if(this.props.adminUser.lista_usuarios && this.props.adminUser.lista_usuarios.length > 0){
        let cant_usuarios = this.props.adminUser.lista_usuarios.length;
        let usuarios = []; let usuarios_by_page = [];
        let pages = []; let count_pages = 0;
        let user_per_page = 2;
        let list_init = (this.state.activePage-1)*user_per_page;
        let list_end = ((this.state.activePage-1)*user_per_page)+user_per_page;
        let filteredUsuarios;

        //Colocar todos los usuarios en el arreglo
        for (var i = 0; i < cant_usuarios; i++) {
          usuarios.push(this.props.adminUser.lista_usuarios[i]);
        }

        //"Cortar" segun la pagina actual y el total por pagina
        usuarios_by_page = usuarios.slice(list_init,list_end);

        //Si se esta realizando una busqueda uso toda la lista de usuario, sino no
        if(this.state.searchTerm === ''){
          for(i = 0; i < (cant_usuarios/user_per_page); i++){
            count_pages++; 
            pages.push(count_pages); 
          }
          filteredUsuarios = usuarios_by_page.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        }else{
          //Solo una pagina para la busqueda
          count_pages++; 
          pages.push(count_pages);
          filteredUsuarios = usuarios.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
        }

        listItems = filteredUsuarios.map((usuario) =>
          <tr key={usuario['cedula']}>
            <td>{usuario['cedula']}</td>
            <td>{usuario['first_name']} {usuario['last_name']}</td>
            <td>  
              <Row >
                <Col md={{ size: 'auto', offset: 3 }} className='botones'>
                  <ModalUsuarioEdit onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading} usuario={usuario} tipo_usuario={this.props.tipo_usuario} />
                  <ModalUsuarioDelete onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading} usuario={usuario} tipo_usuario={this.props.tipo_usuario}/>
                </Col>
              </Row>
            </td>
          </tr>
        );

        return(
    		<div>
              <br />
              {this.state.loading && !this.props.adminUser['edit'] && !this.props.adminUser['bad_input'] &&

                <center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>

              }

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
                    <th>Cédula</th>
                    <th>Nombre</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody className="tabla_usuarios">
                  {listItems}
                </tbody>
              </Table>
              <br />
              <Row>
                <Col sm="4"></Col>
                <Col sm="4">
                  {/*Recorrido por cada pagina que se tenga en el arreglo (primera y ultima son las flechas)*/}
                  <Pagination className="list-inline text-center">
                    <PaginationItem onClick={() => this.handlePage(1,count_pages)} disabled={this.state.firstPage}>
                      <PaginationLink previous href="#" />
                    </PaginationItem>
                    {pages
                        .map((page,key) => {
                            return this.state.activePage === page ?
                                <PaginationItem key={key} active>
                                  <PaginationLink onClick={() => this.handlePage(page, count_pages)} href="#">
                                      {page}
                                  </PaginationLink>
                                </PaginationItem>
                            :
                                <PaginationItem key={key}>
                                  <PaginationLink onClick={() => this.handlePage(page, count_pages)} href="#">
                                      {page}
                                  </PaginationLink>
                                </PaginationItem>
                        }
                      )}
                    <PaginationItem onClick={() => this.handlePage(count_pages, count_pages)} disabled={this.state.lastPage}>
                      <PaginationLink next href="#" />
                    </PaginationItem>
                  </Pagination>
              </Col>
              <Col sm="4"></Col>
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
    adminUser: state.adminUser,
  };
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({get_usuarios: get_usuarios}, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(ListaUsuarios);

