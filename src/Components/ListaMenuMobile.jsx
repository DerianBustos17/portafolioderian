import React from 'react'

 const ListaMenuMobile = (props) => {
  
    return (
      <div>
          <li className='p-4 border-b border-gray-600'><a href="#"> {props.opcion}</a></li>   
      </div>
    );

}
export default  ListaMenuMobile ;