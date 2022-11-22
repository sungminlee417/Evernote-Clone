import "./Header.css"
import { NavLink } from "react-router-dom"
import logo from "../../../images/EvernoteLogo.svg"
import { useState, useEffect } from "react"

const Header = () => {
const [scroll, setScroll] = useState(false);

    useEffect(() => {
        window.onscroll = function() {
          if (window.scrollY > 50) {
            setScroll(true);
          } else {
            setScroll(false);
          }
        };
      }, []);

    return (
        <div className={scroll ? "landing-header-scrolled" : "landing-header"}>
            <NavLink to="/" className="home-button">
            <img src={logo} alt="evernote_logo"/>
            </NavLink>
            <NavLink to="/login" className="login-button">Log In</NavLink>
        </div>

    );
}

export default Header