import React from "react";
import { aboutCardsData, assets } from "../../assets/assets";
import { Download } from "lucide-react";

const About = () => {
  return (
    <section id="about" className=" md:pb-8 pb-6">
      <div className="w-full  flex gap-4">
        <div className="w-full  flex md:flex-row flex-col items-center md:gap-8">
          <div className="img sm:max-w-[13.5%] md:h-40 w-44 h-44  rounded-full border-2 border-primary">
            <img
              src={assets.haris}
              alt="Haris"
              className="h-full w-full rounded-full"
            />
          </div>
          <div className="py-2 px-8 md:w-[70%]">
            <h3 className="my-2 text-text font-semibold text-xl">
              Haris Mujahid
            </h3>
            <p className="text-muted md:text-lg">
              Passionate about building beautiful and functional web
              applications. With a strong background in both frontend and
              backend development, I specialize in turning complex problem into
              elegant,user-friendly solutions that delight users and drive
              results.
            </p>
          </div>
          <div className="md:w-[22%]">
            <button className="flex items-center gap-2 border hover:bg-primary border-primary rounded-full px-4 py-2 text-text bg-secondary cursor-pointer">
              <Download className="" />
              Download Resume
            </button>
          </div>
        </div>
      </div>

      <div className="md:py-12 py-6 md:px-4 px-10 grid sm:grid-cols-2 md:grid-cols-4 md:gap-8 gap-6">
        {aboutCardsData.map((card) => {
          return (
            <div
              key={card.id}
              className="border border-secondary p-4 rounded-xl bg-surface flex flex-col items-center md:items-start "
            >
              <h3 className="text-primary md:text-4xl text-2xl font-bold ">
                {card.value}
              </h3>
              <h4 className="text-text">{card.title}</h4>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default About;
