import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { loadNotebooksThunk } from "../../../store/notebooks"
import './DisplayNotebooks.css';
import search_icon from "../../../images/search.svg"
import CreateNotebookModal  from "../CreateNotebookModal/CreateNotebookModal";
import ModifyNotebook from "../ModifyNotebook/ModifyNotebook";
import notebook_icon from "../../../images/Notebook.svg"
const DisplayNotebooks = () => {
    const dispatch = useDispatch();
    const notebooks = Object.values(useSelector(state => state.notebooks)); 
    const sessionUser = useSelector(state => state.session.user)
    useEffect(()=>{
        dispatch(loadNotebooksThunk())
    }, [dispatch])
    const convertDate = (date) => {
        const dateTime = new Date(date);
        const formatDate = dateTime.toDateString();
        return formatDate.slice(4,)
    }
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
                            <NavLink className="individual-notebook" to={`/notebooks/${notebook.id}`}>
                                <img className="notebook-icon" src={notebook_icon}></img>
                                {notebook.name}
                                <div className="num-notes-in-notebook"></div>
                            </NavLink>
                            <div className="notebook-creator">{sessionUser.username}</div>
                            <div className="notebook-updated-date">{convertDate(notebook.updatedAt)}</div>
                            <ModifyNotebook index={i}/>
                            </li>
                    })}
                </ul>
            </div>
        </div>
    )
}
export default DisplayNotebooks