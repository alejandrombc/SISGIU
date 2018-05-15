import React, { Component } from 'react';
import '../../css/global.css';

class Page404 extends Component {

	render() {
		return (
			<div class="error">
				<div class="error-code m-b-10 m-t-20">404 <i class="fa fa-warning"></i></div>
				<h3 class="font-bold">No se pudo encontrar esa página...</h3>

				<div class="error-desc">
					Seguramente hubo un error de tipeo o el enlace pudo haberse movido
			            <div>
						<a class=" login-detail-panel-button btn" href="/">
							<i class="fa fa-arrow-left"></i>
							Ir a Inicio
			                    </a>
					</div>
				</div>
			</div>
		)
	}
}

export default Page404;





