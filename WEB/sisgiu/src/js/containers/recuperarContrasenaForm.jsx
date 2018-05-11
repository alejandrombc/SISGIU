// Login de la pagina
import { Button, Input, Row, Col, Form, FormGroup, Label, Alert} from 'reactstrap';
import React,{Component} from 'react';
import {recuperarContrasenaMail} from '../actions/recuperarContrasenaMail.jsx';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import '../../css/global.css';

//Spinner
import { PulseLoader } from 'halogenium';

class RecuperarContrasenaForm extends Component{      

	constructor(props) {
        super(props);
    	this.state = {
			cedula: '',
			tipo_documento: 'V',
        	loading: false,
        	visible: true,
    	};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
	    this.setState({ visible: false });
  	}

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

		let { cedula, tipo_documento } = this.state;
		cedula = tipo_documento + cedula;
        if (cedula) {
        	this.setState({loading: true, visible: true})
        	this.props.status['bad_input'] = false;
        	this.props.status['correo_enviado'] = false;
            this.props.recuperarContrasenaMail(cedula);
        }
    }

	render(){
			const { cedula } = this.state;
			return (
					<div >
					<Row>
					<Col lg='4' md='4' sm='3' xs='2'></Col>
					<Col md='4' sm='6' xs='8' className="shadowBox">


						<Form onSubmit={this.handleSubmit}>

							        <br/>
							        <h5>Recuperación de contraseña</h5>							       
							      	
							      	{this.state.loading && !this.props.status['bad_input'] && !this.props.status['correo_enviado'] &&
							      	
							      		<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
							      	}

							      	{this.props.status['bad_input'] &&
	                    		      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
								        Identificación errónea
								      </Alert>
                    				}
                    				{this.props.status['correo_enviado'] &&
	                    		      <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
								        Correo enviado satisfactoriamente
								      </Alert>
                    				}

                    				<hr />
							        {/* <FormGroup>
							          <Label for="cedula">Cédula o Pasaporte</Label>
							          <Input type="text" name="cedula" id="cedula" value={cedula} required onChange={this.handleChange} placeholder="Ej: 10657835"/> 
							          <font size="1">Se le enviará un correo electronico con un link para poder restablecer su contraseña</font>
							        </FormGroup> */}

									<FormGroup>
									<Label for="cedula">Cédula o Pasaporte</Label>
										<Row>
											<Col md='3'>
												<select name="tipo_documento" className="form-control" onChange={this.handleChange} >
													<option value="V">V</option>
													<option value="E">E</option>
													<option value="P">P</option>
												</select>

											</Col>
											<Col md='9'>
												<Input type="text" name="cedula" id="cedula" value={cedula} required onChange={this.handleChange} placeholder="Ej: 10987658" />
											</Col>
										</Row>
									</FormGroup>
									<font size="1">Se le enviará un correo electronico con un link para poder restablecer su contraseña</font>
									
									<div className="text-center">
										<Button color="primary">Restablecer</Button>
										<br/>
										<a href='/login'>Iniciar sesión</a>
										<br/><br/>
									</div>

							
					    </Form>
					</Col>
					<Col lg='4' md='4' sm='3' xs='2'></Col> 
					</Row>
					</div>
				)
		}
}

const mapStateToProps = (state)=> {
	return{
		status: state.recuperarContrasena
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({recuperarContrasenaMail: recuperarContrasenaMail}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(RecuperarContrasenaForm);