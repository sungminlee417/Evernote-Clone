import React from "react";
import backgroundImage from "../../images/background-homescreen.jpg";

const HomePageHeader = () => {
  const today = new Date().toDateString();
  const time = new Date().getHours();

  return (
    <section
      className="flex justify-between md:py-32 px-20 text-white text-shadow-lg shadow-black bg-cover h-full"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="md:text-3xl md:block hidden">
        Good
        {time > 11 && time < 18
          ? " afternoon"
          : time > 18 && time < 24
          ? " evening"
          : " morning"}
        !
      </div>
      <div className="md:text-2xl md:block hidden">{today}</div>
    </section>
  );
};
export default HomePageHeader;
