import React, {useRef} from 'react'

const ListaMenuWeb = (props) => {
  const { opcion, currentPage, setCurrentPage } = props;


  const handleClick = () => {
    setCurrentPage(opcion);
    props.enviarDato(opcion);
  };
  const menuItemClass = currentPage === opcion ? 'p-4 hover:bg-sky-700 border-b-4 border-indigo-800 outline-2 backdrop-blur-lg' : 'p-4 hover:bg-sky-700 border-b-4 border-slate-400  outline-2 backdrop-blur-lg';
  return (
    <div key={opcion}>
      <li className={menuItemClass} onClick={handleClick} >
        <a className='text-zinc-400' href="#">{opcion}</a>
      </li>
    </div>
  );
};

export default ListaMenuWeb;