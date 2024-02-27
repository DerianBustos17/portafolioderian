import React from "react";
import CardSkills from "./CardSkills";
import { skills } from "../helpers/imagesSkillHelper";
const Skills = () => {
  return (
    <div className="conteiner">
      {skills.map((skill, index) => (
        <CardSkills key={index} url={skill.url} altImage={skill.alt} />
      ))}
    </div>
  );
};

export default Skills;
