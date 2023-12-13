import React from 'react';
const ButtomScreenModeMobile = ({ darkMode, toggleDarkMode }) => { 
    return (
        <div className='flex justify-around absolute inset-x-0 bottom-0 bg-slate-500 rounded-3xl mx-2 my-4'>
        <span className='py-4 font-bold text-black dark:text-white'>Mode:</span>
        <button onClick={toggleDarkMode} className=" text-white ml-4 md:hidden">
{darkMode ? <img src="/Sun.svg" alt="Mood Sun" ></img> :  <img src="/Moon.svg" alt="Mood Moon"></img> }
</button>
</div>
    );
}
export default  ButtomScreenModeMobile ;