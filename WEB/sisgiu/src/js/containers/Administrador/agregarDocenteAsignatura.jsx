import { Table, Form,  FormGroup, Input, Label, Col, Button, Row } from 'reactstrap';
import '../../../css/moduloUsuarioAdministrador.css';
import FontAwesomeIcon from 'react-fontawesome';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import ConfirmButton from 'react-confirm-button';
import 'rc-time-picker/assets/index.css';

// Components
import { editar_asignatura } from '../../actions/moduloAsignaturas';
import TimePicker from 'rc-time-picker';
import { cargando, actualizar_docente_asignatura } from '../../actions/moduloPeriodos';


class AgregarDocenteAsignatura extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      asignatura_codigo: '',
      docente_asignatura_tabla: [],
      asignatura: '',
      docente_asignatura_nuevo: '',
      horario_dia_nuevo: 0,
      horario_hora_nuevo_inicio: '',
      horario_hora_nuevo_fin: '',
      aula_nuevo: '',

    };

    this.handleChangeSelectAsignaturas = this.handleChangeSelectAsignaturas.bind(this);
    this.get_listAsignaturas = this.get_listAsignaturas.bind(this);
    this.get_listItems = this.get_listItems.bind(this);
    this.handleChangeExtraData = this.handleChangeExtraData.bind(this);
    this.get_lista_docentes = this.get_lista_docentes.bind(this);
    this.handleChangeTimePickerInicio = this.handleChangeTimePickerInicio.bind(this);
    this.handleChangeTimePickerFin = this.handleChangeTimePickerFin.bind(this);
    this.agregarDocenteAsignatura = this.agregarDocenteAsignatura.bind(this);
    this.ordenarLista = this.ordenarLista.bind(this);


  }




  render() {

    const days = ['Lunes', 'Martes', 'Miercoles','Jueves', 'Viernes', 'Sabado', 'Domingo'];

    

    return (
      
    );
  }

}


const mapStateToProps = (state)=> {
  return{
    adminUser: state.adminUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editar_asignatura: editar_asignatura,
    cargando: cargando,
    actualizar_docente_asignatura: actualizar_docente_asignatura,
    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AgregarDocenteAsignatura);