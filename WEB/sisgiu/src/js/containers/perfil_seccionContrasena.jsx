	// Dependencies. 
import React,{Component} from 'react';
import {Alert, Form, FormGroup, Label, Input, Button, Row, Col} from 'reactstrap';
import FontAwesomeIcon from 'react-fontawesome'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium'; //Spinner
import '../../css/global.css';

// Components
import { cambiarContrasena } from '../actions/perfilUsuario';

class SeccionContrasena extends Component{
	 
	constructor(props) {
      super(props);
      this.state = {
              showPassword: true,
              showSecondPassword: true,
              password: "",
              secondPassword: "",
              visible: true,
              loading: false,
              typing: true,
          };

      this.showTextPassword = this.showTextPassword.bind(this);
      this.showTextSecondPassword = this.showTextSecondPassword.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.changePasswordSubmit = this.changePasswordSubmit.bind(this);
      this.onDismiss = this.onDismiss.bind(this);

  	}

  	onDismiss() {
    	this.setState({ visible: false });
  	}

  	handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value, visible: true, typing: true  });
        
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
		this.setState({ 
			loading: true, 
			visible: true,
      		typing: false,
			password: '',
      		secondPassword: '',
	 	});
	 	this.props.edit['edit_password'] = false;
    	this.props.edit['bad_input_password'] = false;
        this.props.cambiarContrasena(this.state.password, this.props.token['user']);

  	}

	render(){
		return (
			<div>
	 			<br />
	              <Row>
	                <Col sm="12">
		                {this.props.edit['bad_input_password'] && !this.state.typing &&
	        		      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
					        Hubo un error al intentar cambiar su contraseña
					      </Alert>
	            		}
	            		{this.props.edit['edit_password'] && !this.state.typing &&
	        		      <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
					        Contraseña actualizada exitosamente
					      </Alert>
	            		}
	                  <legend>Contraseña</legend>
	                  <Form>
	                    {this.state.password !== this.state.secondPassword &&
	                      <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss}>
	                        Las contraseñas no coinciden
	                      </Alert>
	                    }
	                   	{(!this.props.edit['edit_password'] && this.state.typing) && (this.state.password.length < 6 || this.state.secondPassword.length < 6) &&
	                      <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss}>
	                        Las contraseñas deben tener más de 6 caracteres
	                      </Alert>
	                    }
	                    {this.state.showPassword &&
	                      <FormGroup row>
	                        <Label for="password" sm={2}>Nueva Contraseña</Label>
	                          <Col sm={8} xs={9}>
	                            <Input onChange={this.handleChange} type="password" name="password" id="password" value={this.state.password}/>
	                          </Col>
	                          <Col sm={2}>
	                            <FontAwesomeIcon className="eyes" onClick={this.showTextPassword} name="eye-slash"/>           
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
	                            <FontAwesomeIcon className="eyes" onClick={this.showTextPassword} name="eye"/>         
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
	                            <FontAwesomeIcon className="eyes" onClick={this.showTextSecondPassword} name="eye-slash"/>           
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
	                            <FontAwesomeIcon className="eyes" onClick={this.showTextSecondPassword} name="eye"/>           
	                          </Col>
	                      </FormGroup>
	                      }

	                      { this.state.loading && !this.props.edit['edit_password'] && !this.props.edit['bad_input_password'] &&
	                      	<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
	                      }


	                      {(this.state.password !== this.state.secondPassword || this.state.password.length < 6 || this.state.secondPassword.length < 6) &&
	                        <center><Button disabled color="primary">Guardar</Button></center>
	                      }

	                      {this.state.password === this.state.secondPassword && this.state.password.length >= 6 && this.state.secondPassword.length >= 6 &&
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




