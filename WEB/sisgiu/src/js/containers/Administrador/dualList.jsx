import React from 'react';
import MultiselectTwoSides from 'react-multiselect-two-sides';
import '../../../css/dualList.css';


class DualList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.asignaturas.options,
      value: this.props.asignaturas.values,
    }
    this.setCreditos = this.setCreditos.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
 

  setCreditos(value){
    var j = 0;
    var values = [];
    while(j < value.length){
      for (let i = 0; i < this.state.options.length; i++) {
        if (this.state.options[i].value === value[j]){
            values.push(this.state.options[i].creditos);
            j++;
        }
      }
    }

    this.setState({creditos: values});
  }

  handleChange (value) {
    this.setState({ value: value }) //another array
    this.props.triggerDocenteAsignatura(value);
  }
 
  render() {
    var total = this.state.value.length;
 
    return (
      <MultiselectTwoSides
        {...this.state}
        className="msts_theme_example"
        onChange={this.handleChange}
        availableHeader="Asignaturas Disponibles"
        // availableFooter={`Available: ${availableCount}`}
        selectedHeader="Asignaturas Seleccionadas"
        selectedFooter={`Asignaturas seleccionadas: ${total}`}
        labelKey="name"
        showControls
        searchable
        limit='10'
      />
    );
  }
}
 
export default (DualList);