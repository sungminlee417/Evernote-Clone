import sort from "../../../images/sort.svg";
import { useEffect, useState } from "react";
import './SortNotebooks.css'

const SortNotebooks = () => {
    const [clicked, setClicked] = useState(false);

    const onClick = () => {
        const settingsContainer = document.querySelector('.sort-notebooks-container');
        if(clicked) {
        settingsContainer.classList.remove("visible");
        setClicked(false);
        } 
        else {
        settingsContainer.classList.add("visible");
        setClicked(true);
        }
    };
    useEffect(() => {
        if (!clicked) return;
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
      });

    const parentFunction = (e) => {
        if (clicked) {
          e.stopPropagation();
        }
    };
    
    return (
        <div className="sort-notebooks"
            onClick={parentFunction}>
            <button className="sort-notebooks-button" onClick={onClick}>
                <img className="sort-notebooks-button-img" 
                    src={sort}
                    alt="sort"
                /> 
            </button>
            <div className="sort-notebooks-container">
                <div className="sort-notebooks-container-header">
                SORT BY
                </div>
                <div className="sort-notebooks-options">
                    <div className="sort-notebooks-by-date-created">
                        <div className="sort-direction">
                            <i class="fa-solid fa-arrow-up"></i>
                            <i class="fa-solid fa-arrow-down"></i>
                        </div>
                        Date created
                    </div>
                    <div className="sort-notebooks-by-date-updated">
                        <div className="sort-direction">
                            <i class="fa-solid fa-arrow-up"></i>
                            <i class="fa-solid fa-arrow-down"></i>
                        </div>
                        Date updated
                    </div>
                    <div className="sort-notebooks-by-title">
                        <div className="sort-direction">
                            <i class="fa-solid fa-arrow-up"></i>
                            <i class="fa-solid fa-arrow-down"></i>
                        </div>
                        Title
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SortNotebooks;