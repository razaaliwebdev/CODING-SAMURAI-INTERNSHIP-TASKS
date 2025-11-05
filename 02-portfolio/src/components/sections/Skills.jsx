import React from "react";
import { skillsData } from "../../assets/assets";

const Skills = () => {
  return (
    <section
      id="skills"
      className=" md:py-12 py-8 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-10 md:px-0 animate-pulse duration-2000 "
    >
      {skillsData.map((skill) => {
        return (
          <div
            key={skill.id}
            className="flex gap-4 flex-col border border-secondary items-center justify-center p-2 rounded"
          >
            <span className="text-text text-lg py-2">{skill.skll}</span>
            <span className="text-text text-sm mb-2">{skill.percentage}</span>
          </div>
        );
      })}
    </section>
  );
};

export default Skills;
