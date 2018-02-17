// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
// import {bindActionCreators} from 'redux';
import FontAwesomeIcon from 'react-fontawesome';
import { Table, Button, Row, Col, Input} from 'reactstrap';
import SearchInput, {createFilter} from 'react-search-input';
import '../../css/moduloUsuarioAdministrador.css'; 

//Spinner
// import { PulseLoader } from 'halogenium';

// Components
import ModalUsuarioEdit from './modalUsuarioEdit';

// const KEYS_TO_FILTERS = ['user', 'subject', 'dest', 'otro'];
const KEYS_TO_FILTERS = ['first_name', 'last_name', 'cedula'];

class ModuloUsuarioAdministrador extends Component{

  constructor(props) {
      super(props);
      this.state = {
        searchTerm: ''
      }
  
      this.searchUpdated = this.searchUpdated.bind(this)
  }

  searchUpdated (term) {
    this.setState({searchTerm: term})
  }

  render(){

      let json_falso = 
      [
        {
              "id": 3,
              "cedula": 21562544,
              "first_name": "Carlos",
              "segundo_nombre": null,
              "last_name": "Castilloooo",
              "segundo_apellido": null,
              "email": "carlitos@gmail.com",
              "correo_alternativo": "",
              "celular": "04165874587",
              "telefono_casa": "04165874587",
              "telefono_trabajo": "04165874587",
              "fecha_nacimiento": "1994-06-05",
              "sexo": "M",
              "nacionalidad": "Venezolano",
              "estado_civil": "Soltero",
              "foto": "http://127.0.0.1:8000/media/user_21562544/UC_Wallet.png",
              "username": "carlitos2@gmail.com",
              "password": ""
        },
        {
              "id": 2,
              "cedula": 24635905,
              "first_name": "Jose",
              "segundo_nombre": "Gabriel",
              "last_name": "Castro",
              "segundo_apellido": "Lazo",
              "email": "jose.castro.lazo@gmail.com",
              "correo_alternativo": "josegabriel_10@gmail.com",
              "celular": "04142774941",
              "telefono_casa": "02122852682",
              "telefono_trabajo": "04165874587",
              "fecha_nacimiento": "1994-06-29",
              "sexo": "M",
              "nacionalidad": "Venezolano",
              "estado_civil": "Soltero",
              "foto": "http://127.0.0.1:8000/media/user_21562545/UC_Wallet.png",
              "username": "24635905",
              "password": "123456"
        },
        {
              "id": 7,
              "cedula": 24635906,
              "first_name": "Jose",
              "segundo_nombre": "Gabriel",
              "last_name": "Castro",
              "segundo_apellido": "Lazo",
              "email": "jose.castro.lazo@gmail.com",
              "correo_alternativo": "josegabriel_10@gmail.com",
              "celular": "0414277493",
              "telefono_casa": "02122852682",
              "telefono_trabajo": "04165874587",
              "fecha_nacimiento": "1994-06-29",
              "sexo": "M",
              "nacionalidad": "Venezolano",
              "estado_civil": "Soltero",
              "foto": "http://127.0.0.1:8000/media/sisgiu/no_avatar.jpg",
              "username": "24635906",
              "password": "pbkdf2_sha256$100000$FtB8W96xTWF7$7J6mkQfsxSAFemvM1tn2iQmI4PchKBgY96y62X2m3t8="
        }
    ];


      // const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
      let listItems = '';

      let cant_usuarios = json_falso.length;
      let usuarios = [];

      for (var i = 0; i < cant_usuarios; i++) {
        usuarios.push(json_falso[i]);
      }

      const filteredUsuarios = usuarios.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));

      listItems = filteredUsuarios.map((usuario) =>
        <tr key={usuario['id']}>
          <td>{usuario['cedula']}</td>
          <td>{usuario['first_name']} {usuario['last_name']}</td>
          <td>  
            <ModalUsuarioEdit />
            {/*<Button color="success" size='sm' data-toggle="tooltip" title="Editar"><FontAwesomeIcon name="edit"/></Button>*/}
          </td>
        </tr>
      );


      return(
          <div>
            <br />
            <Row>
              <Col md='4'>
                <Button color="primary" size='sm' data-toggle="tooltip" title="Nuevo usuario"><FontAwesomeIcon name="plus"/></Button>
              </Col>
              <Col md='8'>
                {/*<Input type="search" name="search" id="usuario" placeholder="Buscar usuario..." />*/}
                <SearchInput className="searchBox" placeholder="Buscar usuario..." onChange={this.searchUpdated} />
              </Col>
            </Row>
            <br />
            <Col md='12' className='text-right'>
              
            </Col>
            <Table bordered hover responsive striped size="sm">
              <thead>
                <tr>
                  <th>Cédula</th>
                  <th>Nombre</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody className="tabla_usuarios">
                {listItems}
              </tbody>
            </Table>
        </div>
      )
  }
}


const mapStateToProps = (state)=> {
  return{
    token: state.activeUser,
  };
}

// const mapDispatchToProps = (dispatch) => {
// }


export default connect(mapStateToProps)(ModuloUsuarioAdministrador);


