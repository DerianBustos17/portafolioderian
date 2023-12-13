import React from 'react';
const ListMenuMobile = (props) => {
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
  const menuItemClass = currentPage === opcion ? '  dark:hover:bg-sky-700 p-4 border-b border-gray-800 bg-sky-400 dark:bg-sky-700 font-bold text-center' : ' dark:hover:bg-sky-700 p-4 border-b-2 border-gray-00  text-center';
  return (
     <li className={ menuItemClass}>
      <a className=' text-gray-500 dark:text-white text-center' onClick={handleClick}> {opcion}</a>
      </li>   
  );
};
export default ListMenuMobile;