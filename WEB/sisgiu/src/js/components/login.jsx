// Login de la pagina
import { Button, Input, Row, Col, Form, FormGroup, Label } from 'reactstrap';
import React,{Component} from 'react';
import {login} from '../actions/login.jsx';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

class Login extends Component{  	

	render(){

		return (
				<div >

					<Form >
						<Row>
							<Col lg='4' md='4' sm='4' xs='4'></Col>
							<Col md='4' className="border border-info border-bottom-0"> 
						        <br/>
						        <h5>Sesión</h5>
								
						    </Col>
						    <Col lg='4' md='4' sm='4' xs='4'></Col> 
						</Row>
						<Row>
							<Col lg='4' md='4' sm='4' xs='4'></Col>
							<Col md='4' className="border border-info border-top-0 border-bottom-0"> 
						        <hr/>
						        <FormGroup>
						          <Label for="cedula">Cedula</Label>
						          <Input type="text" name="cedula" id="cedula" placeholder="Ej: 11122233" /> 
						        </FormGroup>
						    </Col>
						    <Col lg='4' md='4' sm='4' xs='4'></Col>
						</Row>
						<Row>
							<Col lg='4' md='4' sm='4' xs='4' ></Col>
							<Col md='4' className="border border-info border-bottom-0 border-top-0">
						        <FormGroup>
						          <Label for="password">Password</Label>
						          <Input type="password" name="password" id="password" placeholder="contraseña" />
						        </FormGroup>
					      	</Col>
					      	<Col lg='4' md='4' sm='4' xs='4'></Col>
						</Row>
						<Row>
							<Col lg='4' md='4' sm='4' xs='4'></Col>
							<Col md='4' className="border border-info border-top-0 text-center">
					        	
					        	<Button color="primary" onClick={() => this.props.login()}>Enviar</Button>
					        	<br/>
					        	<a href='#'>Olvidé mi contraseña</a>
					        	<br/><br/>
					      	</Col>
					      	<Col lg='4' md='4' sm='4' xs='4'></Col>
						</Row>

						
				    </Form>

				</div>
			)
	}


}

const mapStateToProps = (state)=> {
	return{}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({login: login }, dispatch )
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
