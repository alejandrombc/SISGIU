import { Table, Form,  FormGroup, Input, Label, Col, Button, Row } from 'reactstrap';
import '../../../css/moduloUsuarioAdministrador.css';
import FontAwesomeIcon from 'react-fontawesome';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import ConfirmButton from 'react-confirm-button';

// Components
import { editar_asignatura } from '../../actions/moduloAsignaturas';
import TimePicker from 'rc-time-picker';
import moment from 'moment';

class PeriodoEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      docente_asignatura: this.props.docente_asignatura,
      asignatura_codigo: '',
      docente_asignatura_tabla: [],
      asignatura: '',
      codigo_asignatura: '',
      docente_asignatura_nuevo: '',
      horario_dia_nuevo: 0,
      horario_hora_nuevo: '',
      aula_nuevo: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeExtraData = this.handleChangeExtraData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.agregarDocenteAsignatura = this.agregarDocenteAsignatura.bind(this);
    this.ordenarLista = this.ordenarLista.bind(this);
    this.eliminarDocenteAsignatura = this.eliminarDocenteAsignatura.bind(this);
    this.guardarCambiosEdit = this.guardarCambiosEdit.bind(this);


  }



  handleChange(e) {
    const { name, value } = e.target;

    let docente_asignatura_tabla = [];
    let index;

    let N = this.state.docente_asignatura.length;

    for (var j = 0; j < N; j++) {
      if(this.state.docente_asignatura[j].asignatura.codigo === value){
        docente_asignatura_tabla.push(this.state.docente_asignatura[j]);
      }
    }

    N = this.props.adminUser.lista_asignaturas.length;

    for (j = 0; j < N; j++) {
      if(this.props.adminUser.lista_asignaturas[j].codigo === value){
        index = j;
      }
    }

    this.setState({ [name]: value, 
      docente_asignatura_tabla: docente_asignatura_tabla, 
      asignatura: this.props.adminUser.lista_asignaturas[index], 
      docente_asignatura_nuevo: '',
      horario_dia_nuevo: 0,
      horario_hora_nuevo: '',
      aula_nuevo: '',  });

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.triggerParentUpdate();
    this.props.editar_asignatura(this.state);
    this.props.triggerParentUpdate();
  }

  componentWillReceiveProps(){
    if(this.state.docente_asignatura === undefined){
      this.setState({docente_asignatura: this.props.docente_asignatura});
    } 
  }



  handleChangeExtraData(e){
    const { name, value } = e.target;
    this.setState({ [name] : value });
  }

  agregarDocenteAsignatura() {

    //Declaraciones
    let nueva_asignatura = {};
    let new_docente_asignatura = this.state.docente_asignatura;
    let index = -1;
    let docente_asignatura_nuevo = this.state.docente_asignatura_nuevo;
    let docente_asignatura_tabla = [];


    let N = this.props.adminUser.lista_usuarios.length;

    //Obtener el index del docente deseado
    for (var j = 0; j < N; j++) {
      if(parseInt(this.props.adminUser.lista_usuarios[j].cedula, 10) === parseInt(docente_asignatura_nuevo, 10) ){
        index = j;
      }
    }

    //Crear JSON para el "push" al docente asignatura
    nueva_asignatura['asignatura'] = {
      'codigo': this.state.asignatura.codigo, 
      'nombre': this.state.asignatura.nombre,
      'id': this.state.asignatura.id
    };
    nueva_asignatura['aula'] = this.state.aula_nuevo;
    nueva_asignatura['docente'] = docente_asignatura_nuevo;
    nueva_asignatura['usuario'] = {
        'first_name': this.props.adminUser.lista_usuarios[index].first_name,
        'last_name': this.props.adminUser.lista_usuarios[index].last_name,
        'cedula': this.props.adminUser.lista_usuarios[index].cedula
      };

    nueva_asignatura['horario_dia'] = this.state.horario_dia_nuevo;
    nueva_asignatura['horario_hora'] = this.state.horario_hora_nuevo;
    nueva_asignatura['periodo'] = this.props.periodo.id;
    nueva_asignatura['aula'] = this.state.aula_nuevo;
    nueva_asignatura['tipo_postgrado'] = this.props.tipo_postgrado;


    //Push al docente asignatura (nueva entrada)
    new_docente_asignatura.push(nueva_asignatura);

    N = new_docente_asignatura.length;
    //Refresco la tabla "local" con el nuevo docente asignatura
    for (j = 0; j < N; j++) {
      if( new_docente_asignatura[j].asignatura.codigo ===  nueva_asignatura.asignatura.codigo){
        docente_asignatura_tabla.push(new_docente_asignatura[j]);
      }
    }

    new_docente_asignatura = this.ordenarLista(new_docente_asignatura);

    //Set a los valores nuevos de los estados
    this.setState({
      docente_asignatura: new_docente_asignatura, 
      docente_asignatura_tabla: docente_asignatura_tabla,
      docente_asignatura_nuevo: '',
      horario_dia_nuevo: 0,
      horario_hora_nuevo: '',
      aula_nuevo: '',
    });




  }

  ordenarLista(new_docente_asignatura) {

    let lista_codigos_asignaturas = [];
    
    let N = new_docente_asignatura.length;

    // Busco todos los codigos de asignaturas de docente_asignatura
    for (var i = 0; i < N; i++) {
      // si el codigo existe ya en lista_codigos_asignaturas no lo vuelvo a agregar
      if ( !lista_codigos_asignaturas.includes(new_docente_asignatura[i]['asignatura']['codigo']) ) {
        lista_codigos_asignaturas.push( new_docente_asignatura[i]['asignatura']['codigo'] );
      }

    }

    N = lista_codigos_asignaturas.length;
    let docente_asignatura_ordenado = [];
    let M = new_docente_asignatura.length;

    // Voy buscando en todo el arreglo de docente_asignatura y voy agregando los campos en otro arreglo pero CODIGO POR CODIGO para que este ordenado
    for (i = 0; i < N; i++) {


      for (var j = 0; j < M; j++) {
        if(new_docente_asignatura[j].asignatura.codigo === lista_codigos_asignaturas[i]){
          docente_asignatura_ordenado.push(new_docente_asignatura[j]);
        }
      }
    }



    return docente_asignatura_ordenado; 
  }

  eliminarDocenteAsignatura(index) {
    let array = this.state.docente_asignatura;
    array.splice(index, 1);
    this.setState({ docente_asignatura : array });
  }

  guardarCambiosEdit() {
    alert('YES');
  }


  render() {

    let listItems = '';
    let lista_docentes = '';
    let listAsignaturas = '';
    let listItemsFinales = '';  

    if (this.props.adminUser.lista_usuarios && this.props.adminUser.lista_usuarios.length > 0) {
      lista_docentes = this.props.adminUser.lista_usuarios.map((docente) =>
        <option key={docente['cedula']} value={docente['cedula']} name={docente['cedula']}> {docente.first_name}{' '}{docente.last_name} </option>
      ); 
    }

    const days = ['Lunes', 'Martes', 'Miercoles','Jueves', 'Viernes', 'Sabado', 'Domingo'];
    // Creo que este if no hace falta
    if(this.state.docente_asignatura !== undefined){
      // Esta es la lista de todos los horarios que posee una asignatura en especifico.
      listItems = this.state.docente_asignatura_tabla.map((docente, index) =>
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
          </tr>
        );
    }

    

    // Esta es la lista de todas las asignaturas con horarios, aulas, etc que se mostrara en el paso final al editar un periodo. 
    listItemsFinales = this.state.docente_asignatura.map((docente, index) =>
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
                text: '¿Esta seguro? Se eliminará este horario.',
                className: 'btn btn-danger btn-sm',
              }}
            />
        </td>
      </tr>
    );

    if (this.props.adminUser.lista_asignaturas && this.props.adminUser.lista_asignaturas.length > 0) {
      listAsignaturas = this.props.adminUser.lista_asignaturas.map((tipo_asignatura) =>
        <option key={tipo_asignatura['codigo']} value={tipo_asignatura['codigo']} name={tipo_asignatura['nombre']}> {tipo_asignatura['nombre']} </option>
      ); 
    }

    if ( this.props.editando_periodo === 2 ) {
      return (
        <div>
            <br />

            <ConfirmButton
              onConfirm={() => this.props.triggerVolverPasoAnterior() }
              text= {<FontAwesomeIcon name="arrow-left"/>}
              className="btn btn-secondary btn-sm"
              confirming={{
                text: '¿Esta seguro? Se perderan todos los cambios',
                className: 'btn btn-danger btn-sm',
              }}
            />

            <br /><br />
            <Form onSubmit={this.handleSubmit}>
                <h6>Paso 1: Seleccionar Asignaturas</h6>
                <hr/>
                <FormGroup row>
                  <Label for="asignatura_codigo" sm={5}>Seleccione una asignatura</Label>
                  <Col sm={7}>
                    <Input 
                    bsSize="sm" 
                    value={this.state.value} 
                    defaultValue={this.state['asignatura_codigo']} 
                    onChange={this.handleChange} 
                    type="select" 
                    name="asignatura_codigo" 
                    id="asignatura_codigo" 
                    required>
                      <option value={null} name={-1}> {' '} </option>
                      {listAsignaturas}
                    </Input>
                  </Col>
                </FormGroup>
                <br />
                <hr/>
                <h6>Paso 2: Seleccione docente y hora</h6>
                <hr/>
                  <Table bordered hover responsive striped size="sm">
                    <thead>
                      <tr>
                        <th>Docente</th>
                        <th>Asignatura</th>
                        <th>Dia</th>
                        <th>Hora</th>
                        <th>Aula</th>
                      </tr>
                    </thead>
                    <tbody className="tabla_usuarios">
                        
                        {listItems}
                        
                        { this.state.asignatura_codigo !== '' &&
                          <tr>
                            <td id='docente_asignatura_nuevo'> 
                              <FormGroup>
                                <Input bsSize="sm" value={this.state.docente_asignatura_nuevo} onChange={this.handleChangeExtraData} required type="select" name="docente_asignatura_nuevo" id="docente_asignatura_nuevo">
                                  <option value={null} name={-1}> {' '} </option>
                                  {lista_docentes}
                                </Input>
                              </FormGroup>
                            </td>
                            <td> {this.state.asignatura.nombre}</td>
                            <td> 
                              <FormGroup>
                                <Input bsSize="sm" value={this.state.horario_dia_nuevo} onChange={this.handleChangeExtraData} required type="select" name="horario_dia_nuevo" id="horario_dia_nuevo">
                                  <option key="0" value="0" name="Lunes"> Lunes </option>
                                  <option key="1" value="1" name="Martes"> Martes </option>
                                  <option key="2" value="2" name="Miercoles"> Miercoles </option>
                                  <option key="3" value="3" name="Jueves"> Jueves </option>
                                  <option key="4" value="4" name="Viernes"> Viernes </option>
                                  <option key="5" value="5" name="Sabado"> Sabado </option>
                                  <option key="6" value="6" name="Domingo"> Domingo </option>
                                </Input>
                              </FormGroup>
                            </td>
                            <td> 
                              <FormGroup>
                                <Input type="text" value={this.state.horario_hora_nuevo} name="horario_hora_nuevo" id="horario_hora_nuevo" onChange={this.handleChangeExtraData} required />
                                {/*
                                <div>
                                  <TimePicker defaultValue={moment()} showMinute={false} />
                                  <TimePicker defaultValue={moment()} showMinute={false} />
                                </div>
                                */}
                              </FormGroup>
                            </td>
                            <td>
                              <FormGroup>
                                <Input type="number" value={this.state.aula_nuevo} name="aula_nuevo" id="aula_nuevo" onChange={this.handleChangeExtraData} required />
                              </FormGroup>
                            </td>
                          </tr> 
                        }
                      
                    </tbody>
                  </Table>

            </Form>
            <br />
            <Row>
              <Col md="6" sm="6">
                  <div className="text-left">
                    <Button color="primary" className="pull-left" size='sm' data-toggle="tooltip" title="Guardar" onClick={() => this.agregarDocenteAsignatura()}>Guardar</Button>
                  </div>
              </Col>
              <Col md="6" sm="6">
                  <div className="text-right">
                    <Button color="success" size='sm' data-toggle="tooltip" title="Siguiente" onClick={() => this.props.triggerSiguientePaso()}><FontAwesomeIcon name="arrow-right"/></Button>
                  </div>
              </Col>
            </Row>
        </div>
      );

    } else { // this.props.editando_periodo === 3 PASO FINAL
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
    editar_asignatura: editar_asignatura,
    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PeriodoEdit);
