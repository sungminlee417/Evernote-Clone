import options from "../../../images/modify.svg";
import './ModifyNotebook.css';
import { useEffect, useState } from "react";

const ModifyNotebook = ({index}) => {
    const [clicked, setClicked] = useState(false)
    // const styleInvisible = {position: 'absolute', marginTop: '0.8rem',
    // backgroundColor: 'white', border:'0.05rem solid rgb(171,171,171, 50%)', borderRadius: '0.5rem',
    // boxShadow: '0rem 0.2rem 1rem 0rem rgba(0, 0, 0, 0.3)',
    // width: '10rem',
    // opacity: 0,
    // pointerEvents: 'none'}
    // const styleVisible = {position: 'absolute', marginTop: '0.8rem',
    // backgroundColor: 'white', border:'0.05rem solid rgb(171,171,171, 50%)', borderRadius: '0.5rem',
    // boxShadow: '0rem 0.2rem 1rem 0rem rgba(0, 0, 0, 0.3)',
    // width: '10rem', opacity: 1, pointerEvents: 'all'}
    const onClick = () => {
        const settingsContainer = document.querySelector(`.modify-notebook-container-${index}`)
        if(clicked) {
            settingsContainer.classList.remove("visible")
            // settingsContainer.style = styleInvisible
            setClicked(false)
        }
        else {
            settingsContainer.classList.add("visible")
            // settingsContainer.style = styleVisible
            setClicked(true)
        }

    }
    const parentFunction = (e) => {
        if(clicked) {
            e.stopPropagation()
        }

    }
    useEffect(()=> {
        if (!clicked) return
        document.addEventListener("click", onClick)
        return () => document.removeEventListener("click", onClick)
    })
    return (
        <div className={`modify-notebook-${index}`} style={{position:'relative', display: 'flex', alignItems: 'center'}} onClick={parentFunction}>
            <button className="notebook-buttons" onClick={onClick}>
                <img className="modify-notebook-button"alt= "modify_notebook" src={options}/>
            </button>
            <div className={`modify-notebook-container modify-notebook-container-${index}`}>hi</div>
        </div>
    )
}

export default ModifyNotebook
