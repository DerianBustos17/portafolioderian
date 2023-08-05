import React, { useEffect, useState, useRef } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import AboutMe from './Components/AboutMe';
import Portafolio from './Components/Portafolio';
import Copyright from './Components/Copyright';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const aboutMeRef = useRef(null);
  const portafolioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Check if the refs are assigned and exist in the DOM before accessing their properties
      if (aboutMeRef.current && portafolioRef.current) {
        const aboutMeOffset = aboutMeRef.current.offsetTop;
        const portafolioOffset = portafolioRef.current.offsetTop;

        if (scrollPosition >= portafolioOffset - windowHeight / 2) {
          setCurrentPage('portafolio');
        } else if (scrollPosition >= aboutMeOffset - windowHeight / 2) {
          setCurrentPage('aboutme');
        } else {
          setCurrentPage('home');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <Navbar currentPage={currentPage} />
        <div id="home">
          <Home />
        </div>
        <div ref={aboutMeRef} id='about-me'>
          <AboutMe />
        </div>
        <div ref={portafolioRef} id='portfolio'>
          <Portafolio  />
        </div>
          <Copyright></Copyright>
    </div>
  );
}

export default App;
