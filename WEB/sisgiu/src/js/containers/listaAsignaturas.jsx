// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Table, Row, Col } from 'reactstrap';
import SearchInput, {createFilter} from 'react-search-input';
import '../../css/moduloUsuarioAdministrador.css'; 
import {bindActionCreators} from 'redux';
// import { PulseLoader } from 'halogenium'; //Spinner

// Components
// import ModalUsuarioEdit from './modalUsuarioEdit';
// import ModalUsuarioDelete from './modalUsuarioDelete';
// import ModalUsuarioNew from './modalUsuarioNew';
import ModalAsignaturaNew from './Administrador/modalAsignaturaNew';
import {get_usuarios} from '../actions/moduloUsuarioAdministrador';
import {get_asignaturas} from '../actions/moduloAsignaturas';

// const KEYS_TO_FILTERS = ['user', 'subject', 'dest', 'otro'];
const KEYS_TO_FILTERS = ['codigo', 'nombre'];



class ListaAsignaturas extends Component{

  constructor(props) {
      super(props);
      this.state = {
        visible: true,
        searchTerm: '',
      }
      
      this.props.get_usuarios(this.props.tipo_usuario, false);
      this.props.get_asignaturas();

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

      console.log(this.props.adminUser);

      let listItems = '';
      if(this.props.adminUser.lista_asignaturas && this.props.adminUser.lista_asignaturas.length > 0)
      {
        let cant_asignaturas = this.props.adminUser.lista_asignaturas.length;
        let asignaturas = [];

        for (var i = 0; i < cant_asignaturas; i++) {
          asignaturas.push(this.props.adminUser.lista_asignaturas[i]);
        }

        const filteredAsignaturas = asignaturas.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        listItems = filteredAsignaturas.map((asignatura) =>
          <tr key={asignatura['codigo']}>
            <td>{asignatura['codigo']}</td>
            <td>{asignatura['nombre']}</td>
            <td>  
              <Row >
                <Col md={{ size: 'auto', offset: 3 }} className='botones'>
                  
                  {/*
                  <ModalUsuarioEdit usuario={asignatura} />
                  <ModalUsuarioDelete usuario={asignatura} />
                  */}
                </Col>
              </Row>
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
                  <ModalAsignaturaNew />
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
    token: state.activeUser,
    adminUser: state.adminUser,
  };
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({get_usuarios: get_usuarios, get_asignaturas: get_asignaturas}, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(ListaAsignaturas);


