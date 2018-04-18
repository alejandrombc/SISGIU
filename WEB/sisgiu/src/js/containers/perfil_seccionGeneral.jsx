// Dependencies. 
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Alert, Form, FormGroup, Label, Input, Button, Row, Col} from 'reactstrap';
import { editarUsuario } from '../actions/perfilUsuario';
import {bindActionCreators} from 'redux';
import { PulseLoader } from 'halogenium'; //Spinner

// Components
import { 
    cargado,
    } from '../actions/inicio';


class SeccionGeneral extends Component{
	 
	constructor(props) {
      super(props);
      this.state = {
      		"usuario":{
      			email:this.props.token['user']['usuario']['email'],
	      		celular:this.props.token['user']['usuario']['celular'],
	      		telefono_casa:this.props.token['user']['usuario']['telefono_casa'],
	      		telefono_trabajo:this.props.token['user']['usuario']['telefono_trabajo'],
	      		fecha_nacimiento:this.props.token['user']['usuario']['fecha_nacimiento']
	      	},
      		direccion:this.props.token['user']['direccion'],
      		loading:false,
      		modulo: localStorage.getItem('modulo'),
      		visible: true,
      		typing: true
          };

      this.handleChangeUsuario = this.handleChangeUsuario.bind(this);
      this.handleChangeExtraData = this.handleChangeExtraData.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onDismiss = this.onDismiss.bind(this);

      

  	}

	onDismiss() {
		this.setState({ visible: false });
	}

	componentDidMount() {
		this.props.cargado();
  	}

  	handleChangeUsuario(e) {
        const { name, value } = e.target;
		var usuario = this.state.usuario;
		usuario[name] = value;
		this.setState({usuario, typing: true, visible: false})
		this.setState({  });
	}

