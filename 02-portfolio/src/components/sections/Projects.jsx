import { useState } from "react";
import All from "./projects/All";
import Frontend from "./projects/Frontend";
import Backend from "./projects/Backend";
import FullStack from "./projects/FullStack";

const Projects = () => {
  const [activeTab, setActiveTab] = useState("All");

  return (
    <section id="projects" className="md:py-8 py-6">
      <h2 className="text-text md:text-3xl font-medium">Projects</h2>
      <div className="tabs">
        <div className="tabs-btns flex gap-4 my-6">
          <button
            className={`tab-btn border border-primary px-6 text-text cursor-pointer py-1.5 rounded-full ${
              activeTab === "All" && "active-tab bg-primary "
            }`}
            onClick={() => setActiveTab("All")}
          >
            All
          </button>
          <button
            className={`tab-btn border border-primary px-6 text-text cursor-pointer py-1.5 rounded-full ${
              activeTab === "Frontend" && "active-tab bg-primary "
            }`}
            onClick={() => setActiveTab("Frontend")}
          >
            Frontend
          </button>
          <button
            className={`tab-btn border border-primary px-6 text-text cursor-pointer py-1.5 rounded-full ${
              activeTab === "Backend" && "active-tab bg-primary "
            }`}
            onClick={() => setActiveTab("Backend")}
          >
            Backend
          </button>
          <button
            className={`tab-btn border border-primary px-6 text-text cursor-pointer py-1.5 rounded-full ${
              activeTab === "FullStack" && "active-tab bg-primary "
            }`}
            onClick={() => setActiveTab("FullStack")}
          >
            FullStack
          </button>
        </div>
        <div className="">
          {activeTab === "All" && <All />}
          {activeTab === "Frontend" && <Frontend />}
          {activeTab === "Backend" && <Backend />}
          {activeTab === "FullStack" && <FullStack />}
        </div>
      </div>
    </section>
  );
};

export default Projects;
