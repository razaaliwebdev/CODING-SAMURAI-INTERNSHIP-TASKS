import React from "react";
import Badge from "../utility/Badge";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="md:h-[65vh] w-full flex  justify-center">
      <div className=" py-16 flex items-center flex-col">
        <Badge icon={Zap} title="I build things for the web." />
        <h1 className="md:text-7xl text-3xl font-bold my-4 md:my-6 text-text ">
          Hi, I'm Haris Mujahid
        </h1>
        <p className="text-muted md:max-w-2xl px-4 text-sm mx-auto text-center md:text-lg">
          Full Stack Engineer & UI Magician with 2 years of experience as a
          Graphic Designer at{" "}
          <span className="font-semibold text-primary">Digital Mandee</span>. I
          craft engaging, high-performance web experiences that blend creativity
          with clean, scalable code.
        </p>
        <div className="btns flex gap-4 my-8">
          <button
            onClick={() => navigate("/#projects")}
            className="px-6 py-2  border border-primary rounded-full bg-primary hover:bg-secondary hover:text-primary text-text cursor-pointer"
          >
            View My Work
          </button>
          <button
            onClick={() => navigate("/#contact")}
            className="px-6 py-2  border border-primary rounded-full bg-secondary hover:bg-primary hover:text-seondary text-text cursor-pointer "
          >
            Let's Talk
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
