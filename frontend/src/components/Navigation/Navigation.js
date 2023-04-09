import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import ManageAccount from "./ManageAccount";
import { createNote } from "../../store/notes";
import { loadNotesThunk } from "../../store/notes";
import DisplayTags from "../Tags/DisplayTags";
import CreateTagModal from "../Tags/CreateTagModal/CreateTagModal";
import { TagContext } from "../context/TagContext";

const Navigation = () => {
  const { setSelectedTags } = useContext(TagContext);
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const location = useLocation();
  const { notebookId } = useParams();
  const [tagClicked, setTagClicked] = useState(false);
  const dispatch = useDispatch();

  const tagOnClick = () => {
    if (tagClicked) {
      setTagClicked(false);
    } else {
      setTagClicked(true);
    }
  };

  const tagParentFunction = (e) => {
    if (tagClicked) {
      e.stopPropagation();
    }
  };

  const newNote = () => {
    dispatch(createNote()).then((note) => {
      history.push(`/notes/${note.id}`);
      dispatch(loadNotesThunk());
    });
  };

  useEffect(() => {
    if (!tagClicked) return;
    document.addEventListener("click", tagOnClick);
    return () => document.removeEventListener("click", tagOnClick);
  }, [tagClicked]);

  return (
    <section className="bg-[#201c1c] shadow-md lg:w-96 w-full relative">
      <div className="flex justify-between text-[#a8a4a4] lg:p-8 py-6 px-10 items-center lg:static fixed top-0 w-full z-10 lg:bg-transparent bg-[#201c1c]">
        <div className="text-xl">{sessionUser.username}</div>
        <ManageAccount />
      </div>
      <nav className="flex lg:flex-col lg:justify-start justify-between">
        <div className="flex flex-grow lg:w-auto lg:mx-4 my-8 lg:justify-start justify-center lg:order-none order-1">
          <button
            className="bg-[#00a82d] hover:bg-[#008f26] text-white cursor-pointer flex items-center gap-2 rounded-full lg:justify-start justify-center lg:w-full w-16 h-16 lg:px-6"
            onClick={newNote}
          >
            <i className="fa-solid fa-plus lg:text-2xl text-4xl" />
            <span className="lg:block hidden text-xl">New Note</span>
          </button>
        </div>
        <NavLink
          exact
          to="/"
          className={`flex items-center gap-4 text-[#a8a4a4] hover:bg-[#484444] cursor-pointer lg:px-6 py-4 flex-grow lg:justify-start justify-center`}
          activeClassName="bg-[#333333]"
        >
          <i className="fa-solid fa-house h-8 w-8 flex justify-center items-center lg:text-2xl text-4xl" />
          <span className="lg:block hidden text-xl">Home</span>
        </NavLink>
        <NavLink
          to={`/notes`}
          className="flex items-center gap-4 text-[#a8a4a4] hover:bg-[#484444] cursor-pointer lg:px-6 lg:mb-8 py-4 flex-grow lg:justify-start justify-center"
          activeClassName="bg-[#333333]"
          onClick={() => setSelectedTags([])}
        >
          <i className="fa-solid fa-note-sticky h-8 w-8 flex justify-center items-center lg:text-2xl text-4xl" />
          <span className="lg:block hidden text-xl">Notes</span>
        </NavLink>
        <NavLink
          exact
          to="/notebooks"
          className="flex items-center gap-4 text-[#a8a4a4] hover:bg-[#484444] cursor-pointer lg:px-6 py-4 flex-grow lg:justify-start justify-center order-2"
          activeClassName="bg-[#333333]"
        >
          <i className="fa-solid fa-book h-8 w-8 flex justify-center items-center lg:text-2xl text-4xl"></i>
          <span className="lg:block hidden text-xl">Notebooks</span>
        </NavLink>
        <div
          className={`flex items-center gap-4 text-[#a8a4a4] hover:bg-[#484444] cursor-pointer lg:px-6 py-4 flex-grow lg:justify-start justify-center order-2 ${
            tagClicked ? "bg-[#333333]" : "bg-transparent"
          }`}
          onClick={tagOnClick}
        >
          <i className="fa-solid fa-tag  h-8 w-8 flex justify-center items-center lg:text-2xl text-4xl"></i>
          <span className="lg:block hidden text-xl">Tags</span>
        </div>
      </nav>
      <div
        className={`absolute z-10 flex flex-col bg-white bottom-full lg:left-full lg:bottom-0 lg:top-0 lg:h-screen w-full h-160 shadow-md border-t-slate-200 border transition ${
          tagClicked
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0 lg:-translate-x-16 lg:translate-y-0 translate-y-16"
        }`}
        onClick={tagParentFunction}
      >
        <div className="flex justify-between items-center border-b p-4">
          <div className="text-2xl font-bold">Tags</div>
          <CreateTagModal />
        </div>
        <DisplayTags tagOnClick={tagOnClick} />
      </div>
    </section>
  );
};
export default Navigation;