	handleChangeExtraData(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value, typing: true, visible: false});
        
	}

    handleSubmit(e) {
        e.preventDefault();

        if (this.state.usuario.email) {
        	this.setState({ loading: true, visible: true, typing: false });
        	this.props.edit['edit'] = false;
        	this.props.edit['bad_input'] = false;
            this.props.editarUsuario(this.state, this.props.token['user']);
        }
    }


	render(){
			if(this.props.token){
				var nombres = this.props.token['user']['usuario']['first_name'];
				if(this.props.token['user']['usuario']['segundo_nombre']){
					nombres += " "+this.props.token['user']['usuario']['segundo_nombre']
				}
				var apellidos = this.props.token['user']['usuario']['last_name'];
				if(this.props.token['user']['usuario']['segundo_apellido']){
					apellidos += " "+this.props.token['user']['usuario']['segundo_apellido']
				}
				var nombre_completo = nombres + " " + apellidos;
				return (
				<div>
				  	<br />
	              	<Row>
		                <Col sm="12">
		                    {this.props.edit['bad_input'] && !this.state.typing &&
                		      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
						        Hubo un error al actualizar sus datos
						      </Alert>
                    		}
                    		{this.props.edit['edit'] && !this.state.typing &&
                		      <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
						        Datos actualizados exitosamente
						      </Alert>
                    		}
		                  <legend>Perfil</legend>
		                  <Form onSubmit={this.handleSubmit}>
		                    <FormGroup row>
		                      <Label for="first_name" sm={2}>Nombre</Label>
		                      <Col sm={10}>
		                        <Input type="text" name="first_name" id="first_name" readOnly value={nombre_completo} />
		                      </Col>
		                    </FormGroup>
		                    <FormGroup row>
		                      <Label for="email" sm={2}>Correo</Label>
		                      <Col sm={10}>
		                        <Input type="email" name="email" id="email"  onChange={this.handleChangeUsuario} value={this.state.usuario.email} />
		                      </Col>
		                    </FormGroup>
		                    <FormGroup row>
		                      <Label for="fecha_nacimiento" sm={2}>Nacimiento</Label>
		                      <Col sm={10}>
		                        <Input type="date" name="fecha_nacimiento" id="fecha_nacimiento" readOnly onChange={this.handleChangeUsuario} value={this.state.usuario.fecha_nacimiento} />
		                      </Col>
		                    </FormGroup>
		                    <FormGroup row>
		                      <Label for="Celular" sm={2}>Celular</Label>
		                      <Col sm={10}>
		                        <Input type="number" name="celular" id="celular" onChange={this.handleChangeUsuario} value={this.state.usuario.celular} />
		                      </Col>
		                    </FormGroup>
		                    <FormGroup row>
		                      <Label for="telefono_casa" sm={2}>Tlf. Casa</Label>
		                      <Col sm={10}>
		                        <Input type="number" name="telefono_casa" id="telefono_casa" onChange={this.handleChangeUsuario} value={this.state.usuario.telefono_casa} />
		                      </Col>
		                    </FormGroup>
		                    <FormGroup row>
		                      <Label for="telefono_trabajo" sm={2}>Tlf. Trabajo</Label>
		                      <Col sm={10}>
		                        <Input type="number" name="telefono_trabajo" id="telefono_trabajo" onChange={this.handleChangeUsuario} value={this.state.usuario.telefono_trabajo} />
		                      </Col>
		                    </FormGroup>
		                    <FormGroup row>
		                      <Label for="estado_civil" sm={2}>Estado Civil</Label>
		                      <Col sm={10}>
		                        <Input value={this.state.value} defaultValue={this.props.token['user']['usuario']['estado_civil']} onChange={this.handleChangeUsuario} type="select" name="estado_civil" id="estado_civil">
		                          <option value="Soltero" name="Soltero">Soltero</option>
		                          <option value="Casado" name="Casado">Casado</option>
		                          <option value="Viudo" name="Viudo">Viudo</option>
		                          <option value="Divorciado" name="Divorciado">Divorciado</option>
		                        </Input>
		                      </Col>
		                    </FormGroup>
	


		                    { this.state.modulo === 'estudiantes' &&
                      			
                      			<FormGroup row>
                              		<Label for="direccion" sm={2}>Dirección</Label>
                              		<Col sm={10}>
                                		<Input type="textarea" name="direccion" id="direccion" onChange={this.handleChangeExtraData} value={this.state.direccion} />
                              		</Col>
                          		</FormGroup>

                      		}

							{ this.state.modulo === 'docentes' &&
								<div>
								  <FormGroup row>
								      <Label for="direccion" sm={2}>Dirección</Label>
								      <Col sm={10}>
								        <Input type="textarea" name="direccion" id="direccion" onChange={this.handleChangeExtraData} value={this.state.direccion} />
								      </Col>
								  </FormGroup>

								  <FormGroup row>
								      <Label for="rif" sm={2}>RIF</Label>
								      <Col sm={10}>
								        <a href={this.props.token['user']['rif']} target='_blank'><Button type='button' color="info" size='sm' name="rif"> Descargar </Button> </a>
								      </Col>
							      </FormGroup>

								  <FormGroup row>
								      <Label for="curriculum" sm={2}>Curriculum</Label>
								      <Col sm={10}>
								        <a href={this.props.token['user']['curriculum']} target='_blank'><Button type='button' color="info" size='sm' name="curriculum" > Descargar </Button> </a>
								      </Col>
								  </FormGroup>
								</div>
							}


							{ this.state.loading && !this.props.edit['edit'] && !this.props.edit['bad_input'] &&
								<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
							}


		                    <center><Button color="primary">Guardar</Button></center>
		                  </Form>
		                </Col>
	              	</Row>
	            </div>
				)
			}else{
				return (<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>)
			}
	}
}

const mapStateToProps = (state)=> {
  return{
    token: state.activeUser,
    edit: state.editUser
  };
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({editarUsuario: editarUsuario, cargado: cargado}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(SeccionGeneral);




