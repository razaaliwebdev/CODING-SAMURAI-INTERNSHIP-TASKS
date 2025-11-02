import React from "react";

const Badge = ({ title, icon: Icon }) => {
  return (
    <div className="w-62 flex">
      <span className="border border-primary px-2 py-1 text-primary rounded-full flex items-center justify-center w-full">
        <Icon className="mr-1 md:h-4 md:w-4 h-3 w-3" /> {title}
      </span>
    </div>
  );
};

export default Badge;
