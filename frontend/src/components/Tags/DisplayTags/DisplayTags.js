import "./DisplayTags.css";
import { loadTagsThunk } from "../../../store/tags";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const DisplayTags = () => {
  const dispatch = useDispatch();
  const tags = Object.values(useSelector((state) => state.tags));

  useEffect(() => {
    dispatch(loadTagsThunk());
  }, [dispatch]);

  useEffect(() => {
    const subContainer = document.querySelector(".tags-subcontainer");

    if (tags.length === 0 && subContainer) {
      subContainer.classList.add("no-tags");
    } else {
      subContainer.classList.add("tags");
    }
  }, [tags]);

  return <div className="tags-subcontainer"></div>;
};

export default DisplayTags;
