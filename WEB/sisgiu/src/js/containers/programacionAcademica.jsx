// Dependencies
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PulseLoader } from 'halogenium';
import { cargado } from '../actions/inicio';

// Components

class ProgramacionAcademica extends Component {

    componentDidMount() {
        this.props.cargado();
    }


    render() {

        return (
            <div>
                Programacion Academica
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        token: state.activeUser
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        cargado: cargado,
     }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgramacionAcademica);




