import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {bindActionCreators} from 'redux';

// Components
import { setCurrentPage } from '../actions/pagination';


class Paginacion extends Component {

  render() {

    var lista = [];

    if (this.props.cant_usuarios ) {

      let items_por_pagina = this.props.item_por_pagina;
      
      var total = Math.ceil(this.props.cant_usuarios/items_por_pagina);

      var init = 1;
      var end = 5;

      if (total <= 5) {
        end = total;
      } else if ( total > 5) {
        // Final
        if (this.props.pagination.pagina >= total-2){
          init = total-4;
          end = total;
        }

        // Inicio
        else if (this.props.pagination.pagina - 2 <= 0) {
          init = 1;
          end = 5;
        }

        // Todo lo demas
        else {
          init = this.props.pagination.pagina - 2;
          end = this.props.pagination.pagina + 2;
        }

      } 

      var paginas = () => {
        for (var i = init; i <= end; i++) {
          
          if ({i} === 1) {
            lista = lista.concat(
              <PaginationItem active key={i} onClick={(e)=>(
                this.props.setCurrentPage( parseInt(e.target.innerHTML, 10) )
                )}>
                <PaginationLink>
                  {i}
                </PaginationLink>
              </PaginationItem>
            )
          } else {
            lista = lista.concat(
              <PaginationItem key={i} onClick={(e)=>(
                this.props.setCurrentPage( parseInt(e.target.innerHTML, 10) )
                )}>
                <PaginationLink>
                  {i}
                </PaginationLink>
              </PaginationItem>
            )
          }


        }
        return lista;
      }

    }



    return (
      <Pagination size='sm'>
        <PaginationItem disabled>
          <PaginationLink previous href="#" />
        </PaginationItem>
        {paginas()}
        <PaginationItem>
          <PaginationLink next href="#" />
        </PaginationItem>
      </Pagination>
    );
  }
}


const mapStateToProps = (state)=> {
  return{
    pagination: state.paginacion,
  };
}


const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({setCurrentPage: setCurrentPage}, dispatch )
}


export default connect(mapStateToProps, mapDispatchToProps)(Paginacion);
