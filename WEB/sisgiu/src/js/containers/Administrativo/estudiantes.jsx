// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Alert, Input, FormGroup, Label, Row, Col, Button, Table } from 'reactstrap';
import { PulseLoader } from 'halogenium';
import SearchInput, {createFilter} from 'react-search-input';
import '../../../css/switch.css'; 

// Components
import Paginacion from '../../components/pagination';
import { 
    cargado,
    get_periodos_actuales,
    } from '../../actions/inicio';

import { 
  get_estudiantes_por_periodo,
  vaciar_lista_estudiantes,
  pago_inscripcion_estudiantes
  } from '../../actions/moduloEstudiantes';
  
import ModalEstudianteEdit from './modalEstudianteEdit';
import { get_estado_periodo } from '../../actions/moduloEstudiantes';


const KEYS_TO_FILTERS = ['estudiante.first_name', 'estudiante.last_name', 'estudiante.cedula'];
const estudiantes_por_pagina = 10;

class Estudiantes extends Component{

	constructor(props) {
		super(props);
	  this.state = {
	    visible: true,
      periodo: '',
      searchTerm: '',
      estudiante_pagado: {},
      loading: false,
      estado_periodo: '',
    }
    this.onDismiss = this.onDismiss.bind(this);
    this.get_periodos = this.get_periodos.bind(this);
		this.handleChange = this.handleChange.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
    this.get_listItems = this.get_listItems.bind(this);
    this.updateEstudiantes = this.updateEstudiantes.bind(this);
    this.handleChangePagado = this.handleChangePagado.bind(this);
    this.guardarPagadoEstudiante = this.guardarPagadoEstudiante.bind(this);
    this.habilitarAlerts = this.habilitarAlerts.bind(this);
	}


	componentDidMount() {
      this.props.get_periodos_actuales()
        .then( () => this.props.cargado() );
	}

  onDismiss() {
    this.setState({ visible: false });
  }

  habilitarAlerts() {
    this.setState({ visible: true });
  }

  updateEstudiantes (){
    let N = this.props.administrativoUser.lista_estudiantes.length;
    let pagados = {};
    for(var i = 0; i < N; i++){
      pagados[this.props.administrativoUser.lista_estudiantes[i].estudiante.cedula] = this.props.administrativoUser.lista_estudiantes[i].pagado;
    }
    this.setState({estudiante_pagado:pagados});
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  handleChangePagado(e){
    const { name } = e.target;

    let estudiante_pagado = this.state.estudiante_pagado;
    estudiante_pagado[name] = !estudiante_pagado[name];

    this.setState({estudiante_pagado:estudiante_pagado});

  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })

