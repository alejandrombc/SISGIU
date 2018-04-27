// Dependencies
import { Button, Input, Row, Col, Form, FormGroup, Label, Alert} from 'reactstrap';
import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// Components
import {check_url_recuperacion_contraseña, cambiar_contraseña} from '../actions/restablecerContrasena';

//Spinner
import { PulseLoader } from 'halogenium';

class NuevaContrasenaForm extends Component{      

	constructor(props) {
        super(props);

        this.state = {
	        password : '',
	        confirmation_password : '',
	        url_pass: '',
	        url_cedula:'',
	        loading: false,
	        visible: true,
        }


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);

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

    onDismiss() {
    	this.setState({ visible: false });
  	}

    handleChange(e) {
    	this.setState({ visible: true });
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password && this.state.confirmation_password) {
            this.setState({loading: true})
            this.props.cambiar_contraseña(this.state.password, this.state.url_cedula, this.state.url_pass);
        }
    }



	render(){
			const { password, confirmation_password } = this.state;
			
			if ( this.props.status['recuperacion'] && !this.props.status['is_init'] ) {
				return (<Redirect to={"/login"} />)
			}

			if ( this.props.status['check_url'] === true ) {

				return (
					<div >
						<Row>
							<Col lg='4' md='4' sm='3' xs='2'></Col>
							<Col md='4' sm='6' xs='8' className="shadowBox">
						<Form onSubmit={this.handleSubmit}>

							        <br/>
							        <h5>Recuperación de contraseña</h5>						       
							      	
							      	{this.state.loading &&
							      	
							      		<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
							      	}

							      	{!this.props.status['recuperacion'] && !this.props.status['is_init'] &&
	                    		      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss} >
								        No es posible restablecer su contraseña
								      </Alert>
                    				}

                    				{this.state.password !== this.state.confirmation_password &&
	                    		      <Alert color="warning" isOpen={this.state.visible} toggle={this.onDismiss} >
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
									
									<div className="text-center">
										<br />
										<Button disabled={this.state.password !== this.state.confirmation_password} color="primary">Aceptar</Button>
										<br />
										<a href='/login'>Iniciar sesión</a>
										<br/><br/>
									</div>
							
					    </Form>
							</Col>
							<Col lg='4' md='4' sm='3' xs='2'></Col>
						</Row>
					</div>
				)
			} else if ( this.props.status['check_url'] === false ) {
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