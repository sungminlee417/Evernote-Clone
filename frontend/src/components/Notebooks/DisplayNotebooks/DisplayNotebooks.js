import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { loadNotebooksThunk } from "../../../store/notebooks"
import './DisplayNotebooks.css';
import search_icon from "../../../images/search.svg"
import CreateNotebookModal  from "../CreateNotebookModal/CreateNotebookModal";
import ModifyNotebook from "../ModifyNotebook/ModifyNotebook";

const DisplayNotebooks = () => {
    const dispatch = useDispatch();
    const notebooks = Object.values(useSelector(state => state.notebooks)); 
    useEffect(()=>{
        dispatch(loadNotebooksThunk())
    }, [dispatch])
    return (
        <div className="DisplayNotebooksPage">
            <div className="notebook-header">
                <div className="notebook-title-page">Notebooks</div>
                <input
                        className="search-for-notebooks"
                        type="text"
                        placeholder="Find Notebooks..."
                        // src={search_icon}
                />
            </div>
            <div className="second-notebook-header">
                <div id="second-header-text"> {notebooks.length} {notebooks.length > 1 ? "notebooks":"notebook"} </div>
                <CreateNotebookModal/>
            </div>
            <div className="list-notebooks">
                <div className="list-notebooks-columns">
                    <button className="notebook-desc-title">TITLE</button>
                    <div className="notebook-author">CREATED BY</div>
                    <button className="notebook-desc-updated">UPDATED</button>
                    <div className="modify-notebook">ACTIONS</div>
                </div>
               <ul>
                {notebooks.map((notebook, i) => {
                        return <li key={i} className={i%2===0?'style-even-notebook':'style-odd-notebook'}>
                            <NavLink to={`/notebooks/${notebook.id}`}>{notebook.name}</NavLink>
                            <ModifyNotebook/>
                            </li>
                    })}
                </ul>
            </div>
        </div>
    )
}
export default DisplayNotebooks