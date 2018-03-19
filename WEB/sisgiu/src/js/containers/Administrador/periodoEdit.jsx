import { Table, Form,  FormGroup, Input, Label, Col, Button } from 'reactstrap';
import '../../../css/moduloUsuarioAdministrador.css';
import FontAwesomeIcon from 'react-fontawesome';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import React from 'react';

// Components
import { editar_asignatura } from '../../actions/moduloAsignaturas';

class PeriodoEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      docente_asignatura: this.props.docente_asignatura,
      asignatura_codigo: '',
      docente_asignatura_tabla: [],
      asignatura: '',
      codigo_asignatura: null,
      docente_asignatura_nuevo: null,
      horario_dia_nuevo: 0,
      horario_hora_nuevo: null,
      aula_nuevo: null,
      // docente_asignatura_nuevo: {
      //   id_docente: null,
      //   codigo_asignatura: null,
      //   dia: 0,
      //   hora: null,
      //   aula: null,
      // }
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeExtraData = this.handleChangeExtraData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateDocenteAsignatura = this.updateDocenteAsignatura.bind(this);
    this.agregarDocenteAsignatura = this.agregarDocenteAsignatura.bind(this);


  }



  handleChange(e) {
    const { name, value } = e.target;

    let docente_asignatura_tabla = [];
    let index;

    this.state.docente_asignatura.find(function(item, j){
      if(item.asignatura.codigo === value){
        docente_asignatura_tabla.push(item);
      }
    });

    this.props.adminUser.lista_asignaturas.find(function(item, j){
      if(item.codigo === value){
        index = j;
      }
    });

    this.setState({ [name]: value, docente_asignatura_tabla: docente_asignatura_tabla, asignatura: this.props.adminUser.lista_asignaturas[index]  });

  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.triggerParentUpdate();
    this.props.editar_asignatura(this.state);
    this.props.triggerParentUpdate();
  }

  componentWillReceiveProps(){
    if(this.state.docente_asignatura == undefined){
      this.setState({docente_asignatura: this.props.docente_asignatura});
    } 
  }

  updateDocenteAsignatura(value) 
  {
    var exist = false;
    var filteredObj = "";
    var asignaturas_length = value.length;
    var docente_asignatura = this.state.docente_asignatura;
    var docente_asignatura_length = docente_asignatura.length;
    let new_docente_asignatura  = {
        "aula": "",
        "asignatura": {
            "tipo_asignatura": "",
            "unidad_credito": "",
            "id": "",
            "nombre": "",
            "codigo": ""
        },
        "usuario": {
            "first_name": "",
            "last_name": "",
            "cedula": ""
        },
        "tipo_postgrado": "",
        "horario_hora": "",
        "periodo_id": "",
        "horario_dia": "",
    };

    //Delete element on docente_asignatura
    if(asignaturas_length  < docente_asignatura_length){
      for (var i = 0; i < docente_asignatura_length; i++) {
          filteredObj = value.find(function(item, j){
            if(item === docente_asignatura[i].asignatura.id){
              exist = true;
            }
          });

          if(!exist){
            //Delete from docente asignatura the index
            console.log("Se eliminara: "+docente_asignatura[i].asignatura.nombre);
            docente_asignatura.splice(i,1);
            this.setState({docente_asignatura: docente_asignatura}); 
            break;
          }
          exist = false;
      }
    }

    //Add element to docente_asignaturas
    else if(asignaturas_length > docente_asignatura_length){
      var index = 0;
      for (var i = 0; i < asignaturas_length; i++) {
          filteredObj = docente_asignatura.find(function(item, j){
            if(item.asignatura.id === value[i]){
              exist = true;
            }
          });

          if(!exist){
            //Get index of lista_asignaturas to fill json
            filteredObj = this.props.adminUser.lista_asignaturas.findIndex(function(item, j){
              if(item.id === value[i]){
                index = j;
                return j;
              }
            });
            //Add value[i] to the json and push it to docente asignatura
            console.log("Se agregara: "+this.props.adminUser.lista_asignaturas[index].nombre);
            new_docente_asignatura.asignatura = this.props.adminUser.lista_asignaturas[index];
            docente_asignatura.push(new_docente_asignatura);
            this.setState({docente_asignatura:docente_asignatura});
            break;
          }
          exist = false;
      }
    }

  }

  handleChangeExtraData(e){
    const { name, value } = e.target;
     this.setState({ [name] : value });

     console.log(name);
     console.log(value);
  }

  agregarDocenteAsignatura() {
    console.log(this.state.docente_asignatura);
    // Obtengo asignatura
    // console.log(this.state.docente_asignatura_nuevo);
    // console.log(this.state.horario_dia_nuevo);
    // console.log(this.state.horario_hora_nuevo);
    // console.log(this.state.aula_nuevo);
    // console.log(this.state.asignatura.codigo);

    let nuevo = {};

    nuevo['asignatura'] = {'codigo': this.state.asignatura.codigo, 'nombre': this.state.asignatura.nombre};
    nuevo['aula'] = this.state.aula_nuevo;
    nuevo['docente_id'] = this.state.docente_asignatura_nuevo;
    nuevo['horario_dia'] = this.state.horario_dia_nuevo;
    nuevo['horario_hora'] = this.state.horario_hora_nuevo;
    nuevo['periodo_id'] = this.props.periodo.id;


    console.log(nuevo);

  }


  render() {

    let listItems = '';
    let lista_docentes = '';
    let listAsignaturas = '';

    console.log(this.state.docente_asignatura_tabla);

    if (this.props.adminUser.lista_usuarios && this.props.adminUser.lista_usuarios.length > 0) {
      lista_docentes = this.props.adminUser.lista_usuarios.map((docente) =>
        <option key={docente['cedula']} value={docente['cedula']} name={docente['cedula']}> {docente.first_name}{' '}{docente.last_name} </option>
      ); 
    }

    const days = ['Lunes', 'Martes', 'Miercoles','Jueves', 'Viernes', 'Sabado', 'Domingo'];
    if(this.state.docente_asignatura !== undefined){
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

    if (this.props.adminUser.lista_asignaturas && this.props.adminUser.lista_asignaturas.length > 0) {
      listAsignaturas = this.props.adminUser.lista_asignaturas.map((tipo_asignatura) =>
        <option key={tipo_asignatura['codigo']} value={tipo_asignatura['codigo']} name={tipo_asignatura['nombre']}> {tipo_asignatura['nombre']} </option>
      ); 
    }

    return (

      <div>
          <br />

          <Button color="secondary" size='sm' data-toggle="tooltip" title="Regresar" onClick={() => this.props.triggerVolverPasoAnterior()}><FontAwesomeIcon name="arrow-left"/></Button>

          <Form onSubmit={this.handleSubmit}>
              <h6>Paso 1: Seleccionar Asignaturas</h6>
              <hr/>
              <FormGroup row>
                <Label for="asignatura_codigo" sm={5}>Seleccione una asignatura</Label>
                <Col sm={7}>
                  <Input bsSize="sm" value={this.state.value} defaultValue={this.state['asignatura_codigo']} onChange={this.handleChange} type="select" name="asignatura_codigo" id="asignatura_codigo" required>
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
                              <Input bsSize="sm" value={this.state.value} onChange={this.handleChangeExtraData} required type="select" name="docente_asignatura_nuevo" id="docente_asignatura_nuevo">
                                <option value={null} name={-1}> {' '} </option>
                                {lista_docentes}
                              </Input>
                            </FormGroup>
                          </td>
                          <td> {this.state.asignatura.nombre}</td>
                          <td> 
                            <FormGroup>
                              <Input bsSize="sm" value={this.state.value} onChange={this.handleChangeExtraData} required type="select" name="horario_dia_nuevo" id="horario_dia_nuevo">
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
                              <Input type="text" name="horario_hora_nuevo" id="horario_hora_nuevo" onChange={this.handleChangeExtraData} required />
                            </FormGroup>
                          </td>
                          <td>
                            <FormGroup>
                              <Input type="number" name="aula_nuevo" id="aula_nuevo" onChange={this.handleChangeExtraData} required />
                            </FormGroup>
                          </td>
                        </tr> 
                      }
                    
                  </tbody>
                </Table>

          </Form>

          <Button color="primary" size='sm' data-toggle="tooltip" title="Guardar" onClick={() => this.agregarDocenteAsignatura()}>Guardar</Button>
          <Button color="success" size='sm' data-toggle="tooltip" title="Siguiente" onClick={() => this.props.triggerVolverPasoAnterior()}>Siguiente</Button>

      </div>
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
    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(PeriodoEdit);
