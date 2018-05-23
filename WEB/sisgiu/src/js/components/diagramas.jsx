// Dependencies
import React, { Component } from 'react';
import { PulseLoader } from 'halogenium';
import { Button} from 'reactstrap';
import ReactImageMagnify from 'react-image-magnify';

// Components
import { host } from './globalVariables';

class DiagramaFlujo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cargando: false,
            modulo : localStorage.getItem('modulo'),
        }
        this.get_diagrama = this.get_diagrama.bind(this);
    }

    get_file(token, modulo) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var blob = new Blob([xhr.response], {
                        type: xhr.getResponseHeader("Content-Type")
                    });
                    var link = document.createElement('a');
                    link.href = window.URL.createObjectURL(blob);
                    link.download = "diagrama_"+modulo+".png";
                    link.click();
                    resolve(xhr.response)
                  }else if(xhr.readyState === 4 && xhr.status !== 200){
                    alert("Error al descargar el diagrama")
                    resolve(xhr.response)
                  }
                }
            xhr.responseType = "arraybuffer";
            xhr.open("GET",host + 'api/diagrama/'+modulo+'/',true); 
            xhr.setRequestHeader("Authorization", "JWT " + token);  
            xhr.send();
        });
    }

    // Diagrama
    get_diagrama(periodo) {
            let token = localStorage.getItem('user_token');
            let modulo = localStorage.getItem('modulo');
            this.setState({ "cargando": true },
              () => this.get_file(token, modulo)
            .then(
              () => {
                this.setState({ "cargando": false });
              }
            )
        );

    };


    render() {
            return (
                <div>
                    {this.state.cargando &&
                        <center><PulseLoader color="#b3b1b0" size="16px" margin="4px" /></center>
                    }
                    <h6>Funcionalidades</h6>
                    <ReactImageMagnify 
                            enlargedImagePosition= "over"
                            isHintEnabled="true"
                            hintTextMouse="Desplaza el mouse para agrandar"
                            {...{
                                smallImage: {
                                    alt: 'Diagrama de flujo',
                                    isFluidWidth: true,

                                    src: host+"media/sisgiu/diagrama_"+this.state.modulo+".png"
                                },
                                largeImage: {
                                    src: host+"media/sisgiu/diagrama_"+this.state.modulo+".png",
                                    width: 1200,
                                    height: 1800
                                }
                        } }/>
                    <br />
                    <Button color="primary" onClick={this.get_diagrama}>Descargar</Button>
                </div>
            );
    }
}

export default DiagramaFlujo;




