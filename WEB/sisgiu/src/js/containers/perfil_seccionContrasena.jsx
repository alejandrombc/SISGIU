	// Dependencies. 
import React,{Component} from 'react';
import {Alert, Form, FormGroup, Label, Input, Button, Row, Col} from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// Aqui falta que una vez que se haya actualizado la contrasena de forma exitosa se borren los inputs y el mensaje de exito desaparezca luego de unos segundos

// Components
import { cambiarContrasena } from '../actions/perfilUsuario';

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
      // if (this.state.password) {
        	// this.setState({ loading: true });
            this.props.cambiarContrasena(this.state.password, this.props.token['user']);
        // }
  	}

	render(){
		return (
			<div>
	 			<br />
	              <Row>
	                <Col sm="12">
		                {this.props.edit['bad_input_password'] &&
	        		      <Alert color="danger">
					        Hubo un error al intentar cambiar su contraseña
					      </Alert>
	            		}
	            		{this.props.edit['edit_password'] &&
	        		      <Alert color="success">
					        Contraseña actualizada exitosamente
					      </Alert>
	            		}
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


const mapStateToProps = (state)=> {
  return{
    token: state.activeUser,
    edit: state.editUser
  };
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({cambiarContrasena: cambiarContrasena}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(SeccionContrasena);




