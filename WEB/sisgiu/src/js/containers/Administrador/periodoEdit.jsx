import React from 'react';
import { Table, Form,  FormGroup, Input, Label, Button } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../../css/moduloUsuarioAdministrador.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'; 


// Components
import { editar_asignatura } from '../../actions/moduloAsignaturas';
import DualList from './dualList';

class PeriodoEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      docente_asignatura: props.docente_asignatura,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeExtraData = this.handleChangeExtraData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateDocenteAsignatura = this.updateDocenteAsignatura.bind(this);

  }



  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
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

  updateDocenteAsignatura(value){
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

  handleChangeExtraData(){

  }


  render() {
    let listItems = '';
    let lista_docentes = '';

    if (this.props.adminUser.lista_usuarios && this.props.adminUser.lista_usuarios.length > 0) {
      lista_docentes = this.props.adminUser.lista_usuarios.map((docente) =>
        <option key={docente['cedula']} value={docente['cedula']} name={docente['cedula']}> {docente.first_name}{' '}{docente.last_name} </option>
      ); 
    }

    const days = ['Lunes', 'Martes', 'Miercoles','Jueves', 'Viernes', 'Sabado', 'Domingo'];
    if(this.state.docente_asignatura !== undefined){
        listItems = this.state.docente_asignatura.map((docente, index) =>
            <tr key={index}>
              <td>{index+1}</td>
              <td> 
                <FormGroup>
                  <Input bsSize="sm" value={this.state.value} defaultValue={docente.usuario.cedula} onChange={this.handleChangeExtraData} required type="select" name="id_docente" id="id_docente">
                    {lista_docentes}
                  </Input>
                </FormGroup>
              </td>
              <td>{docente.asignatura.nombre}</td>
              <td>        
                <FormGroup>
                  <Input bsSize="sm" value={this.state.value} defaultValue={[docente.horario_dia]} onChange={this.handleChangeExtraData} required type="select" name="horario_dia" id="horario_dia" multiple>
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
                  <Input type="text" name="horario_hora" id="horario_hora" required defaultValue={docente.horario_hora} />
                </FormGroup>
                <FormGroup>
                  <Input type="text" name="horario_hora" id="horario_hora" required defaultValue={docente.horario_hora} />
                </FormGroup>
                <FormGroup>
                  <Input type="text" name="horario_hora" id="horario_hora" required defaultValue={docente.horario_hora} />
                </FormGroup>
                <FormGroup>
                  <Input type="text" name="horario_hora" id="horario_hora" required defaultValue={docente.horario_hora} />
                </FormGroup>
                <FormGroup>
                  <Input type="text" name="horario_hora" id="horario_hora" required defaultValue={docente.horario_hora} />
                </FormGroup>
              </td>
              <td>        
                <FormGroup>
                  <Input type="number" name="aula" id="aula" required defaultValue={docente.aula} />
                </FormGroup>
              </td>

            </tr>
          );
    }

    return (

      <div>
          <br />
          <Form onSubmit={this.handleSubmit}>
              <h6>Paso 1: Seleccionar Asignaturas</h6>
              <hr/>
              <DualList triggerDocenteAsignatura={this.updateDocenteAsignatura} asignaturas={this.props.asignaturas}/>
              <br />
              <hr/>
              <h6>Paso 2: Seleccione docente y hora</h6>
              <hr/>
                <Table bordered hover responsive striped size="sm">
                  <thead>
                    <tr>
                      <th>N</th>
                      <th>Docente</th>
                      <th>Asignatura</th>
                      <th>Dia</th>
                      <th>Hora</th>
                      <th>Aula</th>
                    </tr>
                  </thead>
                  <tbody className="tabla_usuarios">
                    
                     {listItems}
                    
                  </tbody>
                </Table>

          </Form>
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
