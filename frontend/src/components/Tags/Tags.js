import './Tags.css'
import { useEffect, useState } from "react";

const Tags = () => {
    const [clicked, setClicked] = useState(false);
    const onClick = () => {
        const settingsContainer = document.querySelector(
        `.tags-container`
        );
        if (clicked) {
            settingsContainer.classList.remove("visible");
            setClicked(false);
        } else {
            settingsContainer.classList.add("visible");
            setClicked(true);
        }; 
    };
    const parentFunction = (e) => {
        if (clicked) {
        e.stopPropagation();
        }
    };
    useEffect(() => {
        if (!clicked) return;
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    });
    return (
        <div className="nav-bar-link"  onClick={onClick}>
            <i class="fa-solid fa-tag"></i> Tags
        </div>

    );
}; 


export default Tags;
