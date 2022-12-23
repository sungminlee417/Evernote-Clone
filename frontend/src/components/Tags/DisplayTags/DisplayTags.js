import "./DisplayTags.css";
import { loadTagsThunk, deleteTagThunk } from "../../../store/tags";
import { useDispatch, useSelector } from "react-redux";
import  {useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import no_tags from "../../../images/no-tags.png";
import options from "../../../images/modify.svg";
import DeleteTagModal from "../DeleteTagModal/DeleteTagModal";

const DisplayTags = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const tags = Object.values(useSelector((state) => state.tags));
    const { tagId } = useParams();
    const [settingsClicked, setSettingsClicked] = useState(false);
    useEffect(() => {
        dispatch(loadTagsThunk());
    }, [dispatch]);

    useEffect(() => {
        if (!settingsClicked) return;
    
        const settingsContainer = document.querySelector(
          ".tags-settings-container"
        );
        const tagsContainer = document.querySelector(
            ".individual-tag"
        );
        const modifyButton = document.querySelector(
            ".tag-buttons"
        );
    
        const closeSettings = () => {
          settingsContainer.classList.remove("visible");
          tagsContainer.classList.remove("visible");
          modifyButton.classList.remove("visible");
          setSettingsClicked(false);
        };
    
        document.addEventListener("click", closeSettings);
    
        return () => document.removeEventListener("click", closeSettings);
      }, [settingsClicked]);
    
    const showSettings = () => {
        const settingsContainer = document.querySelector(
          ".tags-settings-container"
        );
        const tagsContainer = document.querySelector(
            ".individual-tag"
        );
        const modifyButton = document.querySelector(
            ".tag-buttons"
        );
        if (settingsClicked) {
          settingsContainer.classList.remove("visible");
          tagsContainer.classList.remove("visible");
          modifyButton.classList.remove("visible");
          setSettingsClicked(false);
        } else {
          settingsContainer.classList.add("visible");
          tagsContainer.classList.add("visible");
          modifyButton.classList.add("visible");
          setSettingsClicked(true);
        }
      };

  return (
    <>
        {tags.length ? (
            <ul>
                {tags.map((tag) => {
                    return (
                        <li className="individual-tag">
                            <div>{tag.name}</div>
                            <button className="tag-buttons">
                                <img
                                onClick={showSettings}
                                className="modify-tag-button"
                                alt="modify_tag"
                                src={options}
                                />
                            </button>
                            <div className="tags-settings-container">
                                <DeleteTagModal tag={tag} />
                            </div>
                        </li>
                    );
                })}
            </ul>
        ) : (
            <div className="no-tags-section">
                <img className="no-tag-image"
                    src= {no_tags}>
                </img>
                <div className="no-tags-section-header">
                    Find notes faster with tags
                </div>
                <div className="no-tags-section-subheader">
                    Click the "add tag" button above to create your first tag.
                </div>
            </div>
        )}
    </>
    
  );
};

export default DisplayTags;
