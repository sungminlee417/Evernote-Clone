import options from "../../images/modify.svg";
import { useEffect, useState } from "react";
import EditNotebookModal from "./EditNotebookModal";
import DeleteNotebookModal from "./ModifyNotebook/DeleteNotebookModal";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNoteByNotebookId } from "../../store/notes";

const ModifyNotebook = ({ notebook }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [clicked, setClicked] = useState(false);

  const addNote = async () => {
    await dispatch(createNoteByNotebookId(notebook.id)).then((note) => {
      history.push(`/notebooks/${notebook.id}/${note.id}`);
    });
  };

  useEffect(() => {
    if (!clicked) return;

    const closeSettings = () => setClicked(false);

    document.addEventListener("click", closeSettings);

    return () => document.removeEventListener("click", closeSettings);
  }, [clicked]);

  return (
    <div className="flex items-center relative">
      <button
        className="relative flex ml-auto"
        onClick={() => setClicked(!clicked)}
      >
        <img alt="modify_notebook" src={options} />
      </button>
      <div
        className={`flex flex-col items-center absolute py-2 gap-2 rounded-md shadow-md bg-white right-0 z-10 transition-all duration-150 w-64 ${
          clicked
            ? "opacity-100 pointer-events-auto -bottom-52"
            : "opacity-0 pointer-events-none -bottom-48"
        }`}
      >
        <button
          className="bg-white text-xl w-full p-4 text-start hover:bg-[#f4f4f4]"
          onClick={addNote}
        >
          Add New Note
        </button>
        <EditNotebookModal notebook={notebook} setClicked={setClicked} />
        <DeleteNotebookModal notebook={notebook} setClicked={setClicked} />
      </div>
    </div>
  );
};

export default ModifyNotebook;
