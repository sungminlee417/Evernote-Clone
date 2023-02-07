import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useRouteMatch } from "react-router-dom";
import { clearNotes, loadNotes, loadNoteTagThunk } from "../../../store/notes";
import { clearTag } from "../../../store/singleTag";
import noNotes from "../../../images/no-notes-with-tag.svg";
import "./DisplayTagNotes.css";

const DisplayTagNotes = () => {
  const match = useRouteMatch();
  const dispatch = useDispatch();
  const location = useLocation();
  const tagId = location.search.charAt(location.search.indexOf("=") + 1)
  const notes = Object.values(useSelector((state) => state.notes));
  const tags = useSelector((state) => state.tags);
  const convertDate = (date) => {
    const dateTime = new Date(date);
    const formatDate = dateTime.toDateString();
    return formatDate.slice(4);
  };
  
  useEffect(() => {
    dispatch(loadNoteTagThunk(tagId)).then(() => {
      // notes.forEach((note) => {
      //   note.Tags.forEach((tag) => {
      //     if(tagId in tag) {
      //       filteredNotes.push(note)
      //     }
      //   })
      // })
    });
    return () => {
      dispatch(clearNotes());
      dispatch(clearTag());
    };
  }, [dispatch, tagId]);

  return (
    <section className="notes-section">
      <div className="list-notes">
        <div className="list-notes-header">
          <div className="list-notes-header-header">
            <i className="fa-solid fa-note-sticky"></i>
            <span>Notes</span>
          </div>
          <div className="list-notes-header-sub"> {notes.length} {notes.length == 1 ? "note" : "notes"}{" "}</div>
        </div>
        <div>
        { tags.length &&
          <div className="display-note-filters">
            <div className="display-note-filters-header">
              FILTER
              <div className="clear-filters">
                Clear
              </div>
            </div>
            <div className="display-note-filter-names">
              <i className="fa-solid fa-tag"></i>
              {tags[tagId]?.name}
            </div>
            <div className="display-note-tags">
            </div>
          </div>
        }        
        </div>
        {notes.length > 0 ? (
          <div className="notes-list">
            {notes.reverse().map((note, i) => {
              return (
                <NavLink
                  className="display-note-container"
                  key={i}
                  to={`tags/${tagId}/${note.id}`}
                >
                  <div className="display-note-container-name">{note.name}</div>
                  <div className="display-note-container-content">
                    {note?.content}
                  </div>
                  <div className="notes-footer">
                    <div className="display-note-container-created-at">
                      {convertDate(note?.updatedAt)}
                    </div>
                    <div></div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        ) : (
          <div className="display-notes-no-notes-section">
            <div className="display-notes-no-notes-container">
              <img src={noNotes} alt="no notes" />
              <div className="display-notes-no-notes-header">
                No notes found
              </div>
              <div className="display-notes-no-notes-text">
                Try using a different keyword or filter. 
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
export default DisplayTagNotes;
