// Dependencies. 
import React,{Component} from 'react';
import {Alert, Form, FormGroup, Label, Input, Button, Row, Col} from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome'

class SeccionContrasena extends Component{
	 
	constructor(props) {
      super(props);
      this.state = {
              showPassword: true,
              showSecondPassword: true,
              password: "",
              secondPassword: ""

          };

      this.showTextPassword = this.showTextPassword.bind(this);
      this.showTextSecondPassword = this.showTextSecondPassword.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.changePasswordSubmit = this.changePasswordSubmit.bind(this);

  	}

  	handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        
	}

	showTextPassword(e) {
		this.setState({ showPassword : !this.state.showPassword });
		e.preventDefault()
	} 

	showTextSecondPassword(e) {
		this.setState({ showSecondPassword : !this.state.showSecondPassword });
		e.preventDefault()
	} 


	changePasswordSubmit(){
      alert("Cambio exitoso");
  	}

	render(){
		return (
			<div>
	 			<br />
	              <Row>
	                <Col sm="12">
	                  <legend>Contraseña</legend>
	                  <Form>
	                  <br />
	                    {this.state.password !== this.state.secondPassword &&
	                      <Alert color="warning">
	                        Las contraseñas no coinciden
	                      </Alert>
	                    }
	                    {this.state.showPassword &&
	                      <FormGroup row>
	                        <Label for="password" sm={2}>Nueva Contraseña</Label>
	                          <Col sm={8} xs={9}>
	                            <Input onChange={this.handleChange} type="password" name="password" id="password" value={this.state.password}/>
	                          </Col>
	                          <Col sm={2}>
	                            <a href=""><FontAwesomeIcon onClick={this.showTextPassword} name="eye-slash"/></a>           
	                          </Col>
	                      </FormGroup>
	                      }

	                      {!this.state.showPassword &&
	                        <FormGroup row>
	                        <Label for="password" sm={2}>Nueva Contraseña</Label>
	                          <Col sm={8} xs={9}>
	                            <Input onChange={this.handleChange} type="text" name="password" id="password" value={this.state.password} />
	                          </Col>
	                          <Col sm={2}>
	                            <a href=""><FontAwesomeIcon onClick={this.showTextPassword} name="eye"/></a>           
	                          </Col>
	                      </FormGroup>

	                      }

	                      {this.state.showSecondPassword &&
	                      <FormGroup row>
	                        <Label for="repeat_password" sm={2}>Repetir Contraseña</Label>
	                          <Col sm={8} xs={9}>
	                            <Input onChange={this.handleChange} type="password" name="secondPassword" id="secondPassword" value={this.state.secondPassword} />
	                          </Col>
	                          <Col sm={2}>
	                            <a href=""><FontAwesomeIcon onClick={this.showTextSecondPassword} name="eye-slash"/></a>           
	                          </Col>
	                      </FormGroup>
	                      }

	                      {!this.state.showSecondPassword &&
	                      <FormGroup row>
	                        <Label for="repeat_password" sm={2}>Repetir Contraseña</Label>
	                          <Col sm={8} xs={9}>
	                            <Input onChange={this.handleChange} type="text" name="secondPassword" id="secondPassword" value={this.state.secondPassword} />
	                          </Col>
	                          <Col sm={2}>
	                            <a href=""><FontAwesomeIcon onClick={this.showTextSecondPassword} name="eye"/></a>           
	                          </Col>
	                      </FormGroup>
	                      }

	                      {this.state.password !== this.state.secondPassword &&
	                        <center><Button disabled color="primary">Guardar</Button></center>
	                      }

	                      {this.state.password === this.state.secondPassword &&
	                        <center><Button onClick={this.changePasswordSubmit} color="primary">Guardar</Button></center>
	                      }
	                  </Form>
	                </Col>
	              </Row>
              </div>
			)
	}
}

export default (SeccionContrasena);




