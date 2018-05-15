import React from 'react';
import MultiselectTwoSides from 'react-multiselect-two-sides';
import '../../../css/seleccionarAsignaturas.css';
import { Button, Row, Col } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Components
import { inscribir_asignaturas_administrativo } from '../../actions/moduloEstudiantes';

class CambiarAsignaturas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      value: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.inscribirse = this.inscribirse.bind(this);

  }

  componentDidMount() {

    this.setState(
      {
        options: this.props.asignaturas,
        value: this.props.asignaturas_inscritas,
      })

  }

  componentWillReceiveProps(nextProps) {
    this.setState({ options: nextProps.asignaturas });
  }

  handleChange(value) {
    this.setState({ value: value }); //another array
  }

  inscribirse() {

    this.props.inscribir_asignaturas_administrativo(this.state, this.props.cedula).then(() => this.props.triggerEsconderModal());
  }

  render() {
    return (
      <div>
        <MultiselectTwoSides
          {...this.state}
          className="msts_theme_example"
          onChange={this.handleChange}
          availableHeader="Asignaturas Disponibles"
          selectedHeader="Asignaturas Seleccionadas"
          selectedFooter={`Asignaturas seleccionadas: ${this.state.value.length}`}
          labelKey="nombre"
          searchable
          limit='10'
        />
        <br />
        <Row>
          <Col className="text-right" md="12">
            <Button onClick={() => this.inscribirse()} disabled={this.props.estado_periodo} size='sm'>
              Guardar
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usuario_activo: state.activeUser,
    estudianteUser: state.estudianteUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    inscribir_asignaturas_administrativo: inscribir_asignaturas_administrativo,

  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CambiarAsignaturas);