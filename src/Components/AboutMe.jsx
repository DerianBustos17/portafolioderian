import React from "react";
import Skills from "./Skills";
import { Fade } from "react-awesome-reveal";
import ButtomDownloadCV from "./ButtomDownloadCV";

const AboutMe = () => {
  return (
    <div
      id="aboutme"
      className="flex flex-col justify-around h-screen items-center bg-gray-900"
    >
      <Fade>
        <h1 className="text-white text-4xl font-bold pt-10">About me:</h1>
      </Fade>
      <Fade></Fade>
      <Fade>
        <p className="text-xl text-justify text-gray-200 p-4 ">
          Hi! I'm Derian Bustos, a
          <span className="font-bold text-2xl text-neutral-400 p-1">
            Full Stack Developer
          </span>
          who loves turning ideas into digital experiences. Passionate about
          technology and constant learning, I see every project as an
          opportunity to grow, create, and innovate. I enjoy bringing concepts
          to life through clean design, efficient code, and meaningful user
          interactions. Whether working solo or as part of a team, I aim to
          build products that inspire and make a difference.
        </p>
      </Fade>

      <Fade>
        <ButtomDownloadCV></ButtomDownloadCV>
      </Fade>
      <div className="h-80">
        <Fade>
          <h2 className="text-white text-3xl font-bold pt-8 md:py-11">
            Technical skills
          </h2>
        </Fade>
        <Fade>
          <Skills></Skills>
        </Fade>
      </div>
    </div>
  );
};

export default AboutMe;
