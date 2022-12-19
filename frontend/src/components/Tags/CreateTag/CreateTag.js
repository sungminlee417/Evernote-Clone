import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTag } from "../../../store/tags";
import "./CreateTag.css";

const CreateTag = ({ onClose }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]); 
    const tags = Object.values(useSelector((state) => state.tags));

    const submit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(createTag(name)).then(() => onClose()).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) {
                setErrors(data.errors[1])
            }
        })
    }
    useEffect(() => {
        setErrors("");
        tags.forEach((tagObj) => {
            if (tagObj.name === name)
              setErrors(`Tag name '${name}' is already in use`);
          });
        }, [name,tags]);
    
    useEffect(() => {
        const submitButton = document.querySelector(".create-tag-button");
        if (errors) {
            submitButton.disabled = "true";
            submitButton.classList.add("disabled")
            submitButton.style.cursor = "not-allowed";
        } else {
            submitButton.classList.remove("disabled")
            submitButton.removeAttribute("disabled");
            submitButton.style.cursor = "pointer";
        }
        }, [errors]);    

    return (
        <>
          <div className="create-new-tag-modal" onClick={(e) => e.stopPropagation()}>
            <div className="create-new-tag-modal-header">
                <div className="create-new-tag">Create new tag</div>
                <button
                    onClick={() => {onClose()}}
                    className="modal-close-button"
                >
                    <span className="modal-line-one"></span>
                    <span className="modal-line-two"></span>
                </button>
            </div>
            <div className="create-new-tag-subheader">Tags let you add keywords to notes, 
            making them easier to find and browse.</div>
            <form className="create-tag-form" onSubmit={submit}>
                <div className="create-tag-form-title">Name</div>
                <input
                    className="create-tag-form-input"
                    type="text"
                    placeholder="Tag name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <p className="create-tag-error-message">
                    {errors}
                </p>
                <div className="create-new-tag-modal-separator"></div>
                <div className="buttons-for-creating-tag-modal">
                    <button 
                    className="cancel-create-tag"
                    type="button"
                    onClick={() => {onClose()}}>Cancel
                    </button>
                    <button 
                        className="create-tag-button"
                        type="submit">Create</button>
                </div>
            </form>
    
          </div>
        </>
      );
};

export default CreateTag;