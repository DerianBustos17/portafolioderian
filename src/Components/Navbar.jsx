import React, {useState , useEffect} from 'react';
import {AiOutlineClose,AiOutlineMenu} from 'react-icons/ai';
import ButtomScreenModeMobile from './ButtomScreenModeMobile';
import ButtomScreenModeWeb from './ButtomScreenModeWeb';
import ListMenuWeb from './ListMenuWeb';
import ListMenuMobile from './ListMenuMobile';

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const menuOpciones = ['Home', 'About Me', 'Portfolio'];
    const [currentPage, setCurrentPage] = useState('Home');
    const [nav, setNav] = useState(false);

    const handleNav = () => {
      setNav(!nav);
    };
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const homeOffset = document.getElementById('home').offsetTop;
        const aboutMeOffset = document.getElementById('aboutme').offsetTop;
        const portafolioOffset = document.getElementById('portfolio').offsetTop;
  
        if (scrollPosition >= portafolioOffset - windowHeight / 2) {
          setCurrentPage('Portfolio');
        } else if (scrollPosition >= aboutMeOffset - windowHeight / 2) {
          setCurrentPage('About Me');
        } else if (scrollPosition >= homeOffset - windowHeight / 2) {
          setCurrentPage('Home');
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    const handleMenuLinkClick = (option) => {
      setCurrentPage(option);
    };
    return (
      <header className='flex justify-end items-center h-14 max-w-[100%] z-50 mx-auto px-4 text-white color-font absolute right-0 left-0 top-4  max-md:justify-end '>
        <ul className='hidden md:flex md:justify-start md:fixed md:rounded-2xl md:bg-black md:bg-opacity-50'>
          {menuOpciones.map((MenuWeb) => (
            <ListMenuWeb
              option={MenuWeb}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              key={MenuWeb}
              onMenuLinkClick={handleMenuLinkClick}
            />
          ))}
         <ButtomScreenModeWeb darkMode={darkMode} toggleDarkMode={toggleDarkMode}></ButtomScreenModeWeb>
        </ul>
        <div onClick={handleNav}  className='md:hidden flex justify-center backdrop-blur-lg fixed text-gray-400 dark:text-white'>
                    {nav ? <AiOutlineClose size={30}/> :  <AiOutlineMenu size= {30}/>}               
                </div>
                    <div className={nav ? 'fixed left-0 top-0 w-[50%]  items-center h-full z-50 backdrop-blur-3xl  ' : 'fixed left-[-100%]' }>               
                        <ul className='uppercase p-4 ' >   
                            {menuOpciones.map((menu) => ( <ListMenuMobile  opcion={menu}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            key={menu}
                            onMenuLinkClick={handleMenuLinkClick}  />))}
                        </ul>
                       <ButtomScreenModeMobile darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
                    </div>
      </header>
    );
  };

  export default Navbar;
  