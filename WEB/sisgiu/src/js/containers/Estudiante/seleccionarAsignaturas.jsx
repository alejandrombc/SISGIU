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
      creditos: 0
    }
    this.setCreditos = this.setCreditos.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.inscribirse = this.inscribirse.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    this.setState({options: nextProps.asignaturas});
  }
 

  setCreditos(value){
    var j = 0;
    var creditos = 0;
    while(j < value.length){
      for (let i = 0; i < this.state.options.length; i++) {
        if (this.state.options[i].value === value[j]){
            creditos+=this.state.options[i].unidad_credito;
            j++;
        }
      }
    }

    this.setState({creditos: creditos});
  }

  handleChange (value) {
    this.setState({ value: value }); //another array
    this.setCreditos(value);
  }

  inscribirse() {
    this.props.inscribir_asignaturas(this.state, this.props.cedula);

    this.props.triggerInscripcion();
  }
 
  render() {

    var total = this.state.creditos;

    return (
      <div>
        <MultiselectTwoSides
          {...this.state}
          className="msts_theme_example"
          onChange={this.handleChange}
          availableHeader="Asignaturas Disponibles"
          // availableFooter={`Available: ${availableCount}`}
          selectedHeader="Asignaturas Seleccionadas"
          selectedFooter={`Creditos seleccionados: ${total}`}
          labelKey="nombre"
          searchable
          limit='10'
        />
        <br />
        <Row>
          <Col className="text-right" md="12">
            <Button onClick={ ()=> this.inscribirse() }>
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