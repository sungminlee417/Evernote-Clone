import "./DisplayTags.css"
import { loadTagsThunk } from "../../../store/tags";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const DisplayTags = () => {
    const dispatch = useDispatch();
    const tags = Object.values(useSelector((state) => state.tags));
    const subcontainer = document.querySelector(
        ".tags-subcontainer"
      );
    useEffect(() => {
        dispatch(loadTagsThunk());
      }, [dispatch]);

    if (tags.length === 0) {
        subcontainer.classList.add("no-tags");
      } else {
        subcontainer.classList.add("tags");
      }
      
    return (
        <div className="tags-subcontainer"></div>
    );
};

export default DisplayTags;