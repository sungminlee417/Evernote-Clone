import "./ManageAccount.css"
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import check from "../../../images/blue-checkmark.svg";
import { logout } from "../../../store/session";
import { Redirect } from "react-router-dom"

const ManageAccount = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user);
    const [clicked, setClicked] = useState(false);
    
    const onClick = () => {
        const settingsContainer = document.querySelector('.manage-account-container')
        if(clicked) {
          settingsContainer.classList.remove("visible")
          setClicked(false)
        }
    
        else {
          settingsContainer.classList.add("visible")
          setClicked(true)
        } 
      };
    useEffect(()=> {
        if (!clicked) return
        document.addEventListener("click", onClick)
        return () => document.removeEventListener("click", onClick)
    })

    const submit = () => {
        dispatch(logout()).then(() => history.push("/"))
    }

    if (!sessionUser) return (
        <Redirect to="/"/>
    )
    else {
        
    }
    return (
        <section className="manage-account">
            <i className="fa-solid fa-chevron-down nav-bar-user-drop-down"  onClick={onClick}></i>
            <div className="manage-account-container">
            ACCOUNT
                <div className="manage-acc-user-info">
                    <img src={check} alt="logged-in"></img>
                    <div className="manage-account-session-username">
                    {sessionUser.username}
                    </div>
                </div>
                <div className="manage-account-separator"></div>
                <button className="sign-out-of-acc" onClick={submit}>Sign out {sessionUser.username}</button>
            </div>  
       </section>
    )
};

export default ManageAccount;