import './App.css';

import Navbar from './Components/Nabvar';
import Home from './Components/Home';
import AboutMe from './Components/AboutMe';

import Portafolio from './Components/Portafolio';


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Home></Home>
      <AboutMe></AboutMe>
    <Portafolio></Portafolio>

    </div>
  );
}

export default App;
