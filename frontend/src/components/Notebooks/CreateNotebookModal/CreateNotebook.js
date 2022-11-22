import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNotebook } from "../../../store/notebooks";
import "./CreateNotebook.css";

const CreateNotebook = ({ onClose }) => {
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const [errors, setErrors] = useState([]); 

    const submit = (e) => {
        e.preventDefault();
        setErrors([]);
        dispatch(createNotebook(name)).then(() => onClose()).catch(async (res) => {
            const data = await res.json()
            if (data && data.errors) {
                setErrors(data.errors)
            }
        })
    }
    return (
    <>
      <div className="create-new-notebook-modal" onClick={(e) => e.stopPropagation()}>
        <div className="create-new-notebook-modal-header">
            <div className="create-new-notebook">Create new notebook</div>
            <button
                onClick={() => {onClose()}}
                className="modal-close-button"
            >
                <span className="modal-line-one"></span>
                <span className="modal-line-two"></span>
            </button>
        </div>
        <div className="create-new-notebook-subheader">Notebooks are useful for grouping notes around a common topic. 
        They can be private or shared.</div>
        <form className="create-notebook-form" onSubmit={submit}>
            <div className="create-notebook-form-title">Name</div>
            <input
                className="create-notebook-form-input"
                type="text"
                placeholder="Notebook name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <p className="create-notebook-error-message">
                {errors.name}
            </p>
            <div className="create-new-notebook-modal-separator"></div>
            <div className="buttons-for-creating-notebook-modal">
                <button 
                className="cancel-create-notebook"
                type="button"
                onClick={() => {onClose()}}>Cancel
                </button>
                <button 
                    className="create-notebook-button"
                    type="submit">Create</button>
            </div>
        </form>

      </div>
    </>

  );
};

export default CreateNotebook;