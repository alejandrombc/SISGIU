// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Button, Input, Form, FormGroup, Alert, Table, Row, Col } from 'reactstrap';
import SearchInput, {createFilter} from 'react-search-input';
import '../../../css/moduloUsuarioAdministrador.css'; 
import {bindActionCreators} from 'redux';
import { PulseLoader } from 'halogenium'; //Spinner

//Components
import Paginacion from '../../components/pagination';

import { cargado } from '../../actions/inicio';
import { get_estudiantes } from '../../actions/inicioDocente';


const KEYS_TO_FILTERS = ['first_name', 'last_name', 'cedula'];
const usuarios_por_pagina = 10;


class ListaUsuarios extends Component{

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      searchTerm: '',
      loading: false,
      usuarios:[],
    }
    
    this.searchUpdated = this.searchUpdated.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setUsuarios(){
    //Al montarse el componente, creo el state con todos los estudiantes y sus notas
    if(this.props.docenteUser.estudiantes){
      let usuarios = []
      let N = this.props.docenteUser.estudiantes.length;
      for (var i = 0; i < N; i++) {
        if(this.props.docenteUser.estudiantes[i] !== undefined){
          usuarios.push({
            cedula: this.props.docenteUser.estudiantes[i].cedula,
            nota_definitiva: this.props.docenteUser.estudiantes[i].nota_definitiva 
          });
        }
      }
      this.setState({usuarios:usuarios});
      
    }
    this.props.cargado()
  }

  componentDidMount() {
    this.props.get_estudiantes(this.props.asignatura, this.props.tipo_postgrado)
        .then( () => this.setUsuarios() );
  }


  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  componentWillReceiveProps(props) { 
    this.setState({"visible":true});
  }

  handleSubmit(e){
    e.preventDefault();

    console.log(this.state);
    //Falta hacer el endpoint que tome el state.usuarios y el periodo actual y actualice EstudianteAsignatura (facil creo)
  }

  handleChange(e) {
    const { name, value } = e.target;
    let N = this.state.usuarios.length;
    let new_usuarios = this.state.usuarios;

    // Itero sobre todo los usuarios de la asignatura
    for (var i = 0; i < N; i++){
      //Si encuentro el valor, coloco la nueva nota
      if (new_usuarios[i].cedula === name){
          new_usuarios[i].nota_definitiva = parseInt(value, 10);
          break;
      }
    }

    this.setState({ usuarios: new_usuarios });  
  }


  render(){
    if (!this.props.activeUser.cargado) {
      return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>);
    } else {
      if(this.props.docenteUser.estudiantes && this.props.docenteUser.estudiantes.length > 0){
        let listItems = '';
        let cant_usuarios = this.props.docenteUser.estudiantes.length;
        let usuarios = [];

        var init = this.props.pagination.pagina*usuarios_por_pagina-usuarios_por_pagina;
        var end = this.props.pagination.pagina*usuarios_por_pagina;

        //Si se esta realizando una busqueda uso toda la lista de usuario, sino no
        if(this.state.searchTerm === ''){
          
          for (var i = init; i < end; i++) {
            if (this.props.docenteUser.estudiantes[i]) {
              usuarios.push(this.props.docenteUser.estudiantes[i]);
              
            }
          }

        } else {
          for (i = 0; i < cant_usuarios; i++) {
              usuarios.push(this.props.docenteUser.estudiantes[i]);
          }
        }




        const filteredUsuarios = usuarios.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

        listItems = filteredUsuarios.map((usuario) =>
          <tr key={usuario['cedula']}>
            <td>{usuario['cedula']}</td>
            <td>{usuario['first_name']} {usuario['last_name']}</td>
            <td>  
              <Row >
                  <FormGroup row>

                    <Col md={{ size: 'auto', offset: 3 }} className='botones'>
                    {usuario['retirado'] ?
                     <Input bsSize="sm" type="text" max="20" name="nota_final" id="nota_final" onChange={this.handleChange} defaultValue="RET" readOnly disabled/>
                    :
                     <Input bsSize="sm" type="number" max="20" name={usuario['cedula']} id="nota_final" onChange={this.handleChange} defaultValue={usuario['nota_definitiva']} required/>                      
                    }
                    </Col>
                  </FormGroup>
              </Row>
            </td>
          </tr>
        );


        return(
        <div>
              <br />
              {this.state.loading && !this.props.docenteUser['edit'] && !this.props.docenteUser['bad_input'] &&

                <center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>

              }

              {this.props.docenteUser['edit'] &&
                <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
                    Datos actualizados exitosamente
                </Alert> 
              }
              {this.props.docenteUser['bad_input'] === true &&
                  <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
                      Ha ocurrido un error
                  </Alert>
              }
              <Row>
                <Col md='12'>
                  <SearchInput className="searchBox" placeholder="Buscar usuario..." onChange={this.searchUpdated} />
                </Col>
              </Row>
              <br />
              <Col md='12' className='text-right'>
                
              </Col>
              <Form onSubmit={this.handleSubmit}>
                <Table bordered hover responsive striped size="sm">
                  <thead>
                    <tr>
                      <th>Cédula</th>
                      <th>Nombre</th>
                      <th>Calificación</th>
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
                    <Paginacion cant_items={cant_usuarios} item_por_pagina={usuarios_por_pagina}/>
                  }
                </Col>
                <Col lg='4' md='4' sm='3' xs='1'> </Col>
              </Row>
              <br />
              <br />
                <Button className="float-right" color="success" type="submit">Guardar</Button>{' '}
              </Form>   
        </div>
        )
      }else{
        return (
            <div>
              <br/>
              <Row>
                <Col md='12'>
                  <center>
                  <h4>No existe ningún estudiante en esa asignatura</h4>
                  </center>
                </Col>
              </Row>
            </div>
          )
      }
    }
  }
}


const mapStateToProps = (state)=> {
  return{
    docenteUser: state.docenteUser,
    pagination: state.paginacion,
    activeUser: state.activeUser
  };
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    get_estudiantes: get_estudiantes,
    cargado: cargado,
  }, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(ListaUsuarios);


