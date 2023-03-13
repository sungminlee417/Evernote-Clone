import "./ModifyTag.css";
import { useContext, useEffect, useState } from "react";
import options from "../../../images/modify.svg";
import DeleteTagModal from "../DeleteTagModal/DeleteTagModal";
import EditTagModal from "../EditTagModal/EditTagModal";
import { useHistory } from "react-router-dom";
import { TagContext } from "../../context/TagContext";

const ModifyTag = ({ tag, tagOnClick, preSettingsTag, setPreSettingsTag }) => {
  const { setSelectedTags } = useContext(TagContext);
  const history = useHistory();
  const [settingsClicked, setSettingsClicked] = useState(false);

  const showSettings = () => {
    if (preSettingsTag !== null) {
      const preSettingsContainer = document.querySelector(
        `.tags-settings-container-${preSettingsTag}`
      );
      const preTagsContainer = document.querySelector(
        `.individual-tag-${preSettingsTag}`
      );
      preSettingsContainer.classList.remove("visible");
      preTagsContainer.classList.remove("visible");
    }

    const settingsContainer = document.querySelector(
      `.tags-settings-container-${tag.id}`
    );
    const tagsContainer = document.querySelector(`.individual-tag-${tag.id}`);

    if (settingsClicked && tag.id === preSettingsTag) {
      settingsContainer.classList.remove("visible");
      tagsContainer.classList.remove("visible");
      setSettingsClicked(false);
    } else {
      settingsContainer.classList.add("visible");
      tagsContainer.classList.add("visible");
      setSettingsClicked(true);
    }

    setPreSettingsTag(tag.id);
  };

  useEffect(() => {
    if (!settingsClicked) return;

    const settingsContainer = document.querySelector(
      `.tags-settings-container-${tag.id}`
    );
    const tagsContainer = document.querySelector(`.individual-tag-${tag.id}`);

    const closeSettings = () => {
      settingsContainer.classList.remove("visible");
      tagsContainer.classList.remove("visible");
      setSettingsClicked(false);
    };

    document.addEventListener("click", closeSettings);

    return () => document.removeEventListener("click", closeSettings);
  }, [settingsClicked]);

  const handleTagClick = (tag) => {
    setSelectedTags((prevTags) => {
      const previousTags = prevTags;
      previousTags[tag.id] = tag;
      return previousTags;
    });
    history.push("/notes");
  };

  return (
    <div className={`individual-tag individual-tag-${tag.id}`}>
      <div
        onClick={() => {
          handleTagClick(tag);
          tagOnClick();
        }}
      >
        {tag.name}
      </div>
      <button
        className={`tag-buttons .tag-buttons-${tag.id}`}
        onClick={showSettings}
      >
        <img className="modify-tag-button" alt="modify_tag" src={options} />
      </button>
      <div
        className={`tags-settings-container tags-settings-container-${tag.id}`}
      >
        <EditTagModal tag={tag} setSettingsClicked={setSettingsClicked} />
        <DeleteTagModal tag={tag} setSettingsClicked={setSettingsClicked} />
      </div>
    </div>
  );
};

export default ModifyTag;
