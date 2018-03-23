// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Table, Row, Col, Button } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import SearchInput, {createFilter} from 'react-search-input';
import '../../../css/moduloUsuarioAdministrador.css'; 
import {bindActionCreators} from 'redux';
import { PulseLoader } from 'halogenium'; //Spinner
import ConfirmButton from 'react-confirm-button';

// Components
import ModalPeriodoNew from './modalPeriodoNew';
import PeriodoEdit from './periodoEdit';
import {get_periodos} from '../../actions/moduloPeriodos';
import {get_tipo_postgrado} from '../../actions/moduloPeriodos';
import { get_estado_periodo} from '../../actions/moduloPeriodos';
import { get_docente_asignatura } from '../../actions/moduloPeriodos';
import { get_asignaturas } from '../../actions/moduloAsignaturas';
import {get_usuarios} from '../../actions/moduloUsuarioAdministrador';
import { eliminar_periodo, activar_periodo } from '../../actions/moduloPeriodos';


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
        editando_periodo: 1,
        periodo: "",
        docente_asignatura: "",
        asignaturas: "",
        tipo_postgrado: ""
      }
      
      this.props.get_docente_asignatura("all");
      this.props.get_periodos(false);
      this.props.get_usuarios("docentes", false);
      this.props.get_tipo_postgrado();
      this.props.get_estado_periodo();
      this.props.get_asignaturas();
      this.updateLoading = this.updateLoading.bind(this);
      this.onDismiss = this.onDismiss.bind(this);
      this.searchUpdated = this.searchUpdated.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.volverPasoAnterior = this.volverPasoAnterior.bind(this);
      this.siguientePaso = this.siguientePaso.bind(this);
      this.ordenarLista = this.ordenarLista.bind(this);
      this.volverPrimerPaso = this.volverPrimerPaso.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false, loading: false});
    this.props.adminUser['edit'] = false;
  }

  searchUpdated (term) {
    this.setState({searchTerm: term});
  }

  componentWillReceiveProps(props) { 
    this.setState({"visible":true});
  }

  updateLoading(){
    this.setState({"loading":!this.state.loading});
  }

  volverPasoAnterior() {
    this.setState({editando_periodo: this.state.editando_periodo-1});
  }

  volverPrimerPaso() {
    this.setState({editando_periodo: 1});
  }

  eliminar_periodo(periodo_id){
    this.setState({"loading":!this.state.loading});
    this.props.eliminar_periodo(periodo_id);
    this.setState({"loading":!this.state.loading});
  }


  activar_periodo(periodo_id){
    this.setState({"loading":!this.state.loading});
    this.props.activar_periodo(periodo_id);
    this.setState({"loading":!this.state.loading});
  }

  siguientePaso() {
    this.setState({editando_periodo: this.state.editando_periodo+1});
  }

  handleChange(periodo, docente_asignatura, asignaturas, tipo_postgrado){
    this.setState({
      periodo: periodo,
      docente_asignatura: docente_asignatura,
      asignaturas: asignaturas,
      tipo_postgrado: tipo_postgrado,
      editando_periodo: 2
    });
  }

  ordenarLista() {
    if (this.state.docente_asignatura) {
      let lista_codigos_asignaturas = [];
      
      let N = this.state.docente_asignatura.length;

      // Busco todos los codigos de asignaturas de docente_asignatura
      for (var i = 0; i < N; i++) {
        // si el codigo existe ya en lista_codigos_asignaturas no lo vuelvo a agregar
        if ( !lista_codigos_asignaturas.includes(this.state.docente_asignatura[i]['asignatura']['codigo']) ) {
          lista_codigos_asignaturas.push( this.state.docente_asignatura[i]['asignatura']['codigo'] );
        }

      }

      N = lista_codigos_asignaturas.length;
      let docente_asignatura_ordenado = [];

      let M = this.state.docente_asignatura.length;

      // Voy buscando en todo el arreglo de docente_asignatura y voy agregando los campos en otro arreglo pero CODIGO POR CODIGO para que este ordenado
      for (i = 0; i < N; i++) {
        
        for (var j = 0; j < M; j++) {
          if(this.state.docente_asignatura[j].asignatura.codigo === lista_codigos_asignaturas[i]){
            docente_asignatura_ordenado.push(this.state.docente_asignatura[j]);
          }
        }

      }

      return docente_asignatura_ordenado
    } 
    return '';
  }




  render(){

      let listItems = '';
      let item = [];
      // For asignaturas in dualList
      let asignaturas = []; //All asignaturas for all the tipos_postgrados
      let asignatura = {}; //Single asignatura
      let mid_options = []; //Asignaturas for specific tipo_postgrado
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
        let filtered_length = filteredPeriodos.length;
        let lista_asignaturas_length = this.props.adminUser.lista_asignaturas.length;

        if(this.props.adminUser.lista_asignaturas.length > 0){
          // Loop all asignaturas (name and id)
          mid_options['options'] = [];
          for(let j = 0; j < lista_asignaturas_length; j++){
              asignatura = {"name":this.props.adminUser.lista_asignaturas[j].nombre,"value":this.props.adminUser.lista_asignaturas[j].id};
              mid_options['options'].push(asignatura);
          }

          //Loop all tipos_postgrado
          for(let index = 0; index < filtered_length; index++){
            //Initialization
            mid_options[index] = [];
            asignaturas[index] = [];
            mid_options[index]['values'] = [];
            mid_options[index]['options'] = mid_options['options'];
            

            //Get all saved asignaturas
            item[index] = this.props.adminUser.lista_docente_asignatura.filter(item=>item.tipo_postgrado === filteredPeriodos[index].tipo_postgrado);

            //Loop saved asignaturas for the specified period (getting just the id)
            if(item[index].length > 0){
              for(let i = 0; i < item[index].length; i++){
                mid_options[index]['values'].push(item[index][i]['asignatura']['id']);
              }
            }
            asignaturas[index] = mid_options[index]; 

          }
        }

        listItems = filteredPeriodos.map((periodo, index) =>
          <tr key={periodo['id']}>
            <td>No iniciado</td>
            <td>{periodo['tipo_postgrado'] + ': ' + periodo['descripcion']}</td>
            <td>  
              <Row >
                <Col md='2' className='botones'>
                  <Button onClick={() => this.handleChange(periodo, item[index], asignaturas[index], periodo['tipo_postgrado'])} color="success" size='sm' data-toggle="tooltip" title="Editar"><FontAwesomeIcon name="edit"/></Button>
                </Col>

                <Col md='2' >
                  <ConfirmButton
                    onConfirm={() => this.eliminar_periodo( periodo['id'] ) }
                    text= {<FontAwesomeIcon name="trash-alt"/>}
                    className="btn btn-danger btn-sm"
                    confirming={{
                      text: '¿Esta seguro?',
                      className: 'btn btn-danger btn-sm',
                    }}
                  />
                </Col>

                <Col md='2'>
                  <ConfirmButton
                      onConfirm={() => this.activar_periodo( periodo['id'] ) }
                      text= {<FontAwesomeIcon name="rocket"/>}
                      className="btn btn-info btn-sm"
                      confirming={{
                        text: '¿Esta seguro?',
                        className: 'btn btn-info btn-sm',
                      }}
                    />
                </Col>

              </Row>
            </td>
          </tr>
        );



        if(this.state.editando_periodo === 1)
        {
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
                    <ModalPeriodoNew onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading}  /> 
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
                  <Col lg='4' md='4' sm='6' xs='10' className='Pagination'>
                    <br />
                    {this.state.searchTerm === '' &&
                      <Paginacion cant_usuarios={cant_periodos} item_por_pagina={periodos_por_pagina}/>
                    }
                  </Col>
                  <Col lg='4' md='4' sm='3' xs='1'> </Col>
                </Row>

        	</div>
          )

        } 
        else if(this.state.editando_periodo === 2 || this.state.editando_periodo === 3 )
        {
          return(
            <PeriodoEdit 
            onDismiss={this.onDismiss} 
            triggerParentUpdate={this.updateLoading} 
            periodo={this.state.periodo} 
            docente_asignatura={this.ordenarLista()} 
            asignaturas={this.state.asignaturas} 
            triggerVolverPasoAnterior={this.volverPasoAnterior} 
            triggerSiguientePaso={this.siguientePaso} 
            tipo_postgrado={this.state.tipo_postgrado}
            editando_periodo={this.state.editando_periodo}
            triggerUpdateLoading={this.updateLoading} 
            triggerVolverPrimerPaso={this.volverPrimerPaso}
            triggetUpdateDocenteAsignatura={() => this.props.get_docente_asignatura("all")}
            />
          )
        }

    }
    else {
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
                  <ModalPeriodoNew onDismiss={this.onDismiss} triggerParentUpdate={this.updateLoading} />
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
    get_docente_asignatura: get_docente_asignatura,
    get_asignaturas: get_asignaturas,
    get_usuarios: get_usuarios,
    eliminar_periodo: eliminar_periodo,
    activar_periodo: activar_periodo,
  }, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(ListaPeriodos);


