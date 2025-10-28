import React from "react";
const Home = () => {
  return (
    <div
      className="relative flex justify-center items-center h-screen bg-cover bg-no-repeat bg-black bg-opacity-75"
      style={{ backgroundImage: `url('/fondo1.jpg')` }}
    >
      <div className="flex flex-col  w-full h-full backdrop-blur-sm   items-center justify-center">
        <img
          className="w-40 md:w-80 rounded-full"
          src="/derian_foto.jpg"
          alt=""
        />
        <div className="flex flex-col items-center">
          <h3 className="text-white text-2xl">Hello</h3>
          <h1 className="text-fushia- text-4xl md:text-white font-bold ">
            I'm Derian Bustos
          </h1>
          <h2 className="text-white text-2xl">Full Stack Developer</h2>
        </div>
      </div>
    </div>
  );
};
export default Home;
