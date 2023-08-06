import React from 'react'
import SVGSun from './SVGSun';
import SVGMoon from './SVGMoon';
const ButtomScreenModeWeb = ({ darkMode, toggleDarkMode }) => { 
    return (
        <button onClick={toggleDarkMode} className=" text-white p-4 backdrop-blur-lg border-b-4 border-slate-400">
        {darkMode ? <SVGSun></SVGSun>:<SVGMoon></SVGMoon>}
      </button>
    );
}
export default  ButtomScreenModeWeb ;