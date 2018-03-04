// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Table, Row, Col } from 'reactstrap';
import SearchInput, {createFilter} from 'react-search-input';
import '../../../css/moduloUsuarioAdministrador.css'; 
import {bindActionCreators} from 'redux';
import { PulseLoader } from 'halogenium'; //Spinner

// Components
import ModalAsignaturaNew from './modalAsignaturaNew';
import ModalAsignaturaEdit from './modalAsignaturaEdit';
import ModalAsignaturaDelete from './modalAsignaturaDelete';
import {get_usuarios} from '../../actions/moduloUsuarioAdministrador';
import {get_asignaturas} from '../../actions/moduloAsignaturas';
import Paginacion from '../../components/pagination';

const KEYS_TO_FILTERS = ['codigo', 'nombre'];
const asignaturas_por_pagina = 10;


class ListaAsignaturas extends Component{

  constructor(props) {
      super(props);
      this.state = {
        visible: true,
        searchTerm: '',
        loading: false,
      }
      
      this.props.get_usuarios(this.props.tipo_usuario, false);
      this.props.get_asignaturas(false);
      this.updateLoading = this.updateLoading.bind(this);
      this.onDismiss = this.onDismiss.bind(this);
      this.searchUpdated = this.searchUpdated.bind(this)
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



  render(){

      let listItems = '';
      if(this.props.adminUser.lista_asignaturas && this.props.adminUser.lista_asignaturas.length > 0)
      {
        let cant_asignaturas = this.props.adminUser.lista_asignaturas.length;
        let asignaturas = [];

        var init = this.props.pagination.pagina*asignaturas_por_pagina-asignaturas_por_pagina;
        var end = this.props.pagination.pagina*asignaturas_por_pagina;


        //Si se esta realizando una busqueda uso toda la lista de asignaturas, sino no
        if(this.state.searchTerm === ''){
          
          for (var i = init; i < end; i++) {
            if (this.props.adminUser.lista_asignaturas[i]) {
              asignaturas.push(this.props.adminUser.lista_asignaturas[i]);
            }
          }

        } else {
          for (i = 0; i < cant_asignaturas; i++) {
            asignaturas.push(this.props.adminUser.lista_asignaturas[i]);
          }
        }

        

        const filteredAsignaturas = asignaturas.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        listItems = filteredAsignaturas.map((asignatura) =>
          <tr key={asignatura['codigo']}>
            <td>{asignatura['codigo']}</td>
            <td>{asignatura['nombre']}</td>
            <td>  
              <Row >
                <Col md={{ size: 'auto', offset: 3 }} className='botones'>
                  
                  <ModalAsignaturaEdit onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading} asignatura={asignatura} />
                  <ModalAsignaturaDelete onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading} asignatura={asignatura} />

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
                  <ModalAsignaturaNew onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading}  />
                </Col>
                <Col md='8'>
                  <SearchInput className="searchBox" placeholder="Buscar asignatura..." onChange={this.searchUpdated} />
                </Col>
              </Row>
              <br />
              <Col md='12' className='text-right'>
                
              </Col>
              <Table bordered hover responsive striped size="sm">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody className="tabla_usuarios">
                  {listItems}


                  
                </tbody>
              </Table>

              <Row >
                <Col md='12' sm='12' xs='12'>
                  <Paginacion cant_usuarios={cant_asignaturas} item_por_pagina={asignaturas_por_pagina}/>
                </Col>
              </Row>

      	</div>
        )
      } else {
        return (
          <div>
            <br/>
            <Row>
              <Col md='12'>
                <center>
                <h4>No existe ninguna asignatura creada</h4>
                </center>
              </Col>
            </Row>

            <Row>
              <Col md='12'>
              {/*
                <ModalUsuarioNew tipo_usuario={this.props.tipo_usuario}/>
              */}
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
    pagination: state.paginacion,
  };
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({get_usuarios: get_usuarios, get_asignaturas: get_asignaturas}, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(ListaAsignaturas);


