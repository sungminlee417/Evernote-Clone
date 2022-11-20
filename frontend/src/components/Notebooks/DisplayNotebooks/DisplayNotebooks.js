import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { loadNotebooksThunk } from "../../../store/notebooks"
import './DisplayNotebooks.css';
import new_notebook_img from "../../../images/NewNotebook.svg"
import search_icon from "../../../images/search.svg"
const DisplayNotebooks = () => {
    const dispatch = useDispatch();
    const notebooks = Object.values(useSelector(state => state.notebooks)); 
    //const styleEvenNotebook =
    //const styleOddNotebook = 
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
                        src={search_icon}
                />
            </div>
            <div className="second-notebook-header">
                <div id="second-header-text"> {notebooks.length} {notebooks.length > 1 ? "notebooks":"notebook"} </div>
                <button className="new-notebook-button">
                    <img className="new-notebook-image" src={new_notebook_img}/>
                    <div id="second-header-text">New Notebook</div>
                </button>
            </div>
            <div className="list-notebooks">
                <div className="notebook-rows">
                    <div className="notebook-columns"></div>
                </div>
            </div>

            <ul>
                {notebooks.map((notebook, i) => {
                    return <li key={i} className={i%2===0?'style-even-notebook':'style-odd-notebook'}>
                        <NavLink to={`/notebooks/${notebook.id}`}>{notebook.name}</NavLink>
                        </li>
                })}
            </ul>
        </div>
    )
}
export default DisplayNotebooks