import React from "react";
import { projectsData } from "../../../assets/assets";
import ProjectCard from "./ProjectCard";

const Frontend = () => {
  const projects = projectsData.filter(
    (project) => project.cate === "Frontend"
  );

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
      <ProjectCard data={projects} />
    </div>
  );
};

export default Frontend;
