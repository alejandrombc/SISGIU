import React, { Component } from 'react';
import '../../css/global.css';

class Page404 extends Component {

	render() {
		return (
			<div className="error">
				<div className="error-code m-b-10 m-t-20">404 <i className="fa fa-warning"></i></div>
				<h3 className="font-bold">No se pudo encontrar esa página...</h3>

				<div className="error-desc">
					Seguramente hubo un error de tipeo o el enlace pudo haberse movido
			            <div>
						<a className=" login-detail-panel-button btn" href="/">
							<i className="fa fa-arrow-left"></i>
							Ir a Inicio
			                    </a>
					</div>
				</div>
			</div>
		)
	}
}

export default Page404;





