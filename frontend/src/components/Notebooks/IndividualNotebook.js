import { useState } from "react";
import { useSelector } from "react-redux";
import ModifyNotebook from "./ModifyNotebook";
import { NavLink } from "react-router-dom";

const IndividualNotebook = ({ notebook, index }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const [notebookExpand, setNotebookExpand] = useState(false);

  const convertDate = (date) => {
    const dateTime = new Date(date);
    const formatDate = dateTime.toDateString();
    return formatDate.slice(4);
  };

  return (
    <>
      <div
        className={`grid grid-cols-[4fr_3fr_2fr_1fr] items-center p-4 text-xl text-[#787474]
          ${index % 2 === 0 ? "bg-white" : "bg-[#f8f8f8] hover:bg-[#f4f4f4]"}`}
      >
        <div className="flex gap-4">
          <button
            className={`${notebookExpand ? "rotate-90" : ""} transition`}
            onClick={() => setNotebookExpand(!notebookExpand)}
          >
            <i className="fa-solid fa-caret-right"></i>
          </button>
          <NavLink
            className="flex items-center gap-3 text-[#383434]"
            to={`/notebooks/${notebook.id}`}
          >
            <i className="fa-solid fa-book text-[#787474]"></i>
            <div className="hover:underline">{notebook.name}</div>
            <span className="opacity-50">
              {`(${Object.values(notebook?.Notes).length})`}
            </span>
          </NavLink>
        </div>
        <div>{sessionUser.username}</div>
        <div>{convertDate(notebook.updatedAt)}</div>
        <ModifyNotebook notebook={notebook} />
      </div>
      {notebookExpand && (
        <div>
          {notebook.Notes.reverse().map((note) => {
            return (
              <div
                className="grid grid-cols-[4fr_3fr_2fr_1fr] items-center p-4 text-xl text-[#787474]"
                key={note.id}
              >
                <div className="flex items-cetner pl-8">
                  <NavLink
                    className="flex items-center gap-3"
                    to={`/notebooks/${notebook.id}/${note.id}`}
                  >
                    <i className="fa-regular fa-note-sticky"></i>
                    <div className="text-[#383434] hover:underline">
                      {note.name}
                    </div>
                  </NavLink>
                </div>
                <div>{sessionUser.username}</div>
                <div>{convertDate(note.updatedAt)}</div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default IndividualNotebook;
