// Dependencies. 
import React,{Component} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import { Alert, Form, FormGroup, Input, Button, Row, Col} from 'reactstrap';
import '../../css/perfil.css';

// Components
import { cambiarFoto } from '../actions/perfilUsuario';

class SeccionFoto extends Component{
	 
	constructor(props) {
      super(props);
      this.state = {
      	foto: undefined,
      	visible: true,
      };

      this.handleChange = this.handleChange.bind(this);
      this.changePhotoSubmit = this.changePhotoSubmit.bind(this);
      this.onDismiss = this.onDismiss.bind(this);

  	}

  	onDismiss() {
	    this.setState({ visible: false });
	  }

  	handleChange(e) {
		this.setState({foto:e.target.files[0]})
        
	}

	changePhotoSubmit(e) {
		e.preventDefault() // Stop form submit
		this.props.cambiarFoto(this.state.foto, this.props.token['user'])
	}


	render(){
		return (
			<div>
			  	<br />
              	<Row>
	                <Col sm="12">
	                  <legend>Foto</legend>
	                  <Form onSubmit={this.changePhotoSubmit}>
	                    <FormGroup row>
	                     
	                      <Col sm={12}>
	                      <br />
		                    {this.props.edit['bad_photo_request'] &&
		        		      <Alert color="danger" isOpen={this.state.visible} toggle={this.onDismiss}>
						        Hubo un error al intentar actualizar su foto
						      </Alert>
		            		}
	                      <br />
	                      	<h5>Normas para actualizar su foto</h5>
								<ul>
									<li>
										Recuerde que esta foto será utilizada con fines académicos, {' '}
										<b>
										se tomarán sanciones con cualquier mala intención o engaño relacionado con esta foto
										</b>
										.
									</li>
									<li>
										Foto tipo carnet con <b>fondo blanco</b>
									</li>
									<li>
										El archivo debe pesar menos de {' '}
										<b>500 kB</b>{' '}
										y estar en formato {' '}
										<b>JPG o PNG</b>.
									</li>
									<li>
										Evite el uso de sombreros, gorras y lentes.
									</li>
									<li>
										La foto debe ser de frente y el área de la cara visible (Ver ejemplos).
									</li>
								</ul>
								<center><p>Ejemplos</p></center>
								<table align="center" width="100%">
									<tbody>
										<tr>
											<td align="center">
												<img alt="Foto mujer" src="http://conest.ciens.ucv.ve/webapp/assets/foto_mujer-2012fa4fc80b0be0d01176448c02f014.png" width="80" />
											</td>
											<td align="center">
												<img alt="Foto hombre" src="http://conest.ciens.ucv.ve/webapp/assets/foto_hombre-414066f3e0555344aacab8c43575b281.png" width="80" />
											</td>
										</tr>
									</tbody>
								</table>
							<br /><br /><br />
	                        <Input className="form-control" accept="image/png image/jpg" type="file" name="foto" id="foto" onChange={this.handleChange} />
	                      </Col>
	                    </FormGroup>
	                    <center><Button type="submit" color="primary" >Guardar</Button></center>
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
  return bindActionCreators({
    cambiarFoto:cambiarFoto,
    }
    , dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(SeccionFoto);




