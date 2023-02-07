import "./ModifyTag.css"
import { useDispatch } from "react-redux";
import { loadTagsThunk } from "../../../store/tags";
import  { useEffect, useState } from "react";
import options from "../../../images/modify.svg";
import DeleteTagModal from "../DeleteTagModal/DeleteTagModal";
import EditTagModal from "../EditTagModal/EditTagModal";

const ModifyTag = ({tag}) => {

    const dispatch = useDispatch();
    const [settingsClicked, setSettingsClicked] = useState(false);
    useEffect(() => {
        dispatch(loadTagsThunk());
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

    <div>
        <button className="tag-buttons">
            <img
            onClick={() => showSettings()}
            className="modify-tag-button"
            alt="modify_tag"
            src={options}
            />
        </button>
        <div className="tags-settings-container">
            <EditTagModal tag={tag}/>
            <DeleteTagModal tag={tag} />
        </div>
    </div>
}

export default ModifyTag;
