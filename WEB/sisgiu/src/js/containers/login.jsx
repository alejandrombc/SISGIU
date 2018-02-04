// Login de la pagina
import { Button, Input, Row, Col, Form, FormGroup, Label, Alert} from 'reactstrap';
import React,{Component} from 'react';
import {login} from '../actions/login.jsx';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class Login extends Component{      

	constructor(props) {
        super(props);

        if(!this.props.token['loggedIn']){
        	this.state = {
            	cedula: '',
            	password: '',
            	modulo: 'estudiantes',
        	};
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        // this.setState({ submitted: true });
        const { cedula, password, modulo } = this.state;
        if (cedula && password && modulo) {
            this.props.login(cedula, password, modulo);
        }
    }

	render(){
		
		if(!this.props.token['loggedIn']){
			const { cedula, password } = this.state;
			return (
					<div >

						<Form onSubmit={this.handleSubmit}>
							<Row>
								<Col lg='4' md='4' sm='3' xs='2'></Col>
								<Col md='4' sm='6' xs='8' className="border border-info border-bottom-0"> 
							        <br/>
							        <h5>Sesión</h5>
									
							    </Col>
							    <Col lg='4' md='4' sm='3' xs='2'></Col> 
							</Row>	

							<Row>					
								<Col lg='4' md='4' sm='3' xs='2'></Col>
								<Col md='4' xs='8' sm='6' className="border border-info border-top-0 border-bottom-0"> 
							      	{this.props.token['bad_input'] &&
	                    		      <Alert color="danger">
								        Credenciales erróneas
								      </Alert>
                    				}
                    				{this.props.token['bad_module'] &&
	                    		      <Alert color="danger">
								        Usted no pertenece a ese módulo
								      </Alert>
                    				}
							       	<hr />
									<FormGroup>
							          <Label for="exampleSelect">Módulo</Label>
							          <select name="modulo"  className="form-control" value={this.state.value} onChange={this.handleChange} >
							            <option value="estudiantes">Estudiante</option>
							            <option value="docentes">Docente</option>
							            <option value="administrativo">Administrativo</option>
							            <option value="usuarios">Administrador</option>
							          </select>
							        </FormGroup>
							    </Col>
							    <Col lg='4' md='4' sm='3' xs='2'></Col>
							    
							</Row>							
							<Row>					
								<Col lg='4' md='4' sm='3' xs='2'></Col>
								<Col md='4' xs='8' sm='6' className="border border-info border-top-0 border-bottom-0"> 							       
							        <FormGroup>
							          <Label for="username">Cédula</Label>
							          <Input type="text" name="cedula" id="cedula" value={cedula} required onChange={this.handleChange} placeholder="Ej: 11122233"/> 
							        </FormGroup>
							    </Col>
							    <Col lg='4' md='4' sm='3' xs='2'></Col>
							</Row>
							<Row>
								<Col lg='4' md='4' sm='3' xs='2' ></Col>
								<Col md='4' xs='8' sm='6' className="border border-info border-bottom-0 border-top-0">
							        <FormGroup>
							          <Label for="password">Password</Label>
							          <Input type="password" name="password" id="password" value={password} required onChange={this.handleChange} placeholder="Contraseña"/>
							        </FormGroup>
						      	</Col>
						      	<Col lg='4' md='4' sm='3' xs='2'></Col>
							</Row>
							<Row>
								<Col lg='4' md='4' sm='3' xs='2'></Col>
								<Col md='4' xs='8' sm='6' className="border border-info border-top-0 text-center">
						        	
						        	<Button color="primary">Enviar</Button>
						        	<br/>
						        	<a href='/olvido'>Olvidé mi contraseña</a>
						        	<br/><br/>
						      	</Col>
						      	<Col lg='4' md='4' sm='3' xs='2'></Col>
							</Row>

							
					    </Form>

					</div>
				)
			}
		}
}

const mapStateToProps = (state)=> {
	return{
		token: state.activeUser
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({login: login}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);