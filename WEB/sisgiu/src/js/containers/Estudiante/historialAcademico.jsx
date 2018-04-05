//Dependencies
import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import { Table, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';
import '../../../css/inicio.css'; 
import {Doughnut} from 'react-chartjs-2';

//Components
import { cargado, get_historial} from '../../actions/inicio';


class HistorialAcademico extends Component{

	constructor(props) {
   		super(props);
   		this.state = {
   			periodos: "",
   			data : 
   			{
				labels: [
					'Aprobadas',
					'Reprobadas',
					'Retiradas',
				],
				datasets: [{
					data: [],
					backgroundColor: [
					'#2EFE2E',
					'#FE2E2E',
					'#FFCE56'
					],
					hoverBackgroundColor: [
					'#00FF00',
					'#DF0101',
					'#ffc73d'
					]
				}]
   			}
   		}
   		this.get_listPeriodos = this.get_listPeriodos.bind(this);
    }

  	get_listPeriodos(){
  		if(this.props.estudianteUser.historial_academico.periodos){
	  		let listItems = this.props.estudianteUser.historial_academico.periodos.map((historial, i) => {
	        return (
	        <div key={i}>
				<center><h6>Periodo: {historial[0].periodo}</h6></center>
				<Table bordered hover responsive striped size="sm">
	              <thead>
	                <tr className="text-center">
	                  <th>Asignatura</th>
	                  <th>Tipo</th>
	                  <th>UC</th>
	                  <th>Nota</th>
	                </tr>
	              </thead>
	              <tbody className="tabla_usuarios">
	                    {
                            historial.map((periodo, index) => {
                                return (
                                <tr className="text-center" key={index}>
							        <td className="text-left asignatura_td">({periodo.asignatura_codigo}) {periodo.asignatura_nombre}</td>
							        <td className="tipo_asignatura_td">{periodo.tipo_asignatura}</td>
							        <td className="unidad_credito_td">{periodo.unidad_credito}</td>
							        <td className="nota_definitiva_td">{periodo.nota_definitiva}</td>
							    </tr>	                            
                            )}) 
	                    }
					</tbody>
				</Table>
				<br />
			</div>
	        )
	    	})	

	  		let data = this.state.data;

	  		data.datasets[0].data = [this.props.estudianteUser.historial_academico.asignaturas_aprobadas, 
	  								this.props.estudianteUser.historial_academico.asignaturas_reprobadas,
	  								this.props.estudianteUser.historial_academico.asignaturas_retiradas, 
	  								];

	  		this.setState({periodos: listItems, data: data});
	  		this.props.cargado();
	  	}
  	}

  	componentDidMount() {
    	this.props.get_historial()
        	.then( () => this.get_listPeriodos() );
  	}

	render(){
		if (!this.props.activeUser.cargado) {
			return (
				<center><PulseLoader color="#b3b1b0" size="16px" margin="4px"/></center>
			)
		} else {
			return (
		        <div>
		          <h4>Historial Académico</h4>
		          	<hr />
		          	<br />
		          	<p>Datos del Estudiante</p>
		          	<Table bordered hover responsive striped size="sm" className="text-center">
		              <thead>
		                <tr>
		                  <th>Promedio General</th>
		                  <th>Promedio Ponderado</th>
		                  <th>Aprobadas</th>
		                  <th>Retiradas</th>
		                  <th>Reprobadas</th>
		                  <th>Total</th>
		                </tr>
		              </thead>
		              
		              <tbody className="tabla_usuarios">
		                 <tr key="1">
					        <td>{this.props.estudianteUser.historial_academico.promedio_general}</td>
					        <td>{this.props.estudianteUser.historial_academico.promedio_ponderado}</td>
					        <td>{this.props.estudianteUser.historial_academico.asignaturas_aprobadas}</td>
					        <td>{this.props.estudianteUser.historial_academico.asignaturas_retiradas}</td>
					        <td>{this.props.estudianteUser.historial_academico.asignaturas_reprobadas}</td>
							<td>{this.props.estudianteUser.historial_academico.total_asignaturas}</td>
					    </tr>  
		              </tbody>
		            </Table>
		          	<hr />


		          	<Row>

		          		<Col md='2'>

		          		</Col>


		          		<Col md='8'>
		          			<Doughnut data={this.state.data}/>
		          			
		          		</Col>


		          		<Col md='2'>

		          		</Col>


		          	</Row>

		          	<hr />


		          	<p>Datos por Periodo</p>
						{this.state.periodos}
		        </div>
			)	
		}
	}
}

const mapStateToProps = (state)=> {
	return{
		activeUser: state.activeUser,
		estudianteUser: state.estudianteUser,
	};
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({get_historial: get_historial, cargado:cargado}, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(HistorialAcademico);




