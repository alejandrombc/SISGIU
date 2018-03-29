import { Table, Col, Button, Row } from 'reactstrap';
import '../../../css/moduloUsuarioAdministrador.css';
import FontAwesomeIcon from 'react-fontawesome';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import ConfirmButton from 'react-confirm-button';

// Components
import { guardar_docente_asignatura_periodo } from '../../actions/moduloPeriodos';
import { cargando } from '../../actions/inicio';
import AgregarDocenteAsignatura from './agregarDocenteAsignatura';


class PeriodoEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      docente_asignatura: this.props.docente_asignatura,
      asignatura_codigo: '',
      codigo_asignatura: '',
    };

    this.eliminarDocenteAsignatura = this.eliminarDocenteAsignatura.bind(this);
    this.guardarCambiosEdit = this.guardarCambiosEdit.bind(this);
    this.get_listItemsFinales = this.get_listItemsFinales.bind(this);
    this.actualizar_docente_asignatura = this.actualizar_docente_asignatura.bind(this);
  }


  eliminarDocenteAsignatura(index) {
    let array = this.state.docente_asignatura;
    array.splice(index, 1);
    this.setState({ docente_asignatura : array });
  }

  guardarCambiosEdit() {
    this.props.cargando();
    this.props.triggerVolverPrimerPaso();
    this.props.triggetUpdateDocenteAsignatura();
    this.props.guardar_docente_asignatura_periodo(this.state.docente_asignatura, this.props.periodo.id);
  }

  get_listItemsFinales(days) {
    // Esta es la lista de todas las asignaturas con horarios, aulas, etc que se mostrara en el paso final al editar un periodo. 
    let listItemsFinales = this.state.docente_asignatura.map((docente, index) =>
      <tr key={index}>
        <td> 
          {docente.usuario.first_name}{' '}{docente.usuario.last_name}
        </td>
        <td>{docente.asignatura.nombre}</td>
        <td>        
          {days[docente.horario_dia]}
        </td>
        <td>        
          {docente.horario_hora}
        </td>
        <td>        
          {docente.aula}
        </td>
        <td>
          <ConfirmButton
              onConfirm={() => this.eliminarDocenteAsignatura(index) }
              text= {<FontAwesomeIcon name="trash-alt"/>}
              className="btn btn-danger btn-sm"
              confirming={{
                text: '¿Está seguro? Se eliminará este horario.',
                className: 'btn btn-danger btn-sm',
              }}
            />
        </td>
      </tr>
    );
    return listItemsFinales;
  }

  actualizar_docente_asignatura(data) {
    this.setState({docente_asignatura: data});
  }


  render() {
    const days = ['Lunes', 'Martes', 'Miercoles','Jueves', 'Viernes', 'Sabado', 'Domingo'];
    let listItemsFinales = this.get_listItemsFinales(days);

    if ( this.props.editando_periodo === 2 ) 
    {
      return (  
        <AgregarDocenteAsignatura 
        triggerVolverPasoAnterior = {() => this.props.triggerVolverPasoAnterior()}
        triggerSiguientePaso = {() => this.props.triggerSiguientePaso()}
        docente_asignatura = {this.state.docente_asignatura}
        periodo = {this.props.periodo}
        trigger_actualizar_docente_asignatura = {this.actualizar_docente_asignatura}
        />
      );

    } else 
    { // this.props.editando_periodo === 3 PASO FINAL
      return (
        <div>

          <br/>
          <Row>
            <Col md='12'>
              <Button color="secondary" size='sm' data-toggle="tooltip" title="Regresar" onClick={() => this.props.triggerVolverPasoAnterior()}><FontAwesomeIcon name="arrow-left"/></Button>
            </Col>
          </Row>
          <br/>

          <Row>
            <Col md='12'>
              <h6>Paso 3: Confirmar Cambios</h6>
              <hr/>
            </Col>
          </Row>


          <Table bordered hover responsive striped size="sm">
            <thead>
              <tr>
                <th>Docente</th>
                <th>Asignatura</th>
                <th>Dia</th>
                <th>Hora</th>
                <th>Aula</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody className="tabla_usuarios">
                
                {listItemsFinales}
              
              
            </tbody>
          </Table>
          <hr/>
          <Row>
            <Col md='12' className='text-right'>
              <Button color="primary" size='sm' data-toggle="tooltip" title="Guardar" onClick={() => this.guardarCambiosEdit()}>Guardar</Button>
            </Col>
          </Row>

        </div>

      );
    
    }

    
  }
}

const mapStateToProps = (state)=> {
  return{
    adminUser: state.adminUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    guardar_docente_asignatura_periodo: guardar_docente_asignatura_periodo,
    cargando: cargando,
    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PeriodoEdit);
