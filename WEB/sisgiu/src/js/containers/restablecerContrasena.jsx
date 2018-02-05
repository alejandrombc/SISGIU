// Dependencies
import { Button, Input, Row, Col, Form, FormGroup, Label, Alert} from 'reactstrap';
import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// Components
import {check_url_olvido_contraseña} from '../actions/restablecerContraseña';


class RestablecerContrasena extends Component{      

	constructor(props) {
        super(props);

        this.state = {
	        password : '',
	        confirmation_password : ''
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    	let ruta = this.props.pathname.split('/');
    	let len_password = Object.keys(ruta).length;

    	let password = '';
    	for (var i = 3; i < len_password; i++) {
    		i + 1 === len_password ? password += ruta[i] : password += ruta[i] + '/';
    	}

        this.props.check_url_olvido_contraseña(this.props.cedula, password);
    }


    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        // this.setState({ submitted: true });
        const { cedula } = this.state;
        if (cedula) {
            this.props.recuperar(cedula);
        }
    }



	render(){
			const { password, confirmation_password } = this.state;
			
			if ( this.props.status['check_url'] ) {

				return (
					<div >
						<Form onSubmit={this.handleSubmit}>
							<Row>
								<Col lg='4' md='4' sm='3' xs='2'></Col>
								<Col md='4' sm='6' xs='8' className="border border-info border-bottom-0"> 
							        <br/>
							        <h5>Restablecer contraseña</h5>
									
							    </Col>
							    <Col lg='4' md='4' sm='3' xs='2'></Col> 
							</Row>	

							<Row>					
								<Col lg='4' md='4' sm='3' xs='2'></Col>
								<Col md='4' xs='8' sm='6' className="border border-info border-top-0 border-bottom-0"> 							       
							      	{this.props.status['bad_input'] &&
	                    		      <Alert color="danger">
								        Cédula errónea
								      </Alert>
                    				}
                    				{this.props.status['correo_enviado'] &&
	                    		      <Alert color="success">
								        Correo enviado satisfactoriamente
								      </Alert>
                    				}

                    				<hr />
							        <FormGroup>
							          <Label for="password">Contraseña</Label>
							          <Input type="password" name="contraseña" id="contraseña" value={password} required onChange={this.handleChange} placeholder="Contraseña"/> 
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
						        	<Button color="primary">Aceptar</Button>
						        	<br/><br/>
						      	</Col>
						      	<Col lg='4' md='4' sm='3' xs='2'></Col>
							</Row>

							
					    </Form>

					</div>
				)
			} else {
				return (
					<h1>PÁGINA NO ENCONTRADA</h1>
				)
			}

		}
}

const mapStateToProps = (state)=> {
	return{
		status: state.olvidoContrasena
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({check_url_olvido_contraseña: check_url_olvido_contraseña}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(RestablecerContrasena);