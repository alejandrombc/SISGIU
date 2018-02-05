// Dependencies
import { Button, Input, Row, Col, Form, FormGroup, Label, Alert} from 'reactstrap';
import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Components
import {check_url_recuperacion_contraseña, cambiar_contraseña} from '../actions/restablecerContrasena';


class NuevaContrasenaForm extends Component{      

	constructor(props) {
        super(props);

        this.state = {
	        password : '',
	        confirmation_password : '',
	        url_pass: '',
	        url_cedula:'',
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    	let ruta = this.props.pathname.split('/');
    	let len_password = Object.keys(ruta).length;

    	let password = '';
    	for (var i = 3; i < len_password; i++) {
    		i + 1 === len_password ? password += ruta[i] : password += ruta[i] + '/';
    	}

        this.props.check_url_recuperacion_contraseña(this.props.cedula, password);

        this.state.url_pass = password;
        this.state.url_cedula = this.props.cedula;
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password && this.state.confirmation_password) {
            this.props.cambiar_contraseña(this.state.password, this.state.url_cedula, this.state.url_pass);
        }
    }



	render(){
			const { password, confirmation_password } = this.state;
			
			if ( this.props.status['recuperacion'] && !this.props.status['is_init'] ) {
				return (<Redirect to={"/login"} />)
			}

			if ( this.props.status['check_url'] == true ) {

				return (
					<div >
						<Form onSubmit={this.handleSubmit}>
							<Row>
								<Col lg='4' md='4' sm='3' xs='2'></Col>
								<Col md='4' sm='6' xs='8' className="border border-info border-bottom-0"> 
							        <br/>
							        <h5>Recuperación de contraseña</h5>
									
							    </Col>
							    <Col lg='4' md='4' sm='3' xs='2'></Col> 
							</Row>	

							<Row>					
								<Col lg='4' md='4' sm='3' xs='2'></Col>
								<Col md='4' xs='8' sm='6' className="border border-info border-top-0 border-bottom-0"> 							       
							      	{!this.props.status['recuperacion'] && !this.props.status['is_init'] &&
	                    		      <Alert color="danger">
								        No es posible restablecer su contraseña
								      </Alert>
                    				}

                    				{this.state.password !== this.state.confirmation_password &&
	                    		      <Alert color="warning">
								        Las contraseñas no coinciden
								      </Alert>
                    				}

                    				<hr />
							        <FormGroup>
							          <Label for="password">Contraseña</Label>
							          <Input type="password" name="password" id="password" value={password} required onChange={this.handleChange} placeholder="Contraseña"/> 
							        </FormGroup>

							        <FormGroup>
							          <Label for="confirmation_password">Repite tu contraseña</Label>
							          <Input type="password" name="confirmation_password" id="confirmation_password" value={confirmation_password} required onChange={this.handleChange} placeholder="Repite tu contraseña"/> 
							        </FormGroup>
							    </Col>
							    <Col lg='4' md='4' sm='3' xs='2'></Col>
							</Row>
							<Row>
								<Col lg='4' md='4' sm='3' xs='2'></Col>
								<Col md='4' xs='8' sm='6' className="border border-info border-top-0 text-center">
						        	<br />
						        	{this.state.password !== this.state.confirmation_password &&
						        		<Button disabled color="primary">Aceptar</Button>
						       		}

						       		{this.state.password === this.state.confirmation_password &&
						        		<Button color="primary">Aceptar</Button>
						       		}
						        	<br/><br/>
						      	</Col>
						      	<Col lg='4' md='4' sm='3' xs='2'></Col>
							</Row>

							
					    </Form>

					</div>
				)
			} else if ( this.props.status['check_url'] == false ) {
				console.log('jdkakdnadkjANDKnak');
				return (<Redirect to={"/login"} />)
			} else {
				return (
					<h1>Cargando...</h1>
				)
			}

		}
}

const mapStateToProps = (state)=> {
	return{
		status: state.recuperarContrasena
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({check_url_recuperacion_contraseña: check_url_recuperacion_contraseña, cambiar_contraseña: cambiar_contraseña}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(NuevaContrasenaForm);