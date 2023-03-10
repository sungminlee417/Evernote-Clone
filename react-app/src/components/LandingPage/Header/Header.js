import "./Header.css";
import { NavLink } from "react-router-dom";
import logo from "../../../images/EvernoteLogo.svg";
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
    <div className={scroll ? "landing-header-scrolled" : "landing-header"}>
      <button
        to="/"
        className="home-button"
        onClick={() => scrollSmoothlyTo("landing-page")}
      >
        <img src={logo} alt="evernote_logo" />
      </button>
      <div className="landing-page-header-right">
        <a href="https://github.com/sungminlee417/Evernote-Clone.git">
          <i className="fa-brands fa-github landing-page-github"></i>
        </a>
        <NavLink to="/login" className="login-button">
          Log In
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
