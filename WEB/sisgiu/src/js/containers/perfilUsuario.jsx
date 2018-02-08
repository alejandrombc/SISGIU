// Dependencies
import React, {Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

//Spinner
import { PulseLoader } from 'halogenium';

class PerfilUsuario extends Component{

  constructor(props) {
      super(props);
  }


  render(){
      return(
        <Form>
          <FormGroup row>
            <Label for="exampleEmail" sm={2}>Email</Label>
            <Col sm={10}>
              <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="examplePassword" sm={2}>Password</Label>
            <Col sm={10}>
              <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
            </Col>
          </FormGroup>
        </Form>
      )
  }
}


const mapStateToProps = (state)=> {
  return{
    token: state.activeUser,
  };
}

export default connect(mapStateToProps)(PerfilUsuario);


