import React from 'react'
import SVGSun from './SVGSun';
import SVGMoon from './SVGMoon';

const ButtomScreenModeMobile = ({ darkMode, toggleDarkMode }) => { 
    return (
        <div className='flex justify-around absolute inset-x-0 bottom-0 bg-slate-500 rounded-3xl mx-2 my-4'>
        <span className='py-4 font-bold text-black dark:text-white'>Mode:</span>
        <button onClick={toggleDarkMode} className=" text-white ml-4 md:hidden">
{darkMode ? <SVGSun></SVGSun> : <SVGMoon></SVGMoon>}
</button>
</div>
    );
}
export default  ButtomScreenModeMobile ;