import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [scroll, setScroll] = useState(false);

  function scrollSmoothlyTo(className) {
    const element = document.querySelector(`.${className}`);
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }

  useEffect(() => {
    window.onscroll = function () {
      if (window.scrollY > 50) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
  }, [scroll]);

  return (
    <div
      className={`fixed w-full flex justify-between items-center tracking-wide bg-white transition-all duration-200 lg:px-32 md:px-20 px-6 py-8 ${
        scroll ? "shadow-md" : ""
      }`}
    >
      <button
        to="/"
        className="bg-transparent border-none cursor-pointer flex items-center gap-4"
        onClick={() => scrollSmoothlyTo("landing-page")}
      >
        <i class="fa-brands fa-evernote text-[#00a82d] text-7xl"></i>
        <strong className="tracking-wide text-4xl">Betternote</strong>
      </button>
      <div className="flex items-center gap-4">
        <a href="https://github.com/sungminlee417/Evernote-Clone.git">
          <i className="fa-brands fa-github cursor-pointer text-4xl"></i>
        </a>
        <NavLink
          to="/login"
          className="cursor-pointer text-3xl text-black hover:text-[#00a82d] transition ease-in-out duration-200"
        >
          Log In
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
