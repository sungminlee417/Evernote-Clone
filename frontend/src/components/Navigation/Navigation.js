import { NavLink, Route } from "react-router-dom";
import { logout } from "../../store/session";
import { useSelector, useDispatch } from "react-redux";
import "./Navigation.css";
import { useState } from "react";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const [clickedNew, setClickedNew] = useState(false);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  const onClickNew = () => {};

  return (
    <section className="nav-bar-section">
      <header className="nav-bar-header">
        <div className="nav-bar-header-session-username">
          {sessionUser.username}
        </div>
      </header>
      <div className="nav-bar-button-search">
        <div className="nav-bar-search">
          <i className="fa-solid fa-magnifying-glass nav-bar-magnifying-glass"></i>
          <input placeholder="Search" className="nav-bar-search-input" />
        </div>
        <div className="nav-bar-new-button-container">
          <button className="nav-bar-new-button" onClick={onClickNew}>
            <div className="nav-bar-new-button-new">
              <i className="fa-solid fa-plus nav-bar-new-button-plus"></i>
              New
            </div>
            <i className="fa-solid fa-chevron-down"></i>
          </button>
          <div className="nav-bar-new-pop-up-container">
            <div className="nav-bar-new-pop-up-button-container">
              <button className="nav-bar-new-pop-up-button note">
                <i className="fa-solid fa-note-sticky"></i>
                Note
              </button>
            </div>
            <div className="nav-bar-new-pop-up-button-container">
              <button className="nav-bar-new-pop-up-button tasks">
                <i className="fa-solid fa-circle-check"></i>
                Tasks
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="nav-bar-links">
        <div className="nav-bar-links-section-one">
          <NavLink exact to="/" className="nav-bar-link">
            <i className="fa-solid fa-house nav-bar-link-icon"></i> Home
          </NavLink>
          <NavLink to="/notes" className="nav-bar-link">
            <i className="fa-solid fa-note-sticky nav-bar-link-icon"></i> Notes
          </NavLink>
        </div>
        <div className="nav-bar-links-section-two">
          <NavLink to="/notebooks" className="nav-bar-link">
            <i className="fa-solid fa-book  nav-bar-link-icon"></i> Notebooks
          </NavLink>
        </div>
        <div className="nav-bar-links-section-three">
          <NavLink to="/trash" className="nav-bar-link">
            <i className="fa-solid fa-trash nav-bar-link-icon"></i> Trash
          </NavLink>
        </div>
      </div>
    </section>
  );
};
export default Navigation;
