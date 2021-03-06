// Dependencies
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, Table, Row, Col, Button } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import SearchInput, { createFilter } from 'react-search-input';
import '../../../css/moduloUsuarioAdministrador.css';
import { bindActionCreators } from 'redux';
import { PulseLoader } from 'halogenium'; //Spinner
import ConfirmButton from 'react-confirm-button';

// Components
import ModalPeriodoNew from './modalPeriodoNew';
import ModalPeriodoDelete from './modalPeriodoDelete';
import PeriodoEdit from './periodoEdit';
import { get_asignaturas } from '../../actions/moduloAsignaturas';
import { get_usuarios } from '../../actions/moduloUsuarioAdministrador';
import { cargando, cargado } from '../../actions/inicio';
import {
  eliminar_periodo,
  activar_periodo,
  get_periodos,
  get_tipo_postgrado,
  get_estado_periodo,
  get_docente_asignatura,
} from '../../actions/moduloPeriodos';
import { hide_alerts } from '../../actions/moduloUsuarioAdministrador';


import Paginacion from '../../components/pagination';

const KEYS_TO_FILTERS = ['id', 'tipo_postgrado'];
const periodos_por_pagina = 10;


class ListaPeriodos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      searchTerm: '',
      editando_periodo: 1,
      periodo: "",
      docente_asignatura: "",
      asignaturas: "",
      tipo_postgrado: "",
      col_lg_trash_button: 4,
      col_md_trash_button: 4,

    }

    this.onDismiss = this.onDismiss.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.volverPasoAnterior = this.volverPasoAnterior.bind(this);
    this.siguientePaso = this.siguientePaso.bind(this);
    this.ordenarLista = this.ordenarLista.bind(this);
    this.volverPrimerPaso = this.volverPrimerPaso.bind(this);
    this.cambiarTamanoCol = this.cambiarTamanoCol.bind(this);
    this.get_listItems = this.get_listItems.bind(this);


  }

  componentDidMount() {
    this.props.get_docente_asignatura("all")
      .then(() => this.props.get_periodos(false, 'no iniciado')
        .then(() => this.props.get_usuarios("docentes", false)
          .then(() => this.props.get_tipo_postgrado()
            .then(() => this.props.get_estado_periodo()
              .then(() => this.props.get_asignaturas()
                .then(() => this.props.cargado())
              )))));

  }

  onDismiss() {
    this.setState({ visible: false, loading: false });
    this.props.hide_alerts();
  }

  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }

  componentWillReceiveProps(props) {
    this.setState({ "visible": true });
  }

  volverPasoAnterior() {
    this.setState({ editando_periodo: this.state.editando_periodo - 1 });
    this.props.hide_alerts();
  }

  volverPrimerPaso() {
    this.setState({ editando_periodo: 1 }, () => this.props.cargado());
  }

  eliminar_periodo(periodo_id) {
    this.props.cargando();
    this.props.eliminar_periodo(periodo_id).then(() => this.props.cargado());
  }


  activar_periodo(periodo_id) {
    this.props.cargando();
    this.props.activar_periodo(periodo_id).then(() => this.props.cargado());
  }

  siguientePaso() {
    this.setState({ editando_periodo: this.state.editando_periodo + 1 });
  }

  handleChange(periodo, docente_asignatura, asignaturas, tipo_postgrado) {
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
        if (!lista_codigos_asignaturas.includes(this.state.docente_asignatura[i]['asignatura']['codigo'])) {
          lista_codigos_asignaturas.push(this.state.docente_asignatura[i]['asignatura']['codigo']);
        }

      }

      N = lista_codigos_asignaturas.length;
      let docente_asignatura_ordenado = [];

      let M = this.state.docente_asignatura.length;

      // Voy buscando en todo el arreglo de docente_asignatura y voy agregando los campos en otro arreglo pero CODIGO POR CODIGO para que este ordenado
      for (i = 0; i < N; i++) {

        for (var j = 0; j < M; j++) {
          if (this.state.docente_asignatura[j].asignatura.codigo === lista_codigos_asignaturas[i]) {
            docente_asignatura_ordenado.push(this.state.docente_asignatura[j]);
          }
        }

      }

      // this.props.actualizardocente_asignatura(docente_asignatura_ordenado);
      return docente_asignatura_ordenado
    }
    return '';
  }

  cambiarTamanoCol() {
    this.setState({ col_lg_trash_button: 4, col_md_trash_button: 6 });
  }

  get_listItems() {

    let listItems = '';
    let item = [];
    // For asignaturas in dualList
    let asignaturas = []; //All asignaturas for all the tipos_postgrados
    let asignatura = {}; //Single asignatura
    let mid_options = []; //Asignaturas for specific tipo_postgrado
    if (this.props.adminUser.lista_periodos && this.props.adminUser.lista_periodos.length > 0) {
      let cant_periodos = this.props.adminUser.lista_periodos.length;
      let periodos = [];

      var init = this.props.pagination.pagina * periodos_por_pagina - periodos_por_pagina;
      var end = this.props.pagination.pagina * periodos_por_pagina;


      //Si se esta realizando una busqueda uso toda la lista de periodos, sino no
      if (this.state.searchTerm === '') {

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

      if (this.props.adminUser.lista_asignaturas.length > 0) {
        // Loop all asignaturas (name and id)
        mid_options['options'] = [];
        for (let j = 0; j < lista_asignaturas_length; j++) {
          asignatura = { "name": this.props.adminUser.lista_asignaturas[j].nombre, "value": this.props.adminUser.lista_asignaturas[j].id };
          mid_options['options'].push(asignatura);
        }

        //Loop all tipos_postgrado
        for (let index = 0; index < filtered_length; index++) {
          //Initialization
          mid_options[index] = [];
          asignaturas[index] = [];
          mid_options[index]['values'] = [];
          mid_options[index]['options'] = mid_options['options'];


          //Get all saved asignaturas
          item[index] = this.props.adminUser.lista_docente_asignatura.filter(item => item.tipo_postgrado === filteredPeriodos[index].tipo_postgrado);

          //Loop saved asignaturas for the specified period (getting just the id)
          if (item[index].length > 0) {
            for (let i = 0; i < item[index].length; i++) {
              mid_options[index]['values'].push(item[index][i]['asignatura']['id']);
            }
          }
          asignaturas[index] = mid_options[index];

        }

      }

      listItems = filteredPeriodos.map((periodo, index) =>
        <tr key={periodo['id']}>
          <td>{periodo['tipo_postgrado'] + ': ' + periodo['descripcion']}</td>
          <td>
            <Row >
              <Col lg='2' md='2' sm='2' className='botones'>

                <Button onClick={() => this.handleChange(periodo, item[index], asignaturas[index], periodo['tipo_postgrado'])} color="success" size='sm' data-toggle="tooltip" title="Editar"><FontAwesomeIcon name="edit" /></Button>
              </Col>


              <Col lg='2' md='2' sm='2' className='botones'>
                <ModalPeriodoDelete onDismiss={this.onDismiss} triggerParentUpdate={() => this.eliminar_periodo(periodo['id'])} />
              </Col>


              <Col lg='2' md='2' sm='8'>
                <ConfirmButton

                  onConfirm={() => this.activar_periodo(periodo['id'])}
                  text={<FontAwesomeIcon name="rocket" />}
                  className="btn btn-info btn-sm"
                  confirming={{
                    text: '¿Está Seguro?',
                    className: 'btn btn-info btn-sm',
                  }}
                />
              </Col>

            </Row>
          </td>
        </tr>
      );



      return listItems;
    }

  }

  render() {
    if (!this.props.activeUser.cargado) {
      return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>);
    } else {

      if (this.props.adminUser.lista_periodos && this.props.adminUser.lista_periodos.length > 0) {
        let listItems = '';
        listItems = this.get_listItems();

        if (this.state.editando_periodo === 1) {
          return (
            <div>
              <br />
              {/*ALERT DE EXITO*/}
              {this.props.adminUser.create &&
                <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                  Periodo creado exitosamente
                    </Alert>
              }
              {/*ALERT DE EXITO*/}
              {this.props.adminUser['edit'] &&
                <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                  Operación realizada exitosamente
                    </Alert>
              }
              {/*ALERT DE ERROR*/}
              {this.props.adminUser['bad_input'] === true &&
                <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                  Ha ocurrido un error
                    </Alert>
              }
              {/*ALERT DE ERROR*/}
              {this.props.adminUser['error_creando_periodo'] === true &&
                <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                  Ya existe un periodo con "No Iniciado" del tipo de postgrado seleccionado.
                    </Alert>
              }
              {/*ALERT DE ERROR*/}
              {this.props.adminUser.periodo_en_inscripcion_repetido === true &&
                <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                  Ya existe un periodo en inscripción o activo del tipo de postgrado seleccionado.
                    </Alert>
              }


              <Row>
                <Col md='4'>
                  <ModalPeriodoNew onDismiss={this.onDismiss} />
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
                    <Paginacion cant_items={this.props.adminUser.lista_periodos.length} item_por_pagina={periodos_por_pagina} />
                  }
                </Col>
                <Col lg='4' md='4' sm='3' xs='1'> </Col>
              </Row>

            </div>
          )

        }
        else if (this.state.editando_periodo === 2 || this.state.editando_periodo === 3) {
          return (
            <PeriodoEdit
              hide_alerts={this.props.hide_alerts}
              periodo={this.state.periodo}
              asignaturas={this.state.asignaturas}
              triggerVolverPasoAnterior={this.volverPasoAnterior}
              triggerSiguientePaso={this.siguientePaso}
              tipo_postgrado={this.state.tipo_postgrado}
              editando_periodo={this.state.editando_periodo}
              triggerVolverPrimerPaso={this.volverPrimerPaso}
              docente_asignatura={this.ordenarLista()}
              triggerUpdateDocenteAsignatura={() => this.props.get_docente_asignatura("all")}
            />
          )
        }

      }
      else {
        return (
          <div>
            <br />
            <Row>
              <Col md='12'>
                <center>
                  <h4>No existe ningún periodo guardado</h4>
                </center>
              </Col>
            </Row>

            <Row>
              <Col md='12'>
                <ModalPeriodoNew onDismiss={this.onDismiss} />
              </Col>
            </Row>

          </div>
        )
      }

    }
  }
}


const mapStateToProps = (state) => {
  return {
    adminUser: state.adminUser,
    pagination: state.paginacion,
    activeUser: state.activeUser,
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
    cargando: cargando,
    cargado: cargado,
    hide_alerts: hide_alerts,
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(ListaPeriodos);


