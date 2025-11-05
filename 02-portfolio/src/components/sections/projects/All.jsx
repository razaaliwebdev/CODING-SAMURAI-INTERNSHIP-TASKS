import React from "react";
import { projectsData } from "../../../assets/assets";
import ProjectCard from "./ProjectCard";

const All = () => {
  const data = projectsData.map((project) => {
    return project;
  });

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-8 lg:gap-8">
      <ProjectCard data={data} />
    </div>
  );
};

export default All;
