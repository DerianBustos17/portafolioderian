import React, { useEffect } from "react";
import Contact from "./Contact";
import { Fade } from "react-awesome-reveal";
import Carousel from "./Carousel";

const Portfolio = () => {
  useEffect(() => {
    const removeHoverClass = () => {
      document.querySelectorAll(".card").forEach((card) => {
        card.classList.remove("hover");
      });
      document.querySelectorAll("a.hover").forEach((anchor) => {
        anchor.classList.remove("hover");
      });
    };
    const delay = 1800;
    const timer = setTimeout(removeHoverClass, delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      id="portafolio"
      className="flex flex-col justify-around  h-screen items-center bg-white dark:bg-gray-800"
    >
      <Fade>
        <h1 className="text-2xl font-bold text-black dark:text-gray-200 py-8 border-b-4 border-indigo-400 ">
          Portfolio
        </h1>
      </Fade>
      <Fade>
        <p className="text-xl text-black dark:text-amber-400 text-justify mx-2">
          Here, you can see the projects I have worked on.
        </p>
      </Fade>
      <div className="md:w-2/4">
        <Carousel />
      </div>
      <Fade>
        <h2 className="text-2xl text-orange-500 font-bold ">Contact me</h2>
        <Contact />
      </Fade>
    </div>
  );
};
export default Portfolio;
