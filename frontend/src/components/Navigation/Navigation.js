import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Navigation.css";
import { useEffect, useState } from "react";
import ManageAccount from "./ManageAccount";
import {
  clearNotes,
  createNote,
  loadNotesByNotebookIdThunk,
} from "../../store/notes";
import { loadNotesThunk } from "../../store/notes";
import DisplayTags from "../Tags/DisplayTags";
import CreateTagModal from "../Tags/CreateTagModal/CreateTagModal";

const Navigation = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const location = useLocation();
  const [clicked, setClicked] = useState(false);
  const { noteId, notebookId } = useParams();
  const [tagClicked, setTagClicked] = useState(false);
  const dispatch = useDispatch();
  // const onClick = () => {
  //   const settingsContainer = document.querySelector(
  //     ".nav-bar-new-pop-up-container"
  //   );
  //   if (clicked) {
  //     settingsContainer.classList.remove("visible");
  //     setClicked(false);
  //   } else {
  //     settingsContainer.classList.add("visible");
  //     setClicked(true);
  //   }
  // };
  const tagOnClick = () => {
    const tagsContainer = document.querySelector(".tags-container");
    const tagsButton = document.querySelector(".nav-bar-link.tags");
    if (tagClicked) {
      tagsContainer.classList.remove("visible");
      tagsButton.classList.remove("active");
      setTagClicked(false);
    } else {
      tagsContainer.classList.add("visible");
      tagsButton.classList.add("active");
      setTagClicked(true);
    }
  };
  const parentFunction = (e) => {
    if (clicked) {
      e.stopPropagation();
    }
  };
  const tagParentFunction = (e) => {
    if (tagClicked) {
      e.stopPropagation();
    }
  };

  const newNote = () => {
    dispatch(createNote()).then(() => {
      if (notebookId) {
        dispatch(loadNotesByNotebookIdThunk(notebookId));
      } else if (noteId) {
        dispatch(loadNotesThunk());
        history.push("/notes");
      } else if (location.pathname === "/notebooks") {
        history.push("/notebooks");
      }
      dispatch(loadNotesThunk());
    });
  };

  // useEffect(() => {
  //   if (!clicked) return;
  //   document.addEventListener("click", onClick);
  //   return () => document.removeEventListener("click", onClick);
  // }, [clicked]);

  useEffect(() => {
    if (!tagClicked) return;
    document.addEventListener("click", tagOnClick);
    return () => document.removeEventListener("click", tagOnClick);
  }, [tagClicked]);

  return (
    <section className="nav-bar-section">
      <header className="nav-bar-header">
        <div className="nav-bar-header-session-username">
          {sessionUser.username}
        </div>
        <ManageAccount />
      </header>
      <div className="nav-bar-button-search">
        <div className="nav-bar-search">
          <i className="fa-solid fa-magnifying-glass nav-bar-magnifying-glass"></i>
          <input placeholder="Search" className="nav-bar-search-input" />
        </div>
        <div className="nav-bar-new-button-container" onClick={newNote}>
          <button className="nav-bar-new-button">
            <div className="nav-bar-new-button-new">
              <i className="fa-solid fa-plus nav-bar-new-button-plus"></i>
              New Note
            </div>
            {/* <i className="fa-solid fa-chevron-down"></i> */}
          </button>
          {/* <div
            className="nav-bar-new-pop-up-container"
            onClick={parentFunction}
          >
            <div className="nav-bar-new-pop-up-button-container">
              <button
                className="nav-bar-new-pop-up-button note"
                onClick={newNote}
              >
                <i className="fa-solid fa-note-sticky"></i>
                Note
              </button>
            </div>
            <div className="nav-bar-new-pop-up-button-container">
              <button className="nav-bar-new-pop-up-button tasks">
                <i className="fa-solid fa-circle-check"></i>
                Task
              </button>
            </div>
          </div> */}
        </div>
      </div>
      <div className="nav-bar-links">
        <div className="nav-bar-links-section-one">
          <NavLink exact to="/" className="nav-bar-link">
            <i className="fa-solid fa-house nav-bar-link-icon"></i> Home
          </NavLink>
          <NavLink to={`/notes`} className="nav-bar-link">
            <i className="fa-solid fa-note-sticky nav-bar-link-icon"></i> Notes
          </NavLink>
        </div>
        <div className="nav-bar-links-section-two">
          <NavLink exact to="/notebooks" className="nav-bar-link">
            <i className="fa-solid fa-book  nav-bar-link-icon"></i> Notebooks
          </NavLink>
          <div className="nav-bar-link tags" onClick={tagOnClick}>
            <i className="fa-solid fa-tag"></i> Tags
          </div>
          <div className="tags-container" onClick={tagParentFunction}>
            <div className="tags-header">
              <div className="tags-header-title">Tags</div>
              <CreateTagModal />
            </div>
            <input
              className="search-for-tags"
              type="text"
              placeholder="Find tags..."
            />
            <DisplayTags />
          </div>
        </div>
        {/* <div className="nav-bar-links-section-three">
          <NavLink to="/trash" className="nav-bar-link">
            <i className="fa-solid fa-trash nav-bar-link-icon"></i> Trash
          </NavLink>
        </div> */}
      </div>
    </section>
  );
};
export default Navigation;
