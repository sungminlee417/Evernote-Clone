import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { loadNotebooksThunk } from "../../../store/notebooks"
import './DisplayNotebooks.css';

const DisplayNotebooks = () => {
    const dispatch = useDispatch();
    const notebooks = Object.values(useSelector(state => state.notebooks)); 
    useEffect(()=>{
        dispatch(loadNotebooksThunk())
    }, [dispatch])
    return (
        <div>
            <ul>
                {notebooks.map((notebook, i) => {
                    return <li key={i}>
                        <NavLink to={`/notebooks/${notebook.id}`}>{notebook.name}</NavLink>
                        </li>
                })}
            </ul>
        </div>
    )
}
export default DisplayNotebooks