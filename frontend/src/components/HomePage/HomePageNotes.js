import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadNotesThunk, createNote, clearNotes } from "../../store/notes";

const HomePageNotes = () => {
  const dispatch = useDispatch();
  const [settingsClicked, setSettingsClicked] = useState(false);
  const notes = Object.values(useSelector((state) => state.notes));
  const convertDate = (date) => {
    const dateTime = new Date(date);
    const formatDate = dateTime.toDateString();
    return formatDate.slice(4);
  };

  useEffect(() => {
    if (!settingsClicked) return;

    const closeSettings = () => {
      setSettingsClicked(false);
    };
    document.addEventListener("click", closeSettings);
    return () => document.removeEventListener("click", closeSettings);
  }, [settingsClicked]);

  const showSettings = () => {
    if (settingsClicked) {
      setSettingsClicked(false);
    } else {
      setSettingsClicked(true);
    }
  };

  const newNote = () => {
    dispatch(createNote()).then(() => {
      dispatch(loadNotesThunk());
    });
  };

  useEffect(() => {
    dispatch(loadNotesThunk());

    return () => dispatch(clearNotes());
  }, [dispatch]);

  return (
    <div className="flex md:flex-row flex-col lg:gap-32 gap-10 justify-between lg:-mt-128 lg:justify-between -mt-80 px-10 md:py-32 py-10">
      <div className="bg-white rounded-md shadow-xl md:w-192 lg:w-208">
        <div className="flex justify-between p-3 items-center relative">
          <NavLink
            to="/notes"
            className="flex items-center gap-2 hover:bg-[#e8e4e4] p-2 rounded-sm"
          >
            <div className="text-2xl font-semibold">NOTES</div>
            <i className="fa-solid fa-chevron-right text-xl text-[#00a82d]"></i>
          </NavLink>
          <button
            onClick={showSettings}
            className="hover:bg-[#e8e4e4] text-3xl p-2 w-12 h-12 rounded-sm"
          >
            <i className="fa-solid fa-ellipsis m-0" alt="notes_options" />
          </button>
          <div
            className={`flex flex-col py-4 gap-2 w-52 shadow-md rounded-md absolute right-4 transition-all duration-300 z-30 bg-white ${
              settingsClicked
                ? "-bottom-40 opacity-100 pointer-events-auto"
                : "-bottom-36 opacity-0 pointer-events-none"
            }`}
          >
            <NavLink
              to="/notes"
              className="py-4 px-6 hover:bg-[#f4f4f4] text-lg"
            >
              Go to Notes
            </NavLink>
            <button
              className="py-4 px-6 hover:bg-[#f4f4f4] text-lg text-start"
              onClick={newNote}
            >
              Create new note
            </button>
          </div>
        </div>
        <div className="flex gap-10 overflow-x-auto p-8">
          <div className="flex gap-10 lg:h-fit h-60">
            {notes.reverse().map((note) => {
              return (
                <NavLink
                  className="flex flex-col justify-between gap-6 text-2xl lg:h-96 h-60 w-64 shadow-lg hover:shadow-xl transition rounded-md lg:p-8 p-4"
                  key={note.id}
                  to={`/notes/${note.id}`}
                >
                  <div className="text-xl font-bold text-[#383434]">
                    {note?.name}
                  </div>
                  <div className="overflow-hidden text-ellipsis text-[#686464]">
                    {note?.content}
                  </div>
                  <div className="text-lg">{convertDate(note?.updatedAt)}</div>
                </NavLink>
              );
            })}
            <NavLink
              to="/notes"
              className="flex flex-col items-center justify-center gap-6 text-2xl lg:h-96 h-60 w-64 shadow-lg hover:shadow-xl transition rounded-md"
            >
              <i class="fa-regular fa-file-lines w-20 h-20 bg-[#00a82d] text-white flex items-center justify-center rounded-full text-4xl"></i>
              <div className="flex items-center home-page-view-notes-text gap-2">
                <div className="font-semibold">Notes</div>
                <div className="text-[#686464] font-normal text-xl">
                  ({notes.length})
                </div>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 position relative bg-[#fff4bc] rounded-md shadow-md p-10 lg:grow-0 grow lg:w-144">
        <div>
          <div className="text-xl font-bold">SCRATCH PAD</div>
        </div>
        <textarea
          className="h-60 bg-transparent outline-none resize-none"
          placeholder="Start writing..."
        />
      </div>
    </div>
  );
};

export default HomePageNotes;
