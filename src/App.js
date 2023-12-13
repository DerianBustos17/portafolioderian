import React, { useEffect, useState, useRef } from 'react';
import Home from './Components/Home';
import AboutMe from './Components/AboutMe';
import Portfolio from './Components/Portfolio';
import Copyright from './Components/Copyright';
import Navbar from './Components/Navbar';

function App() {
  const [currentPage, setCurrentPage] = useState('Home');
  const aboutMeRef = useRef(null);
  const portafolioRef = useRef(null);
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
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
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
    <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <div id="home">
          <Home />
        </div>
        <div ref={aboutMeRef} id='about-me'>
          <AboutMe />
        </div>
        <div ref={portafolioRef} id='portfolio'>
          <Portfolio  />
        </div>
          <Copyright/>
    </div>
  );
}

export default App;
