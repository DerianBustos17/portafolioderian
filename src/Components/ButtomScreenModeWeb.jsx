import React from 'react'

const ButtomScreenModeWeb = ({ darkMode, toggleDarkMode }) => { 
    return (
        <button onClick={toggleDarkMode} className=" text-white p-4  border-b-4 border-slate-400 hover:bg-sky-400">
        {darkMode ?  <img src="/Sun.svg" alt="Mood Sun"/>:  <img src="/Moon.svg" alt="Mood Moon"/>}
      </button>
    );
}
export default  ButtomScreenModeWeb ;