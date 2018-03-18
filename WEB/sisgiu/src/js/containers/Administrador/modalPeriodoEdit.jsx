import React from 'react';
import { Table, Form, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome';
import '../../../css/moduloUsuarioAdministrador.css';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// Components
import { editar_asignatura } from '../../actions/moduloAsignaturas';
import DualList from './dualList';

class ModalPeriodoEdit extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      paso: 1,
      docente_asignatura: props.docente_asignatura
    };

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateDocenteAsignatura = this.updateDocenteAsignatura.bind(this);

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    if(!this.state.modal) { this.props.onDismiss(); };
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
    this.toggle();
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


  render() {
    let listItems = '';
    if(this.state.docente_asignatura !== undefined){
        listItems = this.state.docente_asignatura.map((docente, index) =>
            <tr key={index}>
              <td>{index+1}</td>
              <td>{docente.usuario.first_name} {docente.usuario.last_name}</td>
              <td>{docente.asignatura.nombre}</td>
              <td>{docente.horario_dia}</td>
              <td>{docente.horario_hora}</td>
              <td>{docente.aula}</td>
            </tr>
          );
    }

    return (

      <div>
        <Button color="success" size='sm' onClick={this.toggle} data-toggle="tooltip" title="Editar"><FontAwesomeIcon name="edit"/></Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}> 
                Editar Periodo
          </ModalHeader>
          <Form onSubmit={this.handleSubmit}>
            <ModalBody>
              <h6>Paso {this.state.paso}: Seleccionar Asignaturas</h6>
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

            </ModalBody>
            <ModalFooter>
              <Button color="success" type="submit">Guardar</Button>{' '}              
              <Button color="secondary" onClick={this.toggle}>Salir</Button>
            </ModalFooter>
          </Form>
        </Modal>

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

export default connect(mapStateToProps, mapDispatchToProps)(ModalPeriodoEdit);
