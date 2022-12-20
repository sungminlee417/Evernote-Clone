import "./DisplayTags.css";
import { loadTagsThunk } from "../../../store/tags";
import { useDispatch, useSelector } from "react-redux";
import  {useEffect, useState} from "react";
import no_tags from "../../../images/no-tags.png";
import options from "../../../images/modify.svg";
import DeleteTagModal from "../DeleteTagModal";


const DisplayTags = () => {
    const [clicked, setClicked] = useState(false);
    const dispatch = useDispatch();
    const tags = Object.values(useSelector((state) => state.tags));
    const onClick = () => {
        const settingsContainer = document.querySelector(
        `.modify-tag-container`
        );
        if (clicked) {
        settingsContainer.classList.remove("visible");
        setClicked(false);
        } else {
        settingsContainer.classList.add("visible");
        setClicked(true);
        }
    };

    const parentFunction = (e) => {
        if (clicked) {
        e.stopPropagation();
        }
    };
    useEffect(() => {
        dispatch(loadTagsThunk());
    }, [dispatch]);

    useEffect(() => {
        if (!clicked) return;
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    });

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
                                className="modify-tag-button"
                                alt="modify_tag"
                                src={options}
                                />
                            </button>
                            <div
                                className={`modify-tag-container modify-tag-container-${tag.id}`}
                            >
                                {/* <EditNotebookModal notebook={notebook} />
                                <DeleteNotebookModal notebook={notebook} /> */}
                            </div>
                        </li>
                    );
                })}
            </ul>
        ) : (
            <div className="no-tags-section">
                <img className="no-tag-image"
                    src = {no_tags}>
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
