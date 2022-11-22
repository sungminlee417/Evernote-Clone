import options from "../../../images/modify.svg";
import './ModifyNotebook.css'

const ModifyNotebook = () => {
    return (
        <div className="modify-notebook">
            <button className="notebook-buttons">
                <img className="modify-notebook-button"alt= "modify_notebook" src={options}/>
            </button>
        </div>
    )
}

export default ModifyNotebook