    if (value !== "-1") {
      // Busco la lista de estudiantes del perido seleccionado
      this.props.get_estudiantes_por_periodo(e.target.value)
      .then( () => this.props.get_estado_periodo(this.state.periodo) 
      .then( () => this.updateEstudiantes() ));
    
    } else {
      this.props.vaciar_lista_estudiantes();
    }

  }

  guardarPagadoEstudiante() {
    this.setState({loading: true}, 
      () => this.props.pago_inscripcion_estudiantes(this.state.estudiante_pagado, this.state.periodo)
        .then( () => this.setState({loading: false})) );
  }

  get_periodos() {

    if ( this.props.administrativoUser.lista_periodos.length > 0) {
      return this.props.administrativoUser.lista_periodos.map((periodo, index) =>
        <option key={index} value={periodo.id} name='periodo'> {periodo.tipo_postgrado}: {periodo.descripcion} </option>
      ); 
    }

    return '';
  }

  get_listItems() {
    let listItems;

    if(this.state.estudiante_pagado !== {}){
      let cant_estudiantes = this.props.administrativoUser.lista_estudiantes.length;
      let estudiantes = [];

      var init = this.props.pagination.pagina*estudiantes_por_pagina-estudiantes_por_pagina;
      var end = this.props.pagination.pagina*estudiantes_por_pagina;

      //Si se esta realizando una busqueda uso toda la lista de usuario, sino no
      if(this.state.searchTerm === ''){
        for (var i = init; i < end; i++) {
          if (this.props.administrativoUser.lista_estudiantes[i]) {
            estudiantes.push(this.props.administrativoUser.lista_estudiantes[i]);
          }
        }

      } else {
        for (i = 0; i < cant_estudiantes; i++) {
            estudiantes.push(this.props.administrativoUser.lista_estudiantes[i]);
        }
      }

      const filteredEstudiantes = estudiantes.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

      listItems = filteredEstudiantes.map((data) =>
        <tr key={data.estudiante['cedula']}>
          <td>{data.estudiante['cedula']}</td>
          <td>{data.estudiante['first_name']} {data.estudiante['last_name']}</td>
          <td>  
            <Row >
              <Col md={{ size: 'auto', offset: 3 }} className='botones'>
                <label className="switch">
                  <input 
                    type="checkbox" 
                    name={data.estudiante['cedula']} 
                    checked={this.state.estudiante_pagado[data.estudiante['cedula']]} 
                    onChange={this.handleChangePagado} 
                    disabled={this.props.administrativoUser.estado_periodo.estado === 'activo'} 
                  />
                  <span className="slider round"></span>
                </label>
              </Col>
            </Row>
          </td>
          <td>  
            <Row >
              <Col md={{ size: 'auto', offset: 3 }} className='botones'>
                <ModalEstudianteEdit 
                  onDismiss={this.onDismiss}
                  habilitarAlerts={this.habilitarAlerts}
                  data={data} 
                  periodo={this.state.periodo} 
                />
              </Col>
            </Row>
          </td>
        </tr>
      );
    }   
    return listItems;

  }


  render(){
      
    if (!this.props.activeUser.cargado) {
      return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>);
    } else 
    {

      return(

        <div>

            {/*ALERT DE EXITO*/}
            {this.props.administrativoUser.pago_inscripcion_editado && !this.state.loading &&
              <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                  Estado de pago de inscripción de estudiantes actualizado exitosamente
              </Alert> 
            }
            {/*ALERT DE EXITO*/}
            {this.props.administrativoUser.inscripcion_modificada && !this.state.loading &&
              <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                  Inscripción actualizada exitosamente
              </Alert> 
            }
            {/*ALERT DE ERROR*/}
            {this.props.administrativoUser.error && !this.state.loading &&
              <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                  Ha ocurrido un error
              </Alert>
            }
            {/*SPINNER*/}
            { this.state.loading &&
              <center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
            }


          <FormGroup row>
            <Label for="periodo" sm={5}>Seleccione un periodo:</Label>
            <Col sm={7}>
              <Input 
                bsSize="sm" 
                defaultValue={this.state.periodo} 
                onChange={this.handleChange} 
                type="select" 
                name="periodo" 
                required>
                <option value={-1} name='periodo'> </option>
                {this.get_periodos()}
              </Input>
            </Col>
          </FormGroup>


          <Row>
            <Col md='5'></Col>

            <Col md='7'>
              <SearchInput className="searchBox" placeholder="Buscar estudiante..." onChange={this.searchUpdated} />
            </Col>
          </Row>

          <br/>


          <Table bordered hover responsive striped size="sm">
            <thead>
              <tr>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Pagado</th>
                <th>Editar</th>
              </tr>
            </thead>
            <tbody className="tabla_usuarios">
              {this.get_listItems()}
            </tbody>
          </Table>


          {this.props.administrativoUser.lista_estudiantes.length > 0 &&
            <div>
              <Row >
                <Col lg='4' md='4' sm='3' xs='1'> </Col>
                <Col lg='4' md='4' sm='6' xs='10' className='Pagination'>
                  <br />
                  {this.state.searchTerm === '' &&
                    <Paginacion cant_items={this.props.administrativoUser.lista_estudiantes.length} item_por_pagina={estudiantes_por_pagina}/>
                  }
                </Col>
                <Col lg='4' md='4' sm='3' xs='1'> </Col>
              </Row>


              <Row>
                <Col md="6" sm="6"> </Col>
                <Col md="6" sm="6">
                    <div className="text-right">
                      <Button 
                        color="primary" 
                        size='sm' 
                        data-toggle="tooltip" 
                        title="Guardar" 
                        onClick={() => this.guardarPagadoEstudiante()}
                        hidden={this.props.administrativoUser.estado_periodo.estado === 'activo'}
                        >Guardar</Button>
                    </div>
                </Col>

              </Row>
            </div>
          }




        </div>



        )

    } // else


  } // render


} // class


const mapStateToProps = (state)=> {
  return{
    activeUser: state.activeUser,
    administrativoUser: state.administrativoUser,
    pagination: state.paginacion,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    cargado: cargado,
    get_periodos_actuales: get_periodos_actuales,
    get_estudiantes_por_periodo: get_estudiantes_por_periodo,
    vaciar_lista_estudiantes: vaciar_lista_estudiantes,
    pago_inscripcion_estudiantes: pago_inscripcion_estudiantes,
    get_estado_periodo: get_estado_periodo,
  }, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(Estudiantes);


