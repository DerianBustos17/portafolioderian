
import React from 'react';

const ListaMenuWeb = (props) => {
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
  const menuItemClass = currentPage === opcion ? 'p-4 hover:bg-sky-400 border-b-4 border-indigo-800 outline-2 backdrop-blur-lg md:font-bold text-gray-500 md:text-lg' : 'p-4 hover:bg-sky-400 border-b-4 border-slate-400 text-gray-500  outline-2 backdrop-blur-lg md:font-bold  md:text-lg';
  return (
    <li className={menuItemClass} onClick={handleClick} >
      {opcion}
    </li>
  );
};

export default ListaMenuWeb;