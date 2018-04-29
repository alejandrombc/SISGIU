import { Table, Form,  FormGroup, Input, Label, Col, Button, Row } from 'reactstrap';
import '../../../css/moduloUsuarioAdministrador.css';
import FontAwesomeIcon from 'react-fontawesome';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import React from 'react';
import ConfirmButton from 'react-confirm-button';
import 'rc-time-picker/assets/index.css';

// Components
import { editar_asignatura } from '../../actions/moduloAsignaturas';
import TimePicker from 'rc-time-picker';
import { cargado } from '../../actions/inicio';


class AgregarDocenteAsignatura extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      asignatura_codigo: '',
      docente_asignatura_tabla: [],
      asignatura: '',
      docente_asignatura_nuevo: '',
      horario_dia_nuevo: 0,
      horario_hora_nuevo_inicio: '',
      horario_hora_nuevo_fin: '',
      aula_nuevo: '',

    };

    this.handleChangeSelectAsignaturas = this.handleChangeSelectAsignaturas.bind(this);
    this.get_listAsignaturas = this.get_listAsignaturas.bind(this);
    this.get_listItems = this.get_listItems.bind(this);
    this.handleChangeExtraData = this.handleChangeExtraData.bind(this);
    this.get_lista_docentes = this.get_lista_docentes.bind(this);
    this.handleChangeTimePickerInicio = this.handleChangeTimePickerInicio.bind(this);
    this.handleChangeTimePickerFin = this.handleChangeTimePickerFin.bind(this);
    this.agregarDocenteAsignatura = this.agregarDocenteAsignatura.bind(this);
    this.ordenarLista = this.ordenarLista.bind(this);


  }


  // Este es cuando cambio el select de escoger asignatura
  handleChangeSelectAsignaturas(e) 
  {
    const { name, value } = e.target;

    let docente_asignatura_tabla = [];
    let index;

    let N = this.props.docente_asignatura.length;


    for (var j = 0; j < N; j++) {
      if(this.props.docente_asignatura[j].asignatura.codigo === value){
        docente_asignatura_tabla.push(this.props.docente_asignatura[j]);
      }
    }

    N = this.props.adminUser.lista_asignaturas.length;

    for (j = 0; j < N; j++) {
      if(this.props.adminUser.lista_asignaturas[j].codigo === value){
        index = j;
      }
    }

    this.setState({ [name]: value, 
      docente_asignatura_tabla: docente_asignatura_tabla, 
      asignatura: this.props.adminUser.lista_asignaturas[index], 
      docente_asignatura_nuevo: '',
      horario_dia_nuevo: 0,
      horario_hora_nuevo_inicio: '',
      horario_hora_nuevo_fin: '',
      aula_nuevo: '',  });
  }

  handleChangeExtraData(e){
    const { name, value } = e.target;
    this.setState({ [name] : value });

  }

  handleChangeTimePickerInicio(e) {
    var horario_hora_nuevo_inicio = this.refs.horario_hora_nuevo_inicio;
    this.setState({horario_hora_nuevo_inicio: horario_hora_nuevo_inicio.picker.attributes.value.value});
  }

  handleChangeTimePickerFin(e) {
    var horario_hora_nuevo_fin = this.refs.horario_hora_nuevo_fin;
    this.setState({horario_hora_nuevo_fin: horario_hora_nuevo_fin.picker.attributes.value.value});
  }

  get_listAsignaturas() {
    let listAsignaturas;
    let asignaturas_periodo_actual = [];
    if (this.props.adminUser.lista_asignaturas && this.props.adminUser.lista_asignaturas.length > 0) {
      this.props.adminUser.lista_asignaturas.forEach(element => {
        if (element.tipos_postgrado.includes(this.props.periodo.tipo_postgrado_id)) {
          asignaturas_periodo_actual.push(element);
        }
      });
    }

    if (asignaturas_periodo_actual.length > 0) {
      listAsignaturas = asignaturas_periodo_actual.map((tipo_asignatura) =>
          <option key={tipo_asignatura['codigo']} value={tipo_asignatura['codigo']} name={tipo_asignatura['nombre']}> {tipo_asignatura['nombre']} </option>
      ); 
    }

    return listAsignaturas;
  }

  get_listItems(days) {
    // Esta es la lista de todos los horarios que posee una asignatura en especifico.
    let listItems = this.state.docente_asignatura_tabla.map((docente, index) =>
        <tr key={index}>
          <td> 
            {docente.usuario.first_name}{' '}{docente.usuario.last_name}
          </td>
          <td>{docente.asignatura.nombre}</td>
          <td>        
            {days[docente.horario_dia]}
          </td>
          <td>        
            {docente.horario_hora}
          </td>
          <td>        
            {docente.aula}
          </td>
        </tr>
    );

    return listItems;
  }

  get_lista_docentes() {
    let lista_docentes;
    if (this.props.adminUser.lista_usuarios && this.props.adminUser.lista_usuarios.length > 0) {
      lista_docentes = this.props.adminUser.lista_usuarios.map((docente) =>
        <option key={docente['cedula']} value={docente['cedula']} name={docente['cedula']}> {docente.first_name}{' '}{docente.last_name} </option>
      ); 
    }

    return lista_docentes;
  }

  agregarDocenteAsignatura() {

    //Declaraciones
    let nueva_asignatura = {};
    let new_docente_asignatura = this.props.docente_asignatura;
    let index = -1;
    let docente_asignatura_nuevo = this.state.docente_asignatura_nuevo;
    let docente_asignatura_tabla = [];


    let N = this.props.adminUser.lista_usuarios.length;

    //Obtener el index del docente deseado
    for (var j = 0; j < N; j++) {
      if(parseInt(this.props.adminUser.lista_usuarios[j].cedula, 10) === parseInt(docente_asignatura_nuevo, 10) ){
        index = j;
      }
    }

    let horario_hora_nuevo_inicio = this.refs.horario_hora_nuevo_inicio.picker.attributes.value.value;
    let horario_hora_nuevo_fin = this.refs.horario_hora_nuevo_fin.picker.attributes.value.value;
    


    if( index !== -1 && this.state.aula_nuevo !== '' && horario_hora_nuevo_inicio !== '' && horario_hora_nuevo_fin!== '' ) 
    {
      
      if (parseInt(horario_hora_nuevo_inicio.split(':')[0], 10) > parseInt(horario_hora_nuevo_fin.split(':')[0], 10) || 
        ( parseInt(horario_hora_nuevo_inicio.split(':')[0], 10) === parseInt(horario_hora_nuevo_fin.split(':')[0], 10) && 
          parseInt(horario_hora_nuevo_inicio.split(':')[1], 10) >= parseInt(horario_hora_nuevo_fin.split(':')[1], 10) )   ) 
      {
        alert('La hora de inicio debe ser menor que la hora fin');
      } else {
        
        //Crear JSON para el "push" al docente asignatura
        nueva_asignatura['asignatura'] = {
          'codigo': this.state.asignatura.codigo, 
          'nombre': this.state.asignatura.nombre,
          'id': this.state.asignatura.id
        };
        nueva_asignatura['aula'] = this.state.aula_nuevo;
        nueva_asignatura['docente'] = docente_asignatura_nuevo;
        nueva_asignatura['usuario'] = {
            'first_name': this.props.adminUser.lista_usuarios[index].first_name,
            'last_name': this.props.adminUser.lista_usuarios[index].last_name,
            'cedula': this.props.adminUser.lista_usuarios[index].cedula
          };

        nueva_asignatura['horario_dia'] = this.state.horario_dia_nuevo;
        nueva_asignatura['horario_hora'] = horario_hora_nuevo_inicio + ' - ' + horario_hora_nuevo_fin;
        nueva_asignatura['periodo'] = this.props.periodo.id;
        nueva_asignatura['aula'] = this.state.aula_nuevo;
        nueva_asignatura['tipo_postgrado'] = this.props.tipo_postgrado;


        //Push al docente asignatura (nueva entrada)
        new_docente_asignatura.push(nueva_asignatura);

        N = new_docente_asignatura.length;
        //Refresco la tabla "local" con el nuevo docente asignatura
        for (j = 0; j < N; j++) {
          if( new_docente_asignatura[j].asignatura.codigo ===  nueva_asignatura.asignatura.codigo){
            docente_asignatura_tabla.push(new_docente_asignatura[j]);
          }
        }

        new_docente_asignatura = this.ordenarLista(new_docente_asignatura);


        //Set a los valores nuevos de los estados
        this.setState({
          docente_asignatura_tabla: docente_asignatura_tabla,
          docente_asignatura_nuevo: '',
          horario_dia_nuevo: 0,
          horario_hora_nuevo_inicio: '',
          horario_hora_nuevo_fin: '',
          aula_nuevo: '',
        });

        this.props.trigger_actualizar_docente_asignatura(new_docente_asignatura);
      }
      
    } else {
      alert('Complete todos los campos');
    }
  }

  ordenarLista(new_docente_asignatura) {

    let lista_codigos_asignaturas = [];
    
    let N = new_docente_asignatura.length;

    // Busco todos los codigos de asignaturas de docente_asignatura
    for (var i = 0; i < N; i++) {
      // si el codigo existe ya en lista_codigos_asignaturas no lo vuelvo a agregar
      if ( !lista_codigos_asignaturas.includes(new_docente_asignatura[i]['asignatura']['codigo']) ) {
        lista_codigos_asignaturas.push( new_docente_asignatura[i]['asignatura']['codigo'] );
      }

    }

    N = lista_codigos_asignaturas.length;
    let docente_asignatura_ordenado = [];
    let M = new_docente_asignatura.length;

    // Voy buscando en todo el arreglo de docente_asignatura y voy agregando los campos en otro arreglo pero CODIGO POR CODIGO para que este ordenado
    for (i = 0; i < N; i++) {


      for (var j = 0; j < M; j++) {
        if(new_docente_asignatura[j].asignatura.codigo === lista_codigos_asignaturas[i]){
          docente_asignatura_ordenado.push(new_docente_asignatura[j]);
        }
      }
    }

    return docente_asignatura_ordenado; 
  }

  render() {

    const days = ['Lunes', 'Martes', 'Miercoles','Jueves', 'Viernes', 'Sabado', 'Domingo'];

    let listAsignaturas = this.get_listAsignaturas();
    let lista_docentes = this.get_lista_docentes();
    let listItems = this.get_listItems(days);
    

    return (
      <div>
        <br />
        <ConfirmButton
          onConfirm={() => this.props.triggerVolverPasoAnterior() }
          text= {<FontAwesomeIcon name="arrow-left"/>}
          className="btn btn-secondary btn-sm"
          confirming={{
            text: '¿Está Seguro? Se perderan todos los cambios',
            className: 'btn btn-danger btn-sm',
          }}
        />

        <br /><br />
        <Form >
          <h6>Paso 1: Seleccionar Asignaturas</h6>
          <hr/>
          <FormGroup row>
            <Label for="asignatura_codigo" sm={5}>Seleccione una asignatura</Label>
            <Col sm={7}>
              <Input 
              bsSize="sm" 
              value={this.state.value} 
              defaultValue={this.state['asignatura_codigo']} 
              onChange={this.handleChangeSelectAsignaturas} 
              type="select" 
              name="asignatura_codigo" 
              id="asignatura_codigo" 
              required>
                <option value={null} name={-1}> {' '} </option>
                {listAsignaturas}
              </Input>
            </Col>
          </FormGroup>
          <br />
          <hr/>
          <h6>Paso 2: Seleccione docente y hora</h6>
          <hr/>
          <Table bordered hover responsive striped size="sm">
            <thead>
              <tr>
                <th>Docente</th>
                <th>Asignatura</th>
                <th>Dia</th>
                <th>Hora</th>
                <th>Aula</th>
              </tr>
            </thead>
            <tbody className="tabla_usuarios">
                
                {listItems}
                
                { this.state.asignatura_codigo !== '' &&
                  <tr>
                    <td id='docente_asignatura_nuevo'> 
                      <FormGroup>
                        <Input bsSize="sm" value={this.state.docente_asignatura_nuevo} onChange={this.handleChangeExtraData}  type="select" name="docente_asignatura_nuevo" id="docente_asignatura_nuevo" required>
                          <option value={null} name={-1}> {' '} </option>
                          {lista_docentes}
                        </Input>
                      </FormGroup>
                    </td>
                    <td> {this.state.asignatura.nombre}</td>
                    <td> 
                      <FormGroup>
                        <Input bsSize="sm" value={this.state.horario_dia_nuevo} onChange={this.handleChangeExtraData} required type="select" name="horario_dia_nuevo" id="horario_dia_nuevo">
                          <option key="0" value="0" name="Lunes"> Lunes </option>
                          <option key="1" value="1" name="Martes"> Martes </option>
                          <option key="2" value="2" name="Miercoles"> Miercoles </option>
                          <option key="3" value="3" name="Jueves"> Jueves </option>
                          <option key="4" value="4" name="Viernes"> Viernes </option>
                          <option key="5" value="5" name="Sabado"> Sabado </option>
                          <option key="6" value="6" name="Domingo"> Domingo </option>
                        </Input>
                      </FormGroup>
                    </td>
                    <td> 
                      

                      <FormGroup>
                        <TimePicker placeholder="Inicio" showMinute={false} name="horario_hora_nuevo_inicio" ref="horario_hora_nuevo_inicio" onChange={this.handleChangeTimePickerInicio}/>
                        <TimePicker placeholder="Fin" showMinute={false} name="horario_hora_nuevo_fin" ref="horario_hora_nuevo_fin" onChange={this.handleChangeTimePickerFin} />
                      </FormGroup>
                                      
                    </td>
                    <td>
                      <FormGroup>
                        <Input type="number" value={this.state.aula_nuevo} name="aula_nuevo" onChange={this.handleChangeExtraData} required />
                      </FormGroup>
                    </td>
                  </tr> 
                }
              
            </tbody>
          </Table>

          <Row>
            <Col md="6" sm="6">
                <div className="text-left">
                  <Button color="primary" className="pull-left" size='sm' data-toggle="tooltip" title="Guardar" onClick={() => this.agregarDocenteAsignatura()}>Guardar</Button>
                </div>
            </Col>

            <Col md="6" sm="6">
                <div className="text-right">
                  <Button color="success" size='sm' data-toggle="tooltip" title="Siguiente" onClick={() => this.props.triggerSiguientePaso()}><FontAwesomeIcon name="arrow-right"/></Button>
                </div>
            </Col>
          </Row>

        </Form>
        <br />
      </div>
    );
  }

}


const mapStateToProps = (state)=> {
  return{
    adminUser: state.adminUser,
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editar_asignatura: editar_asignatura,
    cargado: cargado,
    }, 
    dispatch 
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(AgregarDocenteAsignatura);