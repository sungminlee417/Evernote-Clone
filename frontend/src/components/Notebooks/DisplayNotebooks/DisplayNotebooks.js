import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { loadNotebooksThunk } from "../../../store/notebooks";
import CreateNotebookModal from "../CreateNotebookModal/CreateNotebookModal";
import ModifyNotebook from "../ModifyNotebook/ModifyNotebook";
import sort from "../../../images/sort.svg";
import "./DisplayNotebooks.css";

const DisplayNotebooks = () => {
  const dispatch = useDispatch();
  const notebooks = Object.values(useSelector((state) => state.notebooks));
  const sessionUser = useSelector((state) => state.session.user);
  useEffect(() => {
    dispatch(loadNotebooksThunk());
  }, [dispatch]);
  const convertDate = (date) => {
    const dateTime = new Date(date);
    const formatDate = dateTime.toDateString();
    return formatDate.slice(4);
  };
  return (
    <div className="DisplayNotebooksPage">
      <div className="notebook-header">
        <div className="notebook-title-page">Notebooks</div>
        <input
          className="search-for-notebooks"
          type="text"
          placeholder="Find Notebooks..."
        />
      </div>
      <div className="second-notebook-header">
        <div id="second-header-text">
          {" "}
          {notebooks.length} {notebooks.length > 1 ? "notebooks" : "notebook"}{" "}
        </div>
        <div className="second-notebook-header-options">
          <CreateNotebookModal />
          <img className="sort-notebooks-button" src={sort} alt="sort"></img>
        </div>
      </div>
      <div className="list-notebooks">
        <div className="list-notebooks-columns">
          <button className="notebook-desc-title">TITLE</button>
          <div className="notebook-author">CREATED BY</div>
          <button className="notebook-desc-updated">UPDATED</button>
          <div className="modify-notebook">ACTIONS</div>
        </div>
        <div>
          {notebooks.reverse().map((notebook, i) => {
            return (
              <div>
                <div
                  key={i}
                  className={
                    i % 2 === 0 ? "style-even-notebook" : "style-odd-notebook"
                  }
                >
                  <div className="display-notebooks-first-col">
                    <button className="display-notebooks-note-button">
                      <i className="fa-solid fa-caret-right"></i>
                    </button>
                    <NavLink
                      className="individual-notebook"
                      to={`/notebooks/${notebook.id}`}
                    >
                      <i className="fa-solid fa-book  indiv-notebook-link-icon"></i>
                      <div>{notebook.name}</div>
                      <div className="num-notes-in-notebook"></div>
                    </NavLink>
                  </div>
                  <div className="notebook-creator">{sessionUser.username}</div>
                  <div className="notebook-updated-date">
                    {convertDate(notebook.updatedAt)}
                  </div>
                  <ModifyNotebook notebook={notebook} />
                </div>
                <div>
                  {notebook.Notes.reverse().map((note, i) => {
                    return <div>{note.name}</div>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default DisplayNotebooks;
