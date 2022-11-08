import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadNotebooksThunk } from "../../store/notebooks"

const Notebooks = () => {
    const dispatch = useDispatch();
    const notebooks = Object.values(useSelector(state => state.notebooks)); 
    useEffect(()=>{
        dispatch(loadNotebooksThunk())
    }, [dispatch])
    return (
        <div>
            <ul>
                {notebooks.map((notebook, i) => {
                    return <li key={i}>{notebook.name}</li>
                })}
            </ul>
        </div>
    )
}
export default Notebooks