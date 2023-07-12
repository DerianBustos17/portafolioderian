import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Nabvar';
import Home from './Components/Home';
import AboutMe from './Components/AboutMe';


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Home></Home>
      <AboutMe></AboutMe>
    </div>
  );
}

export default App;
