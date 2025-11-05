import React from "react";

const ProjectCard = ({ data }) => {
  return (
    <>
      {data.map((project) => {
        return (
          <div
            key={project.id}
            className="border border-secondary rounded md:p-4 p-6"
          >
            <div className="md:h-40 h-62 w-full">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover rounded"
              />
            </div>
            <h3 className="text-text md:text-xl text-lg md:my-3">
              {project.title}
            </h3>
            <p className="text-muted text-sm">{project.description}</p>
            <div className="flex flex-wrap my-4 gap-4">
              {project.technologies.map((tech) => {
                return (
                  <span className="text-xs rounded-full px-4 py-1 text-primary border border-primary  gap-2 ">
                    {tech}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProjectCard;
