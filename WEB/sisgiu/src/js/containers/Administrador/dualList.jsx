import React from 'react';
import MultiselectTwoSides from 'react-multiselect-two-sides';
import '../../../css/dualList.css';


class DualList extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      options: [
        {name: 'Matematicas I', value: 1, creditos:5},
        {name: 'Matematicas II', value: 2, creditos:6},
        {name: 'Sistemas Operativos', value: 3, creditos:5},
        {name: 'Matematicas Discretas III', value: 4, creditos:4},
        {name: 'Probabilidad y Estadisticas', value: 5, creditos:4},
        {name: 'Organizacion y Estructura del Computador 2', value: 6, creditos:6},
      ],
      value: [],
      creditos: []
    }
    this.setCreditos = this.setCreditos.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }
 

  setCreditos(value){
    console.log(value);
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

  handleChange = (value) => {
    this.setCreditos(value);
    this.setState({value});
  }
 
  render() {
    const {creditos} = this.state;
    var selectedCount = 0;
    for (var i = 0; i < creditos.length; i++) {
      selectedCount += creditos[i];
    }
    // const availableCount = asignaturas.length - selectedCount;
 
    return (
      <MultiselectTwoSides
        {...this.state}
        className="msts_theme_example"
        onChange={this.handleChange}
        availableHeader="Asignaturas Disponibles"
        // availableFooter={`Available: ${availableCount}`}
        selectedHeader="Asignaturas Seleccionadas"
        selectedFooter={`Creditos inscritos: ${selectedCount}`}
        labelKey="name"
        showControls
        searchable
        limit='10'
      />
    );
  }
}
 
export default (DualList);