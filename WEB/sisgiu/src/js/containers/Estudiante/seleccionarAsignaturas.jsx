import React from 'react';
import MultiselectTwoSides from 'react-multiselect-two-sides';
import '../../../css/seleccionarAsignaturas.css';
import { Button, Row, Col } from 'reactstrap';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

// Components
import { inscribir_asignaturas } from '../../actions/inscripcion';

class SeleccionarAsignaturas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.asignaturas,
      value: [],
      cantidad_max_asignaturas: this.props.estudianteUser.postgrado.asignaturas_maximas,

    }
    this.handleChange = this.handleChange.bind(this);
    this.inscribirse = this.inscribirse.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    this.setState({options: nextProps.asignaturas});
  }

  handleChange (value) {
    this.setState({ value: value }); //another array
  }

  inscribirse() {
    this.props.inscribir_asignaturas(this.state, this.props.cedula).then( ()=> this.props.triggerBuscarInformacionAsignaturas() );
    this.props.triggerInscripcion();
  }
 
  render() {

    var total = this.state.value.length;

    return (
      <div>
        <MultiselectTwoSides
          {...this.state}
          className="msts_theme_example"
          onChange={this.handleChange}
          availableHeader="Asignaturas Disponibles"
          selectedHeader="Asignaturas Seleccionadas"
          selectedFooter={`Cantidad: ${total}`}
          labelKey="nombre"
          searchable
          limit={this.state.cantidad_max_asignaturas}
        />
        <br />
        <Row>
          <Col className="text-right" md="12">
            <Button onClick={ ()=> this.inscribirse() } disabled={this.state.value.length===0 || this.state.value.length>this.state.cantidad_max_asignaturas}>
              Inscribirse
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state)=> {
  return{
    usuario_activo: state.activeUser,
    estudianteUser: state.estudianteUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
  inscribir_asignaturas: inscribir_asignaturas,

  }, dispatch )
}

export default connect(mapStateToProps, mapDispatchToProps)(SeleccionarAsignaturas);