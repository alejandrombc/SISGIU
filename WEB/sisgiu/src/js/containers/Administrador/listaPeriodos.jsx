// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Table, Row, Col } from 'reactstrap';
import SearchInput, {createFilter} from 'react-search-input';
import '../../../css/moduloUsuarioAdministrador.css'; 
import {bindActionCreators} from 'redux';
import { PulseLoader } from 'halogenium'; //Spinner

// Components
import ModalPeriodoNew from './modalPeriodoNew';
import ModalPeriodoEdit from './modalPeriodoEdit';
// import ModalPeriodoDelete from './modalPeriodoDelete';
// import ModalPeriodoLaunch from './modalPeriodoLaunch';
import {get_periodos} from '../../actions/moduloPeriodos';
import {get_tipo_postgrado} from '../../actions/moduloPeriodos';
import { get_estado_periodo} from '../../actions/moduloPeriodos';

import Paginacion from '../../components/pagination';

const KEYS_TO_FILTERS = ['id', 'tipo_postgrado'];
const periodos_por_pagina = 10;


class ListaPeriodos extends Component{

  constructor(props) {
      super(props);
      this.state = {
        visible: true,
        searchTerm: '',
        loading: false,
      }
      
      this.props.get_periodos(false);
      this.props.get_tipo_postgrado();
      this.props.get_estado_periodo();
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
      if(this.props.adminUser.lista_periodos && this.props.adminUser.lista_periodos.length > 0)
      {
        let cant_periodos = this.props.adminUser.lista_periodos.length;
        let periodos = [];

        var init = this.props.pagination.pagina*periodos_por_pagina-periodos_por_pagina;
        var end = this.props.pagination.pagina*periodos_por_pagina;


        //Si se esta realizando una busqueda uso toda la lista de periodos, sino no
        if(this.state.searchTerm === ''){
          
          for (var i = init; i < end; i++) {
            if (this.props.adminUser.lista_periodos[i]) {
              periodos.push(this.props.adminUser.lista_periodos[i]);
            }
          }

        } else {
          for (i = 0; i < cant_periodos; i++) {
            periodos.push(this.props.adminUser.lista_periodos[i]);
          }
        }

        

        const filteredPeriodos = periodos.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        listItems = filteredPeriodos.map((periodo) =>
          <tr key={periodo['id']}>
            <td>No iniciado</td>
            <td>{periodo['tipo_postgrado']}</td>
            <td>  
              <Row >
                <Col md={{ size: 'auto', offset: 3 }} className='botones'>
                  
                  <ModalPeriodoEdit onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading} periodo={periodo} />
                  
                  {/*
                  <ModalPeriodoDelete onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading} periodo={periodo} />
                  <ModalPeriodoLaunch onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading} periodo={periodo} />
                   */ }
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
                  <ModalPeriodoNew onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading}   /> 
                </Col>
                <Col md='8'>
                  <SearchInput className="searchBox" placeholder="Buscar periodo..." onChange={this.searchUpdated} />
                </Col>
              </Row>
              <br />
              <Col md='12' className='text-right'>
                
              </Col>
              <Table bordered hover responsive striped size="sm">
                <thead>
                  <tr>
                    <th>Periodo</th>
                    <th>Postgrado</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody className="tabla_usuarios">
                  {listItems}


                  
                </tbody>
              </Table>

              <Row >
                <Col lg='4' md='4' sm='3' xs='1'> </Col>
                <Col lg='4' md='4' sm='6' xs='10'>
                  <br />
                  {this.state.searchTerm === '' &&
                    <Paginacion cant_usuarios={cant_periodos} item_por_pagina={periodos_por_pagina}/>
                  }
                </Col>
                <Col lg='4' md='4' sm='3' xs='1'> </Col>
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
                <h4>No existe ningún periodo guardado</h4>
                </center>
              </Col>
            </Row>

            <Row>
              <Col md='12'>
                <ModalPeriodoNew onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading}/>
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
  return bindActionCreators({
    get_tipo_postgrado: get_tipo_postgrado, 
    get_periodos: get_periodos,
    get_estado_periodo: get_estado_periodo,
  }, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(ListaPeriodos);

