import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Navigation.css";
import { useContext, useEffect, useState } from "react";
import ManageAccount from "./ManageAccount/ManageAccount";
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
    console.log(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    if (!tagClicked) return;
    document.addEventListener("click", tagOnClick);
    return () => document.removeEventListener("click", tagOnClick);
  }, [tagClicked]);

  return (
    <section className="bg-[#201c1c] shadow-md lg:w-96 w-full">
      <div className="flex justify-between text-[#a8a4a4] lg:p-8 py-6 px-10 items-center lg:static fixed top-0 w-full z-10 lg:bg-transparent bg-[#201c1c]">
        <div className="text-xl">{sessionUser.username}</div>
        <ManageAccount />
      </div>
      <div className="flex lg:flex-col lg:justify-start justify-between">
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
          className="flex items-center gap-4 text-[#a8a4a4] hover:bg-[#484444] cursor-pointer lg:px-6 py-4 flex-grow lg:justify-start justify-center order-2 tags"
          onClick={tagOnClick}
        >
          <i className="fa-solid fa-tag  h-8 w-8 flex justify-center items-center lg:text-2xl text-4xl"></i>
          <span className="lg:block hidden text-xl">Tags</span>
        </div>
        {/* <div className="tags-container" onClick={tagParentFunction}>
          <div className="tags-header">
            <div className="tags-header-title">Tags</div>
            <CreateTagModal />
          </div>
          <DisplayTags tagOnClick={tagOnClick} />
        </div> */}
      </div>
    </section>
  );
};
export default Navigation;
