import React from "react";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Projects from "../components/sections/projects/Projects";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  );
};

export default Home;
