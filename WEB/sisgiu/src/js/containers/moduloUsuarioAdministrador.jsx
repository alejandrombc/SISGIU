// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import FontAwesomeIcon from 'react-fontawesome';
import { Table, Alert, Button, Row, Col, Input} from 'reactstrap';
import SearchInput, {createFilter} from 'react-search-input'

//Spinner
import { PulseLoader } from 'halogenium';

const KEYS_TO_FILTERS = ['user', 'subject', 'dest']
const emails = [
        {
          "id":1,
          "user":"Alejandro",
          "subject":"Test",
          "dest":"Gregorio"
        },
        {
          "id":2,
          "user":"Gregorio",
          "subject":"Test22",
          "dest":"Alejandro"
        },
      ]

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
      const filteredEmails = emails.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS));
      let listItems = '';
      const variable = filteredEmails.map((valor, index) => {
                return(
                  <div>
                    <h5>{valor['user']}</h5>
                    <h5>{valor['subject']}</h5>
                  </div>
                )
            });
      return(
          <div>
            <br />
            <Row>
              <Col md='4'>
                <SearchInput className="search-input" onChange={this.searchUpdated} />
                <Button color="primary" size='sm' data-toggle="tooltip" title="Agregar"><FontAwesomeIcon name="plus"/></Button>
              </Col>
              <Col md='8'>
                <Input type="text" name="text" id="usuario" placeholder="Buscar usuario..." />
              </Col>
              {variable}
            </Row>
            <br />
            <Table bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cedula</th>
                  <th>Nombre</th>
                  <th>Tipo</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>24206267</td>
                  <td>Alejandro Barone</td>
                  <td>Doctorado</td>
                  <td>  
                    <Button color="success" size='sm' data-toggle="tooltip" title="Editar"><FontAwesomeIcon name="edit"/></Button>
                    {' '}
                    <Button color="danger" size='sm' data-toggle="tooltip" title="Eliminar"><FontAwesomeIcon name="trash-alt"/></Button>
                  </td>
                </tr>
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

const mapDispatchToProps = (dispatch) => {
}


export default connect(mapStateToProps)(ModuloUsuarioAdministrador);


