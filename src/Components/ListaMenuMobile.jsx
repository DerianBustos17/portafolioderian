
import React from 'react';

const ListaMenuMobile = (props) => {
  const { opcion, currentPage, setCurrentPage, onMenuLinkClick } = props;
  const handleClick = () => {
    const targetSection = document.getElementById(opcion.toLowerCase().replace(' ', '-'));
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  const menuItemClass = currentPage === opcion ? ' hover:bg-sky-700 p-4 border-b border-gray-600 bg-sky-700 font-bold text-center' : ' hover:bg-sky-700 p-4 border-b-2 border-gray-300  text-center';
  return (
    
     <li className={ menuItemClass}>
      <a className='text-white text-center' onClick={handleClick}> {opcion}</a>
      </li>   
  );
};

export default ListaMenuMobile;