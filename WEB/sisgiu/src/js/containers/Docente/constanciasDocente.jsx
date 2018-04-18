//Dependencies
import React,{Component} from 'react';
import { connect } from 'react-redux';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import {host} from '../../components/globalVariables';
import request from 'superagent';
import {bindActionCreators} from 'redux';
import { PulseLoader } from 'halogenium';


// Components
import { 
    cargado,
    } from '../../actions/inicio';


class ConstanciaDocente extends Component{
	
	constructor(props) {
   		super(props);
   		this.state ={
   			cargando: false,
   		}
   		this.get_constancia = this.get_constancia.bind(this);
   		this.get_file = this.get_file.bind(this);
   	}
    
	componentDidMount() {
		this.props.cargado();
  	}

  	get_file(constancia, cedula, token){
		return request
		   .get(host+'api/constancias/'+constancia+'/'+cedula+'/')
		   .set('Authorization', 'JWT '+token)
		   .then(function(res) {
			    var blob=new Blob([res.text]);
			    var link=document.createElement('a');
			    link.href=window.URL.createObjectURL(blob);
			    link.download="constancia_"+cedula+".pdf";
			    link.click();
			    
		   })
		   .catch(function(err) {
		   		alert("Error al crear la constancia");
		   		
		});
  	}

  	// Constancias
	get_constancia(constancia,cedula) {
		let token = localStorage.getItem('user_token');
		this.setState({"cargando":true}, 
			() => this.get_file(constancia,cedula,token)
			.then(
				() => {
					this.setState({"cargando":false});
				}
			)
		);

		
	};
	

	render(){
		  return (
		  	<div>
			  	<h4>Constancias</h4>
			  	<hr />
			  	{this.state.cargando &&
			  		<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
			  	}
			    <Row>
			      <Col sm="6">
			        <Card body>
			          <CardTitle>Constancia de docencia</CardTitle>
			          <CardText>Cualquier información que necesitemos para describir la constancia. Idealmente que sean del mismo tamaño</CardText>
			          <Button onClick={() => this.get_constancia("estudio", this.props.activeUser.user.usuario.cedula)}>Descargar</Button>
			        </Card>
			      </Col>
			      <Col sm="6">
			        <Card body>
			          <CardTitle>Constancia de docencia</CardTitle>
			          <CardText>Cualquier información que necesitemos para describir la constancia. Idealmente que sean del mismo tamaño</CardText>
			          <Button onClick={() => this.get_constancia("estudio", this.props.activeUser.user.usuario.cedula)}>Descargar</Button>
			        </Card>
			      </Col>
			    </Row>
			    <br />
			   	<Row>
			      <Col sm="6">
			        <Card body>
			          <CardTitle>Constancia de docencia</CardTitle>
			          <CardText>Cualquier información que necesitemos para describir la constancia. Idealmente que sean del mismo tamaño</CardText>
			          <Button onClick={() => this.get_constancia("estudio", this.props.activeUser.user.usuario.cedula)}>Descargar</Button>
			        </Card>
			      </Col>
			      <Col sm="6">
			        <Card body>
			          <CardTitle>Constancia de docencia</CardTitle>
			          <CardText>Cualquier información que necesitemos para describir la constancia. Idealmente que sean del mismo tamaño</CardText>
			          <Button onClick={() => this.get_constancia("estudio", this.props.activeUser.user.usuario.cedula)}>Descargar</Button>		        
			        </Card>
			      </Col>
			    </Row>
			</div>
		  );
	}

}

const mapStateToProps = (state)=> {
	return{
		activeUser: state.activeUser,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
	    cargado: cargado,
  	}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(ConstanciaDocente);




