import { NavLink, useHistory, useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Navigation.css";
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
    <section className="flex flex-col gap-2 bg-[#201c1c] shadow-md lg:w-96 w-full">
      <header className="flex justify-between text-[#a8a4a4] p-8 text-xl items-center">
        <div>{sessionUser.username}</div>
        <ManageAccount />
      </header>
      <div className="flex flex-col gap-8">
        <button
          className="bg-[#00a82d] hover:bg-[#008f26] text-white cursor-pointer flex items-center gap-2 rounded-full py-4 mx-4 px-4 text-xl"
          onClick={newNote}
        >
          <i className="fa-solid fa-plus" />
          <span>New Note</span>
        </button>
        <div className="flex flex-col gap-8">
          <div className="">
            <NavLink
              exact
              to="/"
              className={`flex items-center gap-4 text-[#a8a4a4] hover:bg-[#484444] text-2xl cursor-pointer px-6 py-4`}
              activeClassName="bg-[#333333]"
            >
              <i className="fa-solid fa-house h-8 w-8 flex justify-center items-center" />
              <span>Home</span>
            </NavLink>
            <NavLink
              to={`/notes`}
              className="flex items-center gap-4 text-[#a8a4a4] hover:bg-[#484444] text-2xl cursor-pointer px-6 py-4"
              activeClassName="bg-[#333333]"
              onClick={() => setSelectedTags([])}
            >
              <i className="fa-solid fa-note-sticky h-8 w-8 flex justify-center items-center" />
              <span>Notes</span>
            </NavLink>
          </div>
          <div>
            <NavLink
              exact
              to="/notebooks"
              className="flex items-center gap-4 text-[#a8a4a4] hover:bg-[#484444] text-2xl cursor-pointer px-6 py-4"
              activeClassName="bg-[#333333]"
            >
              <i className="fa-solid fa-book h-8 w-8 flex justify-center items-center"></i>
              <span>Notebooks</span>
            </NavLink>
            <div
              className="flex items-center gap-4 text-[#a8a4a4] hover:bg-[#484444] text-2xl cursor-pointer px-6 py-4 tags"
              onClick={tagOnClick}
            >
              <i className="fa-solid fa-tag  h-8 w-8 flex justify-center items-center"></i>
              <span>Tags</span>
            </div>
            <div className="tags-container" onClick={tagParentFunction}>
              <div className="tags-header">
                <div className="tags-header-title">Tags</div>
                <CreateTagModal />
              </div>
              <DisplayTags tagOnClick={tagOnClick} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Navigation;
