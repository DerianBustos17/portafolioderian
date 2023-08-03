import React from 'react'

 const ListaMenuMobile = (props) => {
  
    return (
      <div key={props.opcion}>
          <li className='p-4 border-b border-gray-600'><a className='text-zinc-400' href="#"> {props.opcion}</a></li>   
      </div>
    );

}
export default  ListaMenuMobile ;