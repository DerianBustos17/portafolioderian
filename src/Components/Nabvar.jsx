import React, {useState,useRef} from 'react';
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai'
import ListaMenuMobile from './ListaMenuMobile';
import ListaMenuWeb from './ListaMenuWeb';
import AboutMe from './AboutMe';

const Navbar = () => {
    const [currentPage, setCurrentPage] = useState('Home');
    const menuOpciones= ['Home', 'About Me', 'Skills', 'Contact']


    const [nav, setNav] = useState(false);
    const handleNav= () => {setNav(!nav);}
    return(     
        <header className='flex justify-center items-center h-16 max-w-[100%] z-50 mx-auto px-4 text-white color-font absolute right-0 left-0 top-0  max-md:justify-end'>                       
            <ul className='hidden md:flex md:justify-center md:fixed'>
                {menuOpciones.map((MenuWeb) => (<ListaMenuWeb opcion={MenuWeb} currentPage={currentPage} setCurrentPage={setCurrentPage} />))}
            </ul>
                <div onClick={handleNav}  className='md:hidden flex justify-center fixed'>
                    {nav ? <AiOutlineClose size={30}/> :  <AiOutlineMenu size= {30}/>}               
                </div>
                    <div className={nav ? 'fixed left-0 top-0 w-[50%] h-full backdrop-blur-3xl ' : 'fixed left-[-100%]' }>               
                        <ul className='uppercase p-4 ' >   
                            {menuOpciones.map((menu) => ( <ListaMenuMobile opcion={menu}  />))}
                        </ul>
                </div>


        </header>   
    );
}
export default Navbar;